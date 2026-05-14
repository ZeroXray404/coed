import CreateFileHeader from './files/CreateFile'
import FileListContent from './files/FileList'
import AddProjectMemberContent from './files/AddProjectMember'
import { getAllProjects } from '../services/fileServices'
import { getAllUsers } from '../services/userServices'
import { useCallback, useEffect, useState } from 'react'

// === Sidopanel header komponent ===
function SidebarLeftHeader({
  deleteMode,
  setDeleteMode,
  fetchProjects,
  expandedProjectUid,
  setSelectedProjects,
  setProjectDetails,
  addMember,
  setAddMember,
}) {
  return (
    <CreateFileHeader
      deleteMode={deleteMode}
      setDeleteMode={setDeleteMode}
      fetchProjects={fetchProjects}
      expandedProjectUid={expandedProjectUid}
      setSelectedProjects={setSelectedProjects}
      setProjectDetails={setProjectDetails}
      addMember={addMember}
      setAddMember={setAddMember}
    />
  )
}

// === Sidopanel content komponent ===
function SidebarLeftContent({
  deleteMode,
  setDeleteMode,
  selectedProjects,
  setSelectedProjects,
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
  users,
  addMember,
  setAddMember,
}) {
  return addMember ? (
    <AddProjectMemberContent
      users={users}
      addMember={addMember}
      setAddMember={setAddMember}
      selectedProjects={selectedProjects}
      setSelectedProjects={setSelectedProjects}
      projects={projects}
      isLoading={isLoading}
      error={error}
    />
  ) : (
    <FileListContent
      deleteMode={deleteMode}
      setDeleteMode={setDeleteMode}
      selectedProjects={selectedProjects}
      setSelectedProjects={setSelectedProjects}
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

// === Sidopanel footer komponent ===
function SidebarLeftFooter() {
  return (
    <div className="sidebar-footer">
      <h3>Sidebar Footer</h3>
    </div>
  )
}

// === Huvudkomponent för sidopanelen ===
function SidebarLeft({ isLoggedIn }) {
  const [deleteMode, setDeleteMode] = useState(false)
  const [selectedProjects, setSelectedProjects] = useState([])
  const [selectedFiles, setSelectedFiles] = useState([])
  const [projects, setProjects] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [expandedProjectUid, setExpandedProjectUid] = useState(null)
  const [projectDetails, setProjectDetails] = useState({})
  const [users, setUsers] = useState([])
  const [usersLoaded, setUsersLoaded] = useState(false)
  const [addMember, setAddMember] = useState(false)

  useEffect(() => {
    if (!deleteMode && !addMember && selectedProjects.length > 0) {
      setSelectedProjects([])
    }
  }, [deleteMode, addMember, selectedProjects])

  useEffect(() => {
    if (!deleteMode && !addMember && selectedFiles.length > 0) {
      setSelectedFiles([])
    }
  }, [deleteMode, addMember, selectedFiles])

  // === Funktion för att hämta alla projekt ===
  // useCallback för att kunna återanvänmda fetchProjects utan att fastna i oändliga loopar i useEffect.
  const fetchProjects = useCallback(async () => {
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
  }, [isLoggedIn])

  // useEffect för att hämta projekten när komponenten mountas eller när isLoggedIn ändras.
  useEffect(() => {
    fetchProjects()
  }, [fetchProjects])

  // === Funktion för att hämta alla användare ===
  const fetchUsers = useCallback(async () => {
    if (!isLoggedIn) {
      setUsers([])
      setUsersLoaded(false)
      setError('')
      return
    }

    try {
      setIsLoading(true)
      setError('')
      const result = await getAllUsers()
      setUsers(result?.data || [])
      setUsersLoaded(true)
    } catch (loadError) {
      setError(loadError.message || 'Failed to fetch users')
    } finally {
      setIsLoading(false)
    }
  }, [isLoggedIn])

  // === Lazy loading av användare när addMember är true ===q
  useEffect(() => {
    if (addMember && !usersLoaded) {
      fetchUsers()
    }
  }, [addMember, usersLoaded, fetchUsers])

  return (
    <div className="sidebar-left">
      <SidebarLeftHeader
        deleteMode={deleteMode}
        setDeleteMode={setDeleteMode}
        fetchProjects={fetchProjects}
        expandedProjectUid={expandedProjectUid}
        setSelectedProjects={setSelectedProjects}
        setProjectDetails={setProjectDetails}
        addMember={addMember}
        setAddMember={setAddMember}
      />
      <SidebarLeftContent
        deleteMode={deleteMode}
        setDeleteMode={setDeleteMode}
        selectedProjects={selectedProjects}
        setSelectedProjects={setSelectedProjects}
        selectedFiles={selectedFiles}
        setSelectedFiles={setSelectedFiles}
        projects={projects}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        error={error}
        setError={setError}
        fetchProjects={fetchProjects}
        expandedProjectUid={expandedProjectUid}
        setExpandedProjectUid={setExpandedProjectUid}
        projectDetails={projectDetails}
        setProjectDetails={setProjectDetails}
        users={users}
        setUsers={setUsers}
        addMember={addMember}
        setAddMember={setAddMember}
      />
      <SidebarLeftFooter />
    </div>
  )
}

export default SidebarLeft
