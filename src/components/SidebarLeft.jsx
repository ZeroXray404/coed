import CreateFileHeader from './files/CreateFile'
import FileListContent from './files/FileList'
import { getAllProjects } from '../services/fileServices'
import { useEffect, useState } from 'react'

function SidebarLeftHeader({ deleteMode, setDeleteMode }) {
  return (
    <CreateFileHeader deleteMode={deleteMode} setDeleteMode={setDeleteMode} />
  )
}

function SidebarLeftContent({
  deleteMode,
  setDeleteMode,
  selectedFiles,
  setSelectedFiles,
  projects,
  isLoading,
  error,
  fetchProjects,
  expandedProjectUid,
  setExpandedProjectUid,
  projectDetails,
  setProjectDetails,
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
      fetchProjects={fetchProjects}
      expandedProjectUid={expandedProjectUid}
      setExpandedProjectUid={setExpandedProjectUid}
      projectDetails={projectDetails}
      setProjectDetails={setProjectDetails}
    />
  )
}

function SidebarLeftFooter() {
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
  const [expandedProjectUid, setExpandedProjectUid] = useState(null)
  const [projectDetails, setProjectDetails] = useState({})

  if (!deleteMode && selectedFiles.length > 0) {
    setSelectedFiles([])
  }

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

  useEffect(() => {
    fetchProjects()
  }, [isLoggedIn])

  return (
    <div className="sidebar-left">
      <SidebarLeftHeader
        deleteMode={deleteMode}
        setDeleteMode={setDeleteMode}
      />
      <SidebarLeftContent
        deleteMode={deleteMode}
        setDeleteMode={setDeleteMode}
        selectedFiles={selectedFiles}
        setSelectedFiles={setSelectedFiles}
        projects={projects}
        isLoading={isLoading}
        error={error}
        fetchProjects={fetchProjects}
        expandedProjectUid={expandedProjectUid}
        setExpandedProjectUid={setExpandedProjectUid}
        projectDetails={projectDetails}
        setProjectDetails={setProjectDetails}
      />
      <SidebarLeftFooter />
    </div>
  )
}

export default SidebarLeft
