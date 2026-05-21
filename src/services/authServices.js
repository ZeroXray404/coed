import { requireApiConfig } from './apiConfig.js'

// === Registerar en ny användare ===
// Kastar ett fel om registeringen misslyckades (Båda svaren behöver hanteras i den funktion som anropar denna funktion)
// Returnerar API:svaret vid lyckad registering
export async function registerUser(email, password) {
  const { API_KEY, AUTH_BASE_URL } = requireApiConfig()
  const url = `${AUTH_BASE_URL}/register`

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

// === Loggar in en befintlig användare ===
// Kastar ett fel om inloggning misslyckades.(Båda svaren behöver hanteras i den funktion som anropar denna funktion)
// Sparar JWT-token, kontroll om den finns görs i saveToken-funktionen
//Returnerar API:svaret vid lyckad inloggning
export async function loginUser(email, password) {
  const { API_KEY, AUTH_BASE_URL } = requireApiConfig()
  const url = `${AUTH_BASE_URL}/login`

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

  saveToken(result.data.token)

  return result
}

// === Nyckeln som används i localStorage för att spara användarens JWT-token ===
const TOKEN_KEY = 'authToken'
// === Nyckel som används för att hämta användardata från localstorage ===
const USER_KEY = 'currentUser'

// === Sparar JWT-token i localStorage ===
// Säkerställer att en token finns innan den sparas.
export function saveToken(token) {
  if (!token) {
    throw new Error('Token is required to save')
  }
  // Sparar token i webbläsarens localStorage
  localStorage.setItem(TOKEN_KEY, token)
}

// === Hämtar JWT-token från localStorage ===
// Används tex i headers (x-access-token)
// Returnerar token om den finns,annars null
export function getToken() {
  return localStorage.getItem(TOKEN_KEY)
}

// === Tar bort JWT-token från localStorage ===
// Används vid utloggning för att rensa användarens autentiseringsstatus.
export function removeToken() {
  localStorage.removeItem(TOKEN_KEY)
}

// === Loggar ut användaren ===
// Tar bara bort JWT-token från localStorage
export function logoutUser() {
  removeToken()
  clearCurrentUser()
}

// === Kontrollerar om användaren är inloggad ===
// Returnerar true om en JWT-token finns i localStorage, annars false.
export function isLoggedIn() {
  return !!getToken()
}

// === Sparar aktuell användare i local Storage ===
export function saveCurrentUser(user) {
  if (!user) {
    throw new Error('No user saved')
  }
  localStorage.setItem(USER_KEY, JSON.stringify(user))
}

// === Funktion för att hämta aktuell användare ===
export function getCurrentUser() {
  const raw = localStorage.getItem(USER_KEY)
  return raw ? JSON.parse(raw) : null
}

// === Tar bort aktuell användare från local Storage ===
export function clearCurrentUser() {
  localStorage.removeItem(USER_KEY)
}
