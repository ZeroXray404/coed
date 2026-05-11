import { AppWindow, X, File } from 'lucide-react'
import {
  deleteProjectWithFiles,
  getProjectWithFilesAndUsers,
  //deleteFile, //används när flödet för att ta bort enskilda filer implementeras
} from '../../services/fileServices.js'
import { useState } from 'react'

// === Komponent för att visa och hantera listan av projekt och filer i sidopanelen ===
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

  // === Funktion för att toggla val av projekt för borttagningS ===
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

  // === Funktion för att bekräfta borttagning av valda projekt ===
  async function confirmDeletion() {
    if (selectedFiles.length === 0) {
      setShowDeleteModal(false)
      return
    }
    // Loopar igenom alla valda projekt och anropar deleteProjectWithFiles för varje uid.
    // kanske kan skapa en if sats för att hantera borttagning av enskilda filer när den funktionen är implementerad, så att deleteMode kan användas både för att ta bort projekt och enskilda filer.
    for (const uid of selectedFiles) {
      await deleteProjectWithFiles(uid)
    }
    // Efter borttagning, hämta den uppdaterade listan av projekt och stäng modalen
    await fetchProjects()
    setShowDeleteModal(false)
    setSelectedFiles([])
    setdeleteMode(false)
    console.log('Deletion successful')
  }

  // === Funktion för att hämta filer och användare för ett projekt när det klickas på ===
  async function handleProjectClick(uid) {
    if (expandedProjectUid === uid) {
      setExpandedProjectUid(null)
      console.log('Collapsing project details for uid:', uid)
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

  // === Funktion för att hantera klick på projekt-rad, toggla deleteMode beroende på dess useState ===
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
          // Filtrerar bort projekt utan namn eller med tomt namn, och mappar sedan över projekten
          .filter((project) => project.name && project.name.trim() !== '')
          .map((project) => {
            // Kollar om projektet är valt för borttagning, och lägger till klassen 'selected' om det är det.
            const isSelected = selectedFiles.includes(project.uid)
            return (
              // Skapar en list-item för varje projekt, knapp för att öppna/stänga projektet eller gå in i deleteMode
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
                  // Om deleteMode är aktiverad, visa checkbox för att markera projektet för borttagning
                  type="checkbox"
                  name="fileSelect"
                  className={deleteMode ? 'active delete-mode' : ''}
                  checked={isSelected}
                  onChange={() => toggle(project.uid)}
                  aria-label={`Select project ${project.name} for deletion`}
                />
                {expandedProjectUid === project.uid && (
                  // Om projektet är expanderat, visa dess filer i en nested lista
                  <ul className="nested-files">
                    {projectDetails[project.uid]?.files?.map((file) => (
                      <li
                        key={file.uid}
                        className={isSelected ? 'selected' : ''}
                      >
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
