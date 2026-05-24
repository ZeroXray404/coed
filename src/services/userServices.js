// Läser in API-konfigurationen
import { getApiConfig } from './apiConfig.js'
import { getToken } from './authServices.js'
const { API_KEY, AUTH_BASE_URL } = getApiConfig()

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

// === Hämta en specifik användare ===
export async function getOneUser(user_id) {
  const url = `${AUTH_BASE_URL}/users/${user_id}?api_key=${API_KEY}`

  const response = await fetch(url, {
    method: 'GET',
  })

  console.log('response', response)

  const result = await response.json()
  console.log('result', result)

  if (!response.ok) {
    throw new Error(result?.errors?.detail || 'Failed to get users')
  }

  return result
}

// ===Hämta användardata===
export async function getUserData() {
  const url = `${AUTH_BASE_URL}/data?api_key=${API_KEY}`
  const TOKEN = getToken()

  const response = await fetch(url, {
    headers: {
      'x-access-token': [TOKEN],
    },
  })

  const result = await response.json()

  if (!response.ok) {
    throw new Error(result?.errors?.detail || 'Failed to get userdata')
  }
  return result
}

// ===Updatera användardata===

// Exempel på hur man skapar ett data object som ska fetchas med post och uppdatera backend men senaste användar datan
// let data = {
//   artefact: '{"latitude":56.18185835,"longitude":15.5911037,"place":"BTH"}',
//   api_key: `[${API_KEY}]`,
// }

export async function updateUserData(data) {
  const url = `${AUTH_BASE_URL}/data`
  const TOKEN = getToken()

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-access-token': [TOKEN],
    },
    body: JSON.stringify({ data }),
  })
  const result = await response.json()

  if (!response.ok) {
    throw new Error(result?.errors?.detail || 'Failed to update userdata')
  }
  return result
}
