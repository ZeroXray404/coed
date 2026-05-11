import { useEffect } from 'react'
import {
  socket,
  connectSocket,
  disconnectSocket,
} from '../services/socketServices'

// Hook för att realtime-logik hopplad till en aktiv fil.
// Just nu testar den bara anslutningen
// Senare kommer den att hantera:
// - open file
// - close file
// - content
// - users
// - content saved

export function useSocketFile(activeFile) {
  useEffect(() => {
    if (!activeFile) {
      return
    }

    connectSocket()

    socket.on('connect', () => {
      console.log('Socket connected:', socket.id)
    })

    socket.on('connect_error', (error) => {
      console.error('Connection error:', error.message)
    })

    socket.on('disconnect', (reason) => {
      console.log('Socket disconnected:', reason)
    })

    // Rensa upp när komponenten avmonterar eller när activeFile ändras
    return () => {
      socket.off('connect')
      socket.off('connect_error')
      socket.off('disconnect')
      disconnectSocket()
    }
  }, [activeFile])
}
