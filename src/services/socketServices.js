// Ansvar för själva socket-asnlutningen
// skicka med token
// exportera socket instansen
// evetuellt hantera reconnect / disconnect på låg nivå

import { io } from 'socket.io-client'
import { getToken } from './authServices'

const SOCKET_URL = import.meta.env.VITE_DOCKET_BASE_URL

export const socket = io(SOCKET_URL, {
  autoConnect: false, // Vi vill inte ansluta direkt, vi gör det manuellt efter att ha hämtat token
  transports: ['websocket'], // Tvinga WebSocket-transport
  reconnectionAttempts: 3,
  auth: {
    token: getToken(), // Skicka med JWT-token i auth-objektet
  },
})

// Ansluter socketen med aktuell token  från localStorage.
// Token sätts precis innan connect för att undvika gammal/null token.
export function connectSocket() {
  socket.auth = {
    token: getToken(),
  }
  if (!socket.connected) {
    socket.connect()
  }
}

// Stänger socket-anslutningen om den är aktiv
export function disconnectSocket() {
  if (socket.connected) {
    socket.disconnect()
  }
}
