// Hämtar API-konfiguration från env
// Returnerar { API_KEY, AUTH_BASE_URL, DOCKET_BASE_URL } eller null om något saknas
export function getApiConfig() {
  // 1. Läser env
  const API_KEY = import.meta.env.VITE_API_KEY
  const AUTH_BASE_URL = import.meta.env.VITE_AUTH_BASE_URL
  const DOCKET_BASE_URL = import.meta.env.VITE_DOCKET_BASE_URL

  // 2. Validerar att det finns
  if (!API_KEY || !AUTH_BASE_URL || !DOCKET_BASE_URL) {
    console.warn('API-konfiguration saknas. API-funktioner är inaktiverade.')
    return null
  }

  // 3. Returnera konfigruationen
  return { API_KEY, AUTH_BASE_URL, DOCKET_BASE_URL }
}

// Säker version av getApiConfig
// Kastar fel om config saknas (används vid API-anrop)
export function requireApiConfig() {
  const config = getApiConfig()

  if (!config) {
    throw new Error('API är inte tillgängligt i denna miljö')
  }

  return config
}
