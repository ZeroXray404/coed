import CreateFileHeader from './files/CreateFile'
import FileListContent from './files/FileList'
import { getAllProjects } from '../services/fileServices'
import { useEffect, useState } from 'react'

function SidebarHeader({ deleteMode, setDeleteMode }) {
  return (
    <CreateFileHeader deleteMode={deleteMode} setDeleteMode={setDeleteMode} />
  )
}

function SidebarContent({
  deleteMode,
  setDeleteMode,
  selectedFiles,
  setSelectedFiles,
  projects,
  isLoading,
  error,
}) {
  return (
    <FileListContent
      deleteMode={deleteMode}
      setdeleteMode={setDeleteMode}
      selectedFiles={selectedFiles}
      setSelectedFiles={setSelectedFiles}
      projects={projects}
      isLoading={isLoading}
      error={error}
    />
  )
}

function SidebarFooter() {
  return (
    <div className="sidebar-footer">
      <h3>Sidebar Footer</h3>
    </div>
  )
}

function SidebarLeft({ isLoggedIn }) {
  const [deleteMode, setDeleteMode] = useState(false)
  const [selectedFiles, setSelectedFiles] = useState([])
  const [projects, setProjects] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  if (!deleteMode && selectedFiles.length > 0) {
    setSelectedFiles([])
  }

  useEffect(() => {
    async function fetchProjects() {
      if (!isLoggedIn) {
        setProjects([])
        setError('')
        return
      }

      try {
        setIsLoading(true)
        setError('')
        const result = await getAllProjects()
        setProjects(result?.data || [])
      } catch (loadError) {
        setError(loadError.message || 'Failed to fetch projects')
      } finally {
        setIsLoading(false)
      }
    }

    fetchProjects()
  }, [isLoggedIn])

  return (
    <div className="sidebar-left">
      <SidebarHeader deleteMode={deleteMode} setDeleteMode={setDeleteMode} />
      <SidebarContent
        deleteMode={deleteMode}
        setDeleteMode={setDeleteMode}
        selectedFiles={selectedFiles}
        setSelectedFiles={setSelectedFiles}
        projects={projects}
        isLoading={isLoading}
        error={error}
      />
      <SidebarFooter />
    </div>
  )
}

export default SidebarLeft
