// Hämtar API-konfiguration från env
// Returnerar { API_KEY, BASE_URL } eller null om något saknas
export function getApiConfig() {
  // 1. Läser env
  const API_KEY = import.meta.env.VITE_API_KEY
  const BASE_URL = import.meta.env.VITE_BASE_URL

  // 2. Validerar att det finns
  if (!API_KEY || !BASE_URL) {
    console.warn('API-konfiguration saknas. API-funktioner är inaktiverade.')
    return null
  }

  // 3. Returnera konfigruationen
  return { API_KEY, BASE_URL }
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
