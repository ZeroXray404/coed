import { requireApiConfig } from './apiConfig.js'
import { getToken } from './authServices.js'

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

export async function createProject(name) {
  const { DOCKET_BASE_URL } = requireApiConfig()
  const url = `${DOCKET_BASE_URL}/projects/`
  const TOKEN = getToken()

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

// export async function addUserToProject() {}

// export async function deleteProjectWithFiles() {}

// export async function createFile() {}

// export async function deleteFile() {}
