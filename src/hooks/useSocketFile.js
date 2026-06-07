import { useEffect, useRef } from 'react'
import {
  socket,
  connectSocket,
  disconnectSocket,
} from '../services/socketServices'

// Hanterar socket-logik för den aktiva filen i editorn.
// Hooken öppnar rätt socket-room, lyssnar på realtime-events
// och skickar nytt content när användaren skriver.
// activeFile = filen som användaren just nu har öppen
// setActiveFileCode = setter från App/MainArea som uppdaterar innehållet i editorn

// === Hjälpfuntion för att minska området som behöver uppdateras i editorn ===
function createEdit(currentText, newText, model) {
  if (currentText === newText) {
    return null
  }

  let start = 0

  // Loopar tills första positionen där texterna skiljer sig åt därefter start ökar med 1
  while (
    start < currentText.length &&
    start < newText.length &&
    currentText[start] === newText[start]
  ) {
    start++
  }

  let currentEnd = currentText.length
  let nextEnd = newText.length

  // Loopar tills sista positionen där texterna skiljer sig åt därefter currentEnd och nextEnd minskar med 1
  while (
    currentEnd > start &&
    nextEnd > start &&
    currentText[currentEnd - 1] === newText[nextEnd - 1]
  ) {
    currentEnd--
    nextEnd--
  }

  // Översätter teckenindex till monaco-positioner (med radnummer och kolumn)
  const startPosition = model.getPositionAt(start)
  const endPosition = model.getPositionAt(currentEnd)

  // Skapar ett edit-objekt som beskriver skillnaden mellan currentText och newText
  return {
    range: {
      startLineNumber: startPosition.lineNumber,
      startColumn: startPosition.column,
      endLineNumber: endPosition.lineNumber,
      endColumn: endPosition.column,
    },
    text: newText.slice(start, nextEnd),
    forceMoveMarkers: true,
  }
}

export function useSocketFile(
  activeFile,
  editorRef,
  setActiveFileCode,
  setRealtimeStatus,
  setSaveStatus,
  setActiveUsers
) {
  const clientIdRef = useRef(crypto.randomUUID())
  const isApplyingRemoteRef = useRef(false) // flagga för att identifiera lokal vs remote ändring
  const lastChangeAtRef = useRef(0) // Tidspunkt för senaste lokal ändring
  const savingTimerRef = useRef(null) // Timer för att växla från "unsaved" till "saving"
  const savedTimerRef = useRef(null) // Timder för att dölja "saved"-status

  useEffect(() => {
    if (!activeFile?.uid) {
      setRealtimeStatus('disconnected')
      setSaveStatus('idle')
      disconnectSocket()
      return
    }

    // === Funktion som uppdaterar editorn med nytt content som kommer från servern ===
    function applyRemoteContent(newContent) {
      const editor = editorRef.current

      if (!editor) {
        setActiveFileCode(newContent)
        return
      }

      // Hämtar monaco-editorns model som hanterar textinnehållet
      const model = editor.getModel()

      if (!model) {
        setActiveFileCode(newContent)
        return
      }

      // Hämtar det aktuella textinnehållet i editorn
      const currentText = model.getValue()

      if (currentText === newContent) {
        setActiveFileCode(newContent)
        return
      }

      // Skapar variabeln edit som innehåller edit-objekt (beskriver skillnaden mellan currentText och newContent)
      const edit = createEdit(currentText, newContent, model)

      if (!edit) {
        setActiveFileCode(newContent)
        return
      }

      // Sätter flaggan till true för att indikera att ändringen kommer från socket-servern
      isApplyingRemoteRef.current = true

      try {
        // Applicera edit-objektet i editorn (endast del som skiljer sig uppdateras)
        editor.executeEdits('remote-content', [edit])
        setActiveFileCode(editor.getValue()) // Uppdaterar React-state med nya innehållet
      } finally {
        isApplyingRemoteRef.current = false
      }
    }

    // Öppnar ett socket-room för den aktiva filen.
    function openActiveFileRoom() {
      socket.emit('open file', activeFile.uid)
    }
    // Körs när socketen har anslutit till servern.
    function handleConnect() {
      setRealtimeStatus('connected')
      openActiveFileRoom()
    }
    // Körs när servern bekräftar att filen har öppnats.
    // Om servern skickar med content uppdateras editorn.
    function handleFileLoaded(data) {
      if (data?.content !== undefined) {
        applyRemoteContent(data.content)
      }
    }
    // Körs när servern skickar nytt content för en fil.
    function handleContent(data) {
      if (data?.uid !== activeFile.uid) {
        return
      }

      if (data?.clientId === clientIdRef.current) {
        return
      }

      // Uppdaterar editorns state med det content som kom från socket-servern.
      if (data?.content !== undefined) {
        applyRemoteContent(data.content)
      }
    }
    // Körs när servern har sparat innehållet.
    function handleContentSaved(data) {
      if (data?.uid !== activeFile.uid) {
        return
      }
      // Beräkmar hur lång tid det har gått sedan senaste lokala ädringen.
      const timeSinceLastChange = Date.now() - lastChangeAtRef.current

      // Om användaren har skrivit något nytt inom 500ms efter att save-processen startade
      if (timeSinceLastChange < 500) {
        setSaveStatus('unsaved')
        return
      }
      setSaveStatus('saved')
      clearTimeout(savedTimerRef.current)

      // Sätter saved-statusen till "idle" efter 1.2s så att "saved"-indikatorn försvinner.
      savedTimerRef.current = setTimeout(() => {
        setSaveStatus('idle')
      }, 1200)
    }
    function handleConnectError(error) {
      console.error('Connection error:', error.message)
      setRealtimeStatus('error')
    }
    function handleDisconnect() {
      setRealtimeStatus('disconnected')
    }

    function handleReconnectAttempt() {
      setRealtimeStatus('reconnecting')
    }
    function handleUsers(users) {
      console.log('Active users:', users)
      setActiveUsers(users)
    }

    // Registrerar event-listeners.
    // Dessa säger vilka funktioner som ska köras när socket-servern skickar olika events.
    socket.on('connect', handleConnect)
    socket.on('connect_error', handleConnectError)
    socket.on('disconnect', handleDisconnect)
    socket.on('file loaded', handleFileLoaded)
    socket.on('content', handleContent)
    socket.on('content saved', handleContentSaved)
    socket.io.on('reconnect_attempt', handleReconnectAttempt)
    socket.on('users', handleUsers)

    // Startar socket-anslutningen.
    // connectSocket ser till att aktuell token skickas med innan anslutning.
    connectSocket()

    // Om socketen redan är ansluten när användaren byter fil så öppnas det nya fil-rummet direkt.
    if (socket.connected) {
      openActiveFileRoom()
    }

    // Rensa upp när komponenten avmonterar eller när activeFile ändras
    return () => {
      socket.emit('close file', activeFile.uid)
      socket.off('connect', handleConnect)
      socket.off('connect_error', handleConnectError)
      socket.off('disconnect', handleDisconnect)
      socket.off('file loaded', handleFileLoaded)
      socket.off('content', handleContent)
      socket.off('content saved', handleContentSaved)
      socket.io.off('reconnect_attempt', handleReconnectAttempt)
      socket.off('users', handleUsers)

      // Rensar timers
      clearTimeout(savingTimerRef.current)
      clearTimeout(savedTimerRef.current)

      setActiveUsers([])
      setRealtimeStatus('disconnected')
      setSaveStatus('idle')

      // Stänger socket-anslutningen när hooken inte längre behöver den.
      disconnectSocket()
    }
  }, [
    activeFile?.uid,
    editorRef,
    setActiveFileCode,
    setRealtimeStatus,
    setSaveStatus,
    setActiveUsers,
  ])

  // Funktion som skickar editor-innehållet till servern
  // Körs när användaren skriver i Monaco-editorn
  function sendContent(newContent) {
    if (!activeFile?.uid) {
      return
    }

    if (isApplyingRemoteRef.current) {
      return
    }

    // Uppdaterar lokal React-state direkt.
    lastChangeAtRef.current = Date.now()

    clearTimeout(savingTimerRef.current)
    clearTimeout(savedTimerRef.current)
    setActiveFileCode(newContent)
    setSaveStatus('unsaved')

    // Startar en timer som växlar från "unsaved" till "saving" efter 500ms.
    savingTimerRef.current = setTimeout(() => {
      setSaveStatus('saving')
    }, 500)

    // Skickar nytt filinnehåll till servern.
    socket.emit('content', {
      content: newContent,
      uid: activeFile.uid,
      clientId: clientIdRef.current,
    })
  }

  return {
    sendContent,
  }
}
