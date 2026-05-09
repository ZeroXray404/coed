import CreateFileHeader from './files/CreateFile'
import FileListContent from './files/FileList'
import AddProjectMemberContent from './files/AddProjectMember'
import { getAllProjects } from '../services/fileServices'
import { useEffect, useState } from 'react'

function SidebarHeader({ deleteMode, setDeleteMode, addMember, setAddMember }) {
  //
  return (
    <CreateFileHeader
      deleteMode={deleteMode}
      setDeleteMode={setDeleteMode}
      addMember={addMember}
      setAddMember={setAddMember}
    />
  )
}

function SidebarContent({
  deleteMode,
  setDeleteMode,
  addMember,
  setAddMember,
  selectedFiles,
  selectedProjects,
  setSelectedProjects,
  setSelectedFiles,
  projects,
  isLoading,
  error,
  users,
  selectedUser,
}) {
  let content = (
    <FileListContent
      deleteMode={deleteMode}
      setDeleteMode={setDeleteMode}
      selectedFiles={selectedFiles}
      setSelectedFiles={setSelectedFiles}
      projects={projects}
      isLoading={isLoading}
      error={error}
    />
  )

  if (deleteMode) {
    content = (
      <FileListContent
        deleteMode={deleteMode}
        setDeleteMode={setDeleteMode}
        selectedFiles={selectedFiles}
        setSelectedFiles={setSelectedFiles}
        projects={projects}
        isLoading={isLoading}
        error={error}
      />
    )
  } else if (addMember) {
    content = (
      <AddProjectMemberContent
        addMember={addMember}
        deleteMode={deleteMode}
        setAddMember={setAddMember}
        selectedProjects={selectedProjects}
        setSelectedProjects={setSelectedProjects}
        selectedFiles={selectedFiles}
        setSelectedFiles={setSelectedFiles}
        projects={projects}
        isLoading={isLoading}
        error={error}
        users={users}
        selectedUser={selectedUser}
      />
    )
  }

  return <div>{content}</div>
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
  const [selectedProjects, setSelectedProjects] = useState([])
  const [projects, setProjects] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [addMember, setAddMember] = useState(false)
  const [users, setUsers] = useState([])
  const [selectedUser, setSelectedUser] = useState('')

  if (!deleteMode && selectedFiles.length > 0) {
    setSelectedFiles([])
  }

  if (!addMember && selectedProjects.length > 0) {
    setSelectedProjects([])
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
      <SidebarHeader
        deleteMode={deleteMode}
        setDeleteMode={setDeleteMode}
        addMember={addMember}
        setAddMember={setAddMember}
      />
      <SidebarContent
        deleteMode={deleteMode}
        addMember={addMember}
        setAddMember={setAddMember}
        selectedFiles={selectedFiles}
        setSelectedFiles={setSelectedFiles}
        selectedProjects={selectedProjects}
        setSelectedProjects={setSelectedProjects}
        projects={projects}
        isLoading={isLoading}
        error={error}
      />
      <SidebarFooter />
    </div>
  )
}

export default SidebarLeft
