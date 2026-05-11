// Ansvar för själva socket-asnlutningen
// skicka med token
// exportera socket instansen
// evetuellt hantera reconnect / disconnect på låg nivå

import { io } from 'socket.io-client'
import { getToken } from './authServices'

const SOCKET_URL = 'https://docket.emilfolino.se'

export const socket = io(SOCKET_URL, {
  autoConnect: false, // Vi vill inte ansluta direkt, vi gör det manuellt efter att ha hämtat token
  auth: {
    token: getToken(), // Skicka med JWT-token i auth-objektet
  },
})

// Testfunktion för att kontrollera socket-asnlutningen manuellt
export function connectSocket() {
  socket.auth = {
    token: getToken(),
  }
  socket.connect()
}
