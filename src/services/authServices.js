// Läser in API-konfigurationen
import { getApiConfig } from './apiConfig.js'
const { API_KEY, BASE_URL } = getApiConfig()

/*
- Registerar en ny användare
- Tar emot email och password som argument och skickar en POST-förfrågan,
- till /register tillsammans med API-nyckeln.
- Returnerar API:svaret vid lyckad registering,
- eller kastar ett fel om registeringen misslyckades (Båda svaren behöver hanteras i den funktion som anropar denna funktion)
*/
export async function registerUser(email, password) {
  const url = `${BASE_URL}/register`

  const userData = {
    api_key: API_KEY,
    email,
    password,
  }
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },

    body: JSON.stringify(userData),
  })

  const result = await response.json()

  if (!response.ok) {
    throw new Error(result?.errors?.detail || 'Failed to register user')
  }

  return result
}

/*
- Loggar in en befintlig användare
- Tar emot email och password som argument och skickar en POST-förfrågan
- till /login tillsammans med API-nyckeln.
- Returnerar API:svaret vid lyckad inloggning,
- eller kastar ett fel om inloggning misslyckades.(Båda svaren behöver hanteras i den funktion som anropar denna funktion)
- Sparar JWT-token vid lyckad inloggning.
*/
export async function loginUser(email, password) {
  const url = `${BASE_URL}/login`

  const userData = {
    api_key: API_KEY,
    email,
    password,
  }
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  })

  const result = await response.json()

  if (!response.ok) {
    throw new Error(result?.errors?.detail || 'Failed to login user')
  }

  // Sparar JWT-token, kontroll om den finns görs i saveToken-funktionen
  saveToken(result.data.token)
  return result
}

// Nyckeln som används i localStorage för att spara användarens JWT-token
const TOKEN_KEY = 'authToken'

/*
- Sparar JWT-token i localStorage
- Anropas efter en lyckad inloggning.
- Token används senare för autentisering av API-förfrågningar som kräver inloggning.
*/
export function saveToken(token) {
  // Säkerställer att en token finns innan den sparas.
  if (!token) {
    throw new Error('Token is required to save')
  }
  // Sparar token i webbläsarens localStorage
  localStorage.setItem(TOKEN_KEY, token)
}

/*
- Hämtar JWT-token från localStorage
- Används när vi behöver skicka med token i API-anrop,
- tex i headers (x-access-token)
- 
- Returnerar:
- token om den finns,
- eller null om ingen token är sparad.
*/
export function getToken() {
  return localStorage.getItem(TOKEN_KEY)
}

/*
- Tar bort JWT-token från localStorage
- Används vid utloggning för att rensa användarens autentiseringsstatus.
*/
export function removeToken() {
  localStorage.removeItem(TOKEN_KEY)
}

/*
- Loggar ut användaren
- Tar bara bort JWT-token från localStorage
- Kan utökas i framtiden för att även rensa annan data eller annat.
*/
export function logoutUser() {
  removeToken()
}

/*
- Kontrollerar om användaren är inloggad
- Returnerar true om en JWT-token finns i localStorage, annars false.
*/
export function isLoggedIn() {
  return !!getToken()
}
