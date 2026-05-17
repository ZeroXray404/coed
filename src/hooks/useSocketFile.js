import { useEffect } from 'react'
import {
  socket,
  connectSocket,
  disconnectSocket,
} from '../services/socketServices'

// Hanterar socket-logik för den aktiva filen i editorn.
// Hooken öppnar rätt socket-room, lyssnar på realtime-events
// och skickar nytt content när användaren skriver.
export function useSocketFile(activeFile, setCode) {
  useEffect(() => {
    if (!activeFile?.uid) {
      return
    }

    function openActiveFileRoom() {
      socket.emit('open file', activeFile.uid)
      console.log('Opened socket file room:', activeFile.uid)
    }

    function handleConnect() {
      console.log('Socket connected:', socket.id)
      openActiveFileRoom()
    }

    function handleFileLoaded(data) {
      console.log('File loaded:', data)

      if (data?.content !== undefined) {
        setCode(data.content)
      }
    }

    function handleContent(data) {
      console.log('Content received:', data)
      // Ignorera content-events som gäller en annan fil.
      if (data?.uid !== activeFile.uid) {
        return
      }
      if (data?.content !== undefined) {
        setCode(data.content)
      }
    }

    function handleContentSaved(data) {
      console.log('Content saved:', data)
    }

    function handleConnectError(error) {
      console.error('Connection error:', error.message)
    }

    function handleDisconnect(reason) {
      console.log('Socket disconnected:', reason)
    }

    socket.on('connect', handleConnect)
    socket.on('connect_error', handleConnectError)
    socket.on('disconnect', handleDisconnect)
    socket.on('file loaded', handleFileLoaded)
    socket.on('content', handleContent)
    socket.on('content saved', handleContentSaved)

    connectSocket()

    // Om socketen redan är ansluten när activeFile byts,
    // triggas inte connect-eventet igen.
    // Därför öppnar vi filrummet direkt också
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

      // stänger av socket-anslutningen
      disconnectSocket()
    }
    // Kör om effekten när den aktiva filens uid ändras.
  }, [activeFile?.uid, setCode])

  // Funktion som skickar editor-innehållet till servern
  // Körs när användaren skriver i Monaco-editorn
  function sendContent(newContent) {
    if (!activeFile?.uid) {
      return
    }
    // Uppdaterar lokal state direkt så editorn känns responsiv.
    setCode(newContent)

    // Skickar nytt filinnehåll till servern.
    // Servern broadcastar content till användare i samma room
    // och sparar content automatiskt efter en kort paus.
    socket.emit('content', {
      content: newContent,
      uid: activeFile.uid,
    })

    console.log('content emitted:', {
      content: newContent,
      uid: activeFile.uid,
    })
  }

  return {
    sendContent,
  }
}
