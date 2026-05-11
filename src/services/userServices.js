// Läser in API-konfigurationen
import { getApiConfig } from './apiConfig.js'
const { API_KEY, AUTH_BASE_URL } = getApiConfig()

// Användardata

// === Hämta alla användare ===
export async function getAllUsers() {
  const url = `${AUTH_BASE_URL}/users?api_key=${API_KEY}`

  const response = await fetch(url, {
    method: 'GET',
  })

  console.log(response)

  const result = await response.json()
  console.log(result)

  if (!response.ok) {
    throw new Error(result?.errors?.detail || 'Failed to get users')
  }

  return result
}

// Hämta användarprofil med ID

// Updatera användarprofil
