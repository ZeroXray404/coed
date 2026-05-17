import { useEffect } from 'react'
import {
  socket,
  connectSocket,
  disconnectSocket,
} from '../services/socketServices'

// Hanterar socket-logik för den aktiva filen i editorn.
// Hooken öppnar rätt socket-room, lyssnar på realtime-events
// och skickar nytt content när användaren skriver.
// activeFile = filen som användaren just nu har öppen
// setCode = setter från App/MainArea som uppdaterar innehållet i editorn
export function useSocketFile(activeFile, setCode) {
  useEffect(() => {
    // Om ingen fil är vald ska hooken inte ansluta till något socket-room.
    if (!activeFile?.uid) {
      return
    }

    // Öppnar ett socket-room för den aktiva filen.
    // Alla användare som öppnar samma fil-uid hamnar i samma room.
    function openActiveFileRoom() {
      socket.emit('open file', activeFile.uid)
      console.log('Opened socket file room:', activeFile.uid)
    }
    // Körs när socketen har anslutit till servern.
    // När anslutningen är klar öppnar vi room för aktiv fil.
    function handleConnect() {
      console.log('Socket connected:', socket.id)
      openActiveFileRoom()
    }
    // Körs när servern bekräftar att filen har öppnats.
    // Om servern skickar med content uppdateras editorn.
    function handleFileLoaded(data) {
      console.log('File loaded:', data)

      if (data?.content !== undefined) {
        setCode(data.content)
      }
    }
    // Körs när servern skickar nytt content för en fil.
    // Det kan vara content från den egna klienten eller från en annan användare.
    function handleContent(data) {
      console.log('Content received:', data)
      // Ignorera content-events som gäller en annan fil.
      if (data?.uid !== activeFile.uid) {
        return
      }
      // Uppdaterar editorns state med det content som kom från socket-servern.
      if (data?.content !== undefined) {
        setCode(data.content)
      }
    }
    // Körs när servern har sparat innehållet.
    // Kan senare användas för att visa exempelvis "Sparad" i UI:t vid vidareutveckling.
    function handleContentSaved(data) {
      console.log('Content saved:', data)
    }
    // Körs om socketen inte lyckas ansluta.
    function handleConnectError(error) {
      console.error('Connection error:', error.message)
    }
    // Körs när socketen kopplas från.
    function handleDisconnect(reason) {
      console.log('Socket disconnected:', reason)
    }

    // Registrerar event-listeners.
    // Dessa säger vilka funktioner som ska köras när socket-servern skickar olika events.
    socket.on('connect', handleConnect)
    socket.on('connect_error', handleConnectError)
    socket.on('disconnect', handleDisconnect)
    socket.on('file loaded', handleFileLoaded)
    socket.on('content', handleContent)
    socket.on('content saved', handleContentSaved)

    // Startar socket-anslutningen.
    // connectSocket ser till att aktuell token skickas med innan anslutning.
    connectSocket()

    // Om socketen redan är ansluten när användaren byter fil
    // kommer inte connect-eventet att triggas igen.
    // därför öppnas filrummet direkt
    if (socket.connected) {
      openActiveFileRoom()
    }

    // Rensa upp när komponenten avmonterar eller när activeFile ändras
    // Det behövs för att lämna gamla socket-room och undvika dubbla listeners.
    return () => {
      socket.emit('close file', activeFile.uid)
      socket.off('connect', handleConnect)
      socket.off('connect_error', handleConnectError)
      socket.off('disconnect', handleDisconnect)
      socket.off('file loaded', handleFileLoaded)
      socket.off('content', handleContent)
      socket.off('content saved', handleContentSaved)

      // Stänger socket-anslutningen när hooken inte längre behöver den.
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
    // Uppdaterar lokal React-state direkt.
    // Det gör att texten syns omedelbart i editorn utan att vänta på servern.
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
