import { requireApiConfig } from './apiConfig.js'
import { getToken } from './authServices.js'
import { getLanguageFromFileName } from '../utils/getLanguageFromFileName.js'

// === Hämta alla projekt ===
export async function getAllProjects() {
  const { DOCKET_BASE_URL } = requireApiConfig()
  const url = `${DOCKET_BASE_URL}/projects`
  const TOKEN = getToken()

  const response = await fetch(url, {
    headers: {
      'x-access-token': [TOKEN],
    },
  })
  const result = await response.json()

  if (!response.ok) {
    throw new Error(result?.errors?.detail || 'Failed to get projects')
  }

  return result
}

// === Hämta ett projekt med alla filer och användare ===
export async function getProjectWithFilesAndUsers(uid) {
  const { DOCKET_BASE_URL } = requireApiConfig()
  const url = `${DOCKET_BASE_URL}/projects/${uid}`
  const TOKEN = getToken()

  const response = await fetch(url, {
    headers: {
      'x-access-token': [TOKEN],
    },
  })
  const result = await response.json()

  if (!response.ok) {
    throw new Error(
      result?.errors?.detail || 'Failed to get project with files & users'
    )
  }
  return result
}

// === Skapa ett nytt projekt ===
export async function createProject(name) {
  const { DOCKET_BASE_URL } = requireApiConfig()
  const url = `${DOCKET_BASE_URL}/projects`
  const TOKEN = getToken()

  if (!name || name.trim() === '') {
    throw new Error('Project name cannot be empty')
  }

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-access-token': [TOKEN],
    },
    body: JSON.stringify({ name }),
  })
  const result = await response.json()

  if (!response.ok) {
    throw new Error(result?.errors?.detail || 'Failed to create project')
  }
  return result
}

// === Lägg till en användare i ett projekt ===
export async function addUserToProject(uid, email) {
  const { DOCKET_BASE_URL } = requireApiConfig()
  const url = `${DOCKET_BASE_URL}/projects/add_user`
  const TOKEN = getToken()

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-access-token': [TOKEN],
    },
    body: JSON.stringify({ uid, email }),
  })
  const result = await response.json()

  if (!response.ok) {
    throw new Error(result?.errors?.detail || 'Failed to add user to project')
  }
  return result
}

// Ta bort en användare från ett projekt
export async function removeUserFromProject(uid, email) {
  const { DOCKET_BASE_URL } = requireApiConfig()
  const url = `${DOCKET_BASE_URL}/projects/remove_user`
  const TOKEN = getToken()

  const seponse = await fetch(url, {
    method: 'DELETE',
    headers: {
      'content-type': 'application/json',
      'x-access-token': [TOKEN],
    },
    body: JSON.stringify({ uid, email }),
  })

  if (!seponse.ok) {
    throw new Error('Failed to remove user from project')
  }
}

// === Ta bort ett projekt och alla dess filer ===
export async function deleteProjectWithFiles(uid) {
  const { DOCKET_BASE_URL } = requireApiConfig()
  const url = `${DOCKET_BASE_URL}/projects`
  const TOKEN = getToken()

  const response = await fetch(url, {
    method: 'DELETE',
    headers: {
      'content-type': 'application/json',
      'x-access-token': [TOKEN],
    },
    body: JSON.stringify({ uid }),
  })

  if (!response.ok) {
    throw new Error('Failed to delete project with files')
  }
}

// === Skapa en ny fil i ett projekt ===
export async function createFile(filename, project_uid, parent_file) {
  const { DOCKET_BASE_URL } = requireApiConfig()
  const url = `${DOCKET_BASE_URL}/files`
  const TOKEN = getToken()

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-access-token': [TOKEN],
    },
    body: JSON.stringify({ filename, project_uid, parent_file }),
  })
  const result = await response.json()

  if (!response.ok) {
    throw new Error(result?.errors?.detail || 'Failed to create file')
  }
  return result
}

// === Ta bort en fil ===
export async function deleteFile(uid) {
  const { DOCKET_BASE_URL } = requireApiConfig()
  const url = `${DOCKET_BASE_URL}/files`
  const TOKEN = getToken()

  const response = await fetch(url, {
    method: 'DELETE',
    headers: {
      'content-type': 'application/json',
      'x-access-token': [TOKEN],
    },
    body: JSON.stringify({ uid }),
  })

  if (!response.ok) {
    throw new Error('Failed to delete file')
  }
}

// Funktioner nedan relaterade till hämtande av metadata från filer

// === Returnerar filnamnet utan filändelsen ===
export function getFileName(file) {
  const fileName = file.filename

  return fileName.split('.').shift()
}

// === Returnerar datum och tid i ISO 8601 format ===
// (men kan returneras med formattering som gör det läsbart för användaren)
export function getDateModified(file, formattedDate = false) {
  if (!formattedDate) {
    return file.last_changed
  }

  const iso = file.last_changed
  const date = new Date(iso)

  const datePart = date.toLocaleDateString('sv-SE')
  const timePart = date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  })

  const dateModified = `${datePart}, ${timePart}`

  return dateModified
}

// === Returnerar filskaparens namn från email ===
export function getFileCreator(file) {
  const fileCreator = file.created_by

  return fileCreator.split('@').shift()
}

// === Returnerar språket baserat på filändelse ===
export function getFileType(file) {
  const language = getLanguageFromFileName(file.filename)

  if (language === 'plaintext') {
    return 'z' // för okända filtyper
  }

  return language
}

// === Formatterar och returnerar språket kapitaliserat ===
export function formatLanguage(language) {
  if (language === 'z') {
    return 'N/A'
  }

  if (language === 'javascript' || language === 'typescript') {
    const firstHalf = language.charAt(0).toUpperCase() + language.slice(1, 4)

    return `${firstHalf}Script`
  }

  if (
    language === 'html' ||
    language === 'css' ||
    language === 'scss' ||
    language === 'json'
  ) {
    return language.toUpperCase()
  }

  return language.charAt(0).toUpperCase() + language.slice(1)
}
