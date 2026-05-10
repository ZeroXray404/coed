import { AppWindow, X, File } from 'lucide-react'
import {
  deleteProjectWithFiles,
  getProjectWithFilesAndUsers,
} from '../../services/fileServices.js'
import { useState } from 'react'

function FileListContent({
  deleteMode,
  setdeleteMode,
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
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  /*
   * prev = current selected IDs
   * includes(id) = check if selected (if ID exists)
   * filter(...) = removes if ID already exists
   * [...prev, id] = adds ID if none exist
   */
  function toggle(uid) {
    setSelectedFiles((prev) =>
      prev.includes(uid) ? prev.filter((x) => x !== uid) : [...prev, uid]
    )

    if (selectedFiles) {
      setShowDeleteModal(true)
    }
  }

  function cancelDeletion() {
    setShowDeleteModal(false)
    setSelectedFiles([])
    setdeleteMode(false)
  }

  async function confirmDeletion() {
    if (selectedFiles.length === 0) {
      setShowDeleteModal(false)
      return
    }
    for (const uid of selectedFiles) {
      await deleteProjectWithFiles(uid)
    }
    await fetchProjects()
    setShowDeleteModal(false)
    setSelectedFiles([])
    setdeleteMode(false)
    console.log('Deletion successful')
  }

  async function handleProjectClick(uid) {
    if (expandedProjectUid === uid) {
      setExpandedProjectUid(null)
      console.log('Collapsing project details for UID:', uid)
      return
    }
    try {
      const result = await getProjectWithFilesAndUsers(uid)
      setExpandedProjectUid(uid)
      setProjectDetails((prev) => ({ ...prev, [uid]: result.data }))
      console.log('Project details:', result)
    } catch (error) {
      console.error('Error fetching project details:', error)
    }
  }

  function handleProjectRowClick(uid) {
    if (deleteMode) {
      toggle(uid)
      return
    }
    handleProjectClick(uid)
  }

  return (
    <div className="sidebar-content">
      {isLoading && <p>Loading projects...</p>}
      {error && <p>{error}</p>}
      {showDeleteModal && selectedFiles.length !== 0 && (
        <div className="delete-modal">
          <div className="delete-modal-text">
            <h1>Confirm Deletion?</h1>
            <p>Are you sure you want to delete?</p>
            <p>Files cannot be recovered once you have confirmed deletion.</p>
            <p>Files to be deleted: {selectedFiles.length}</p>
          </div>
          <div className="delete-modal-btns">
            <button
              type="button"
              className="confirm"
              onClick={confirmDeletion}
              aria-label="Confirm Deletion"
            >
              Delete
            </button>
            <button
              type="button"
              className="cancel"
              onClick={cancelDeletion}
              aria-label="Cancel Deletion"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      <ul>
        {projects
          .filter((project) => project.name && project.name.trim() !== '')
          .map((project) => {
            const isSelected = selectedFiles.includes(project.uid)
            return (
              <li key={project.uid} className={isSelected ? 'selected' : ''}>
                <button
                  className="project-btn"
                  onClick={() => handleProjectRowClick(project.uid)}
                  aria-label={`Open project ${project.name}`}
                >
                  <AppWindow size={16} />
                  {project.name}
                </button>
                <input
                  type="checkbox"
                  name="fileSelect"
                  className={deleteMode ? 'active delete-mode' : ''}
                  checked={isSelected}
                  onChange={() => toggle(project.uid)}
                  aria-label={`Select project ${project.name} for deletion`}
                />
                {expandedProjectUid === project.uid && (
                  <ul className="nested-files">
                    {projectDetails[project.uid]?.files?.map((file) => (
                      <li key={file.uid}>
                        <File size={14} />
                        {file.filename}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            )
          })}
      </ul>
    </div>
  )
}

export default FileListContent
