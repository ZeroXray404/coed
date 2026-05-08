import { AppWindow, X } from 'lucide-react'
import { deleteProjectWithFiles } from '../../services/fileServices.js'
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
}) {
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  /*
   * prev = current selected IDs
   * includes(id) = check if selected (if ID exists)
   * filter(...) = removes if ID already exists
   * [...prev, id] = adds ID if none exist
   */
  function toggle(id) {
    setSelectedFiles((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    )

    if (selectedFiles) {
      setShowDeleteModal(true)
    }
  }

  function cancelDeletion() {
    setShowDeleteModal(false)
    setSelectedFiles([])
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
                <AppWindow size={16} />
                {project.name}
                <input
                  type="checkbox"
                  name="fileSelect"
                  className={deleteMode ? 'active delete-mode' : ''}
                  checked={isSelected}
                  onChange={() => toggle(project.uid)}
                />
              </li>
            )
          })}
      </ul>
    </div>
  )
}

export default FileListContent
