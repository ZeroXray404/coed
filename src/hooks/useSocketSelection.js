import { useEffect } from 'react'
import { socket, connectSocket } from '../services/socketServices'

// Ansvarar för att läsa användars cursor position och markering i koden
// - läsa selection/cursor-position från Monaco
// - emit "selection"
// - lyssna på "selection"
// - uppdatera UI med andra användares markeringar

export function useSocketSelection(
  editor,
  activeFile,
  currentUser,
  onLocalCursorChange
) {
  useEffect(() => {
    if (!editor || !activeFile?.uid || !currentUser?.email) {
      return
    }

    // Registrerar en Monaco-listener för cursor-position
    const disposable = editor.onDidChangeCursorPosition((event) => {
      // Objekt med nyckelvärden
      const payload = {
        fileUid: activeFile.uid,
        userId: currentUser.email,
        lineNumber: event.position.lineNumber,
        column: event.position.column,
      }
      onLocalCursorChange?.(payload)
      console.log('Local cursor position: ', payload)
    })
    return () => {
      // dispose() tar bort monaco-listener onDidChangeCursorPosition()
      disposable.dispose()
    }
  }, [editor, activeFile?.uid, currentUser?.email, onLocalCursorChange])
}
