import { useEffect } from 'react'
import { socket } from '../services/socketServices'

// Ansvarar för att läsa användars cursor position och markering i koden
// - läsa selection/cursor-position från Monaco
// - emit "selection"
// - lyssna på "selection"
// - uppdatera UI med andra användares markeringar

export function useSocketSelection(
  editor,
  activeFile,
  currentUser,
  onLocalCursorChange,
  onRemoteCursorChange
) {
  useEffect(() => {
    if (!editor || !activeFile?.uid || !currentUser?.email) {
      return
    }

    function handleSelection(message) {
      // Ignorera event utan data
      if (!message?.data) {
        return
      }
      // ignorera event från andra filer än den aktiva filen
      if (message.uid !== activeFile.uid) {
        return
      }
      // Ignorera event från den egna klienten
      if (message.data.userId === currentUser.email) {
        return
      }
      onRemoteCursorChange?.(message.data)
      console.log('Remote selection received: ', message.data)
    }

    // Registrerar en Monaco-listener för cursor-position
    const disposable = editor.onDidChangeCursorPosition((event) => {
      // Objekt med nyckelvärden (payload)
      const selectionData = {
        userId: currentUser.email,
        lineNumber: event.position.lineNumber,
        column: event.position.column,
      }
      onLocalCursorChange?.(selectionData)

      socket.emit('selection', {
        data: selectionData,
        uid: activeFile.uid,
      })
      console.log('Selection emitted: ', {
        data:
          selectionData.userId +
          ':' +
          selectionData.lineNumber +
          ':' +
          selectionData.column,
      })
    })

    socket.on('selection', handleSelection)

    return () => {
      // dispose() tar bort monaco-listener onDidChangeCursorPosition()
      disposable.dispose()
      socket.off('selection', handleSelection)
    }
  }, [
    editor,
    activeFile?.uid,
    currentUser?.email,
    onLocalCursorChange,
    onRemoteCursorChange,
  ])
}
