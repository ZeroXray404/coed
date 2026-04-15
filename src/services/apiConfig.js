// Funktion för att hämta API-konfigurationen från .env.local
export function getApiConfig() {
  // 1. Läser env
  const API_KEY = import.meta.env.VITE_API_KEY
  const BASE_URL = import.meta.env.VITE_BASE_URL

  // 2. Validerar att det finns
  if (!API_KEY) {
    throw new Error('API_KEY är inte definerard .env.local')
  }
  if (!BASE_URL) {
    throw new Error('BASE_URL är inte definerad i .env.local')
  }

  // 3. Returnera konfigruationen
  return { API_KEY, BASE_URL }
}
