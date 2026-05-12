import { useEffect } from 'react'
import {
  socket,
  connectSocket,
  disconnectSocket,
} from '../services/socketServices'

// Hook för att realtime-logik kopplad till en aktiv fil.
//
// acticeFile:
// objekt som represnenterar den fil som användare arbetar i
//
// setCode:
// setter funktion från MainArea som uppdaterar editorns code-state

export function useSocketFile(activeFile, setCode) {
  // Körs när activeFile ändras eller när komponenten mountas
  // Avbryter när det saknas en aktiv fil
  useEffect(() => {
    if (!activeFile) {
      return
    }

    // Startar socket-anslutningen mot servern
    connectSocket()

    // Lyssnar på socketens connect-event
    // Körs när klitenten ansluter till socket-servern
    socket.on('connect', () => {
      console.log('Socket connected:', socket.id)

      // Öppnar filens socket-room på servern.
      // Alla användare i samma rum får realtime-events för denna fil
      socket.emit('open file', activeFile.uid)
      console.log('Opened socket file room:', activeFile.uid)
    })

    // Lyssnar på eventet "file loaded" från servern
    // Körs när servern skickar tillbaka filens innehåll
    socket.on('file loaded', (data) => {
      console.log('File loaded:', data)

      // Kontrollerar att content faktiskt finns i payloaden innan vi försöker uppdatera editorn
      if (data?.content !== undefined) {
        setCode(data.content)
      }
    })
    // Lyssnar på anslutningsfel från socket-servern
    socket.on('connect_error', (error) => {
      console.error('Connection error:', error.message)
    })
    // Lyssnar på disconnect-event från socket-servern
    // Körs när socketen tappar anslutningen
    socket.on('disconnect', (reason) => {
      console.log('Socket disconnected:', reason)
    })

    // Rensa upp när komponenten avmonterar eller när activeFile ändras
    return () => {
      socket.emit('close file', activeFile.uid)
      socket.off('connect')
      socket.off('connect_error')
      socket.off('disconnect')
      socket.off('file loaded')

      // stänger av socket-anslutningen
      disconnectSocket()
    }
    // Kör om effekten när activeFile eller setCode ändras.
  }, [activeFile, setCode])

  // Funktion som skickar editor-innehållet till servern
  // Körs när användaren skriver i Monaco-editorn
  function sendContent(newContent) {
    if (!activeFile) {
      return
    }
    // Uppdaterar lokal editor-state
    // ger omdelbar feedback i edtorn utan att vänta på servern
    setCode(newContent)

    // Skickar det nya innehållet till socket-servern
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
