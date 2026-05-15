import { AppWindow, X, File } from 'lucide-react'
import {
  deleteProjectWithFiles,
  getProjectWithFilesAndUsers,
  //deleteFile, //används när flödet för att ta bort enskilda filer implementeras
} from '../../services/fileServices.js'
import { forwardRef, useState } from 'react'
import { getLanguageFromFileName } from '../../utils/getLanguageFromFileName.js'

// === Komponent för att visa och hantera listan av projekt och filer i sidopanelen ===
function FileListContent(
  {
    deleteMode,
    setDeleteMode,
    selectedProjects,
    setSelectedProjects,
    selectedFiles,
    // setSelectedFiles, // används när flödet för att ta bort enskilda filer implementeras
    projects,
    isLoading,
    error,
    fetchProjects,
    expandedProjectUid,
    setExpandedProjectUid,
    projectDetails,
    setProjectDetails,
    activeFile,
    setActiveFile,
    setCode,
    setLanguage,
  },
  ref
) {
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  //const [showAddUserModal, setShowAddUserModal] = useState(false)

  /*
   * prev = current selected IDs
   * includes(id) = check if selected (if ID exists)
   * filter(...) = removes if ID already exists
   * [...prev, id] = adds ID if none exist
   */

  // === Funktion för att toggla val av projekt för borttagningS ===
  function toggle(uid) {
    setSelectedProjects((prev) =>
      prev.includes(uid) ? prev.filter((x) => x !== uid) : [...prev, uid]
    )

    if (selectedProjects) {
      setShowDeleteModal(true)
    }
  }

  function cancelDeletion() {
    setShowDeleteModal(false)
    setSelectedProjects([])
    setDeleteMode(false)
  }

  // === Funktion för att bekräfta borttagning av valda projekt ===
  async function confirmDeletion() {
    if (selectedProjects.length === 0) {
      setShowDeleteModal(false)
      return
    }
    // Loopar igenom alla valda projekt och anropar deleteProjectWithFiles för varje uid.
    // kanske kan skapa en if sats för att hantera borttagning av enskilda filer när den funktionen är implementerad, så att deleteMode kan användas både för att ta bort projekt och enskilda filer.
    for (const uid of selectedProjects) {
      await deleteProjectWithFiles(uid)
    }
    // Efter borttagning, hämta den uppdaterade listan av projekt och stäng modalen
    await fetchProjects()
    setShowDeleteModal(false)
    setSelectedProjects([])
    setDeleteMode(false)
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
      console.log('Project details:', result.data.name, result)
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

  // Körs när användaren klickar på en fil i sidopanelen
  // Sätter filen som aktiv, läser in filens content i editorn
  // och väljer rätt editor-språk baserat på filändelsen i filnamnet
  function handleFileClick(file) {
    setActiveFile(file)
    setCode(file.content || '')
    setLanguage(getLanguageFromFileName(file.filename || ''))
  }

  return (
    <div className="sidebar-content">
      {isLoading && <p>Loading projects...</p>}
      {error && <p>{error}</p>}
      {showDeleteModal && selectedProjects.length !== 0 && (
        <div className="delete-modal">
          <div className="delete-modal-text">
            <h1>Confirm Deletion?</h1>
            <p>Are you sure you want to delete?</p>
            <p>Files can´t be recovered once deleted.</p>
            <p>Projects to be deleted: {selectedProjects.length}</p>
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

      <ul ref={ref}>
        {projects
          // Filtrerar bort projekt utan namn eller med tomt namn, och mappar sedan över projekten
          .filter((project) => project.name && project.name.trim() !== '')
          .map((project) => {
            // Kollar om projektet är valt för borttagning, och lägger till klassen 'selected' om det är det.
            const isSelected = selectedProjects.includes(project.uid)
            return (
              // Skapar en list-item för varje projekt, knapp för att öppna/stänga projektet eller gå in i deleteMode
              <li key={project.uid} className={isSelected ? 'selected' : ''}>
                <div className="list-row">
                  <button
                    className="listselect-btn"
                    onClick={() => handleProjectRowClick(project.uid)}
                    aria-label={`Open project ${project.name}`}
                  >
                    <AppWindow size={16} />
                    <span className="list-label">{project.name}</span>
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
                </div>
                {expandedProjectUid === project.uid && (
                  <ul className="nested-files">
                    {projectDetails[project.uid]?.files?.map((file) => {
                      const isActiveFile = activeFile?.uid === file.uid

                      return (
                        <li
                          key={file.uid}
                          className={isActiveFile ? 'active-file' : ''}
                        >
                          <div className="list-row">
                            <button
                              className="listselect-btn"
                              onClick={() => handleFileClick(file)}
                            >
                              <File size={14} />
                              <span className="list-label">
                                {file.filename}
                              </span>
                            </button>

                            <input
                              type="checkbox"
                              name="fileSelect"
                              className={deleteMode ? 'active delete-mode' : ''}
                              checked={false}
                              onChange={() => toggle(file.uid)}
                              aria-label={`Select file ${file.filename} for deletion`}
                            />
                          </div>
                        </li>
                      )
                    })}
                  </ul>
                )}
              </li>
            )
          })}
      </ul>
    </div>
  )
}

export default forwardRef(FileListContent)
