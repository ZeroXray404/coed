import { AppWindow, File, Users, UserMinus } from 'lucide-react'

import {
  deleteProjectWithFiles,
  getProjectWithFilesAndUsers,
  deleteFile,
  getFileType,
  removeUserFromProject,
} from '../../services/fileServices.js'
import { forwardRef, useState, useEffect } from 'react'
import { getLanguageFromFileName } from '../../utils/getLanguageFromFileName.js'
import { getIconNameFromFileName } from '../../utils/getIconNameFromFileName.jsx'
import InputField from './FileList/InputField.jsx'
import SortFiles from './FileList/SortFiles.jsx'
import DeleteModal from './FileList/DeleteModal.jsx'
import RemoveUserModal from './FileList/RemoveUserModal.jsx'

// === Komponent för att visa och hantera listan av projekt och filer i sidopanelen ===
function FileListContent(
  {
    currentUser,
    deleteMode,
    setDeleteMode,
    createMode,
    setCreateMode,
    setPendingName,
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
    activeFile,
    setActiveFile,
    setCodeByFileUid,
    setLanguage,
    sortBy,
    setSortBy,
    sortDir,
    setSortDir,
    sharedProjects,
    setSharedProjects,
  },
  ref
) {
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [hoveredProjectUid, setHoveredProjectUid] = useState(null)
  const [showRemoveUserModal, setShowRemoveUserModal] = useState(false)
  const [projectToLeave, setProjectToLeave] = useState(null)

  /*
   * prev = current selected IDs
   * includes(id) = check if selected (if ID exists)
   * filter(...) = removes if ID already exists
   * [...prev, id] = adds ID if none exist
   */

  // === Funktion för att toggla val av projekt för borttagningS ===
  function toggleProject(uid) {
    setSelectedProjects((prev) =>
      prev.includes(uid) ? prev.filter((x) => x !== uid) : [...prev, uid]
    )
    setShowDeleteModal(true)
  }

  useEffect(() => {
    if (deleteMode) {
      console.log('Selected Project to be deleted:', selectedProjects)
    }
  }, [deleteMode, selectedProjects])

  // === Funktion för att toggla val av fil för borttagning ===
  function toggleFile(uid) {
    setSelectedFiles((prev) =>
      prev.includes(uid) ? prev.filter((x) => x !== uid) : [...prev, uid]
    )
    console.log('Selected files to be deleted:', selectedFiles)
    setShowDeleteModal(true)
  }

  function cancelDeletion() {
    setShowDeleteModal(false)
    setSelectedProjects([])
    setSelectedFiles([])
    setDeleteMode(false)
  }

  // === Funktion för att bekräfta borttagning av valda projekt ===
  async function confirmDeletion() {
    if (selectedProjects.length === 0 && selectedFiles.length === 0) {
      setShowDeleteModal(false)
      return
    }
    // Loopar igenom alla valda projekt och anropar deleteProjectWithFiles för varje uid.
    for (const uid of selectedProjects) {
      await deleteProjectWithFiles(uid)
    }
    // Loopar igenom alla valda filer och anropar deleteFile för varje uid.
    for (const uid of selectedFiles) {
      await deleteFile(uid)
    }
    // Efter borttagning, hämta den uppdaterade listan av projekt och stäng modalen
    await fetchProjects()
    if (expandedProjectUid && !selectedProjects.includes(expandedProjectUid)) {
      await refreshExpandedProject(expandedProjectUid)
    }
    setShowDeleteModal(false)
    setSelectedProjects([])
    setSelectedFiles([])
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
      console.log('Number of project members:', result.data.users.length)
    } catch (error) {
      console.error('Error fetching project details:', error)
    }
  }

  // === Funktion för att uppdatera fil-listan efter borttagning av fil ===
  async function refreshExpandedProject(uid) {
    if (!uid) return
    try {
      const result = await getProjectWithFilesAndUsers(uid)
      setProjectDetails((prev) => ({ ...prev, [uid]: result.data }))
      console.log('Refreshed project details:', result.data.name, result)
    } catch (error) {
      console.error('Error refreshing project details:', error)
    }
  }

  // === Funktion för att hantera klick på projekt-rad, toggla deleteMode beroende på dess useState ===
  function handleProjectRowClick(uid) {
    if (deleteMode && expandedProjectUid === uid) {
      toggleProject(uid)
      return
    }

    handleProjectClick(uid)
    setSortBy('filename')
    setSortDir('Desc')

    if (createMode === 'file') {
      setCreateMode('')
    }
  }

  // Körs när användaren klickar på en fil i sidopanelen.
  // Om deleteMode är aktivt markeras filen för borttagning istället.
  // Annars sätts filen som aktiv, filens innehåll initieras i state per fil
  // och editorns språk väljs baserat på filändelsen.
  function handleFileClick(file) {
    if (deleteMode) {
      toggleFile(file.uid)
      return
    }
    // Om användaren klickar på den redan aktiva filen
    // avmarkeras filen och editorn återgår till default-läge
    if (activeFile?.uid === file.uid) {
      setActiveFile(null)
      setLanguage('javascript')
      return
    }

    setActiveFile(file)
    setLanguage(getLanguageFromFileName(file.filename || ''))
    setCodeByFileUid((prev) => {
      // Om filen redan finns i state används det sparade innehållet.
      // Det gör att osparade ändringar kan behållas mellan filbyten.
      let content = prev[file.uid]

      // Om filen inte redan finns i state används innehållet från filobjektet
      if (content === undefined || content === null) {
        content = file.content || ''
      }

      // Returnerar nytt state med tidigare filer + aktuell fil
      return {
        ...prev,
        [file.uid]: content,
      }
    })
    console.log('File details:', file.filename, file)
  }

  useEffect(() => {
    // Hämta alla detaljer för alla projekt
    getAllProjDetails(projects)

    // === Funktion för att visa delade projekt och dess filer i projektlistan ===
    async function getAllProjDetails(projs) {
      try {
        //laddar ner alla projektdetaljer till getDetails
        const getDetails = await Promise.all(
          projs.map(async (project) => {
            const result = await getProjectWithFilesAndUsers(project.uid)
            return { uid: project.uid, ...result.data }
          })
        )
        // Filtrera alla projekten med detaljer och behåll uid för de project där users-arrayen är större än 1, alltså fler än en användare
        const shared = getDetails
          .filter(
            (project) =>
              Array.isArray(project.users) && project.users.length > 1
          )
          .map((project) => project.uid)

        //Spara delade projekt i sharedProjects
        setSharedProjects(shared)
      } catch (err) {
        console.log('No project details are loaded', err)
      }
    }
  }, [projects, setSharedProjects])

  async function handleRemoveUser(projectUid) {
    if (deleteMode) {
      return
    }

    if (!currentUser?.email) {
      console.error('No logged in user availabel')
      return
    }

    try {
      await removeUserFromProject(projectUid, currentUser.email)
      await fetchProjects()
      console.log('Removed user: ', currentUser.email, ' from: ', projectUid)

      if (expandedProjectUid === projectUid) {
        setExpandedProjectUid(null)
      }

      setShowRemoveUserModal(false)
      setProjectToLeave(null)
    } catch (error) {
      console.error('Failed to remove current user from project:', error)
    }
  }

  function openRemoveUserModal(project) {
    if (deleteMode) {
      return
    }

    setProjectToLeave(project)
    setShowRemoveUserModal(true)
  }

  function cancelRemoveUser() {
    setShowRemoveUserModal(false)
    setProjectToLeave(null)
  }

  // Sorterar projekten i bokstavsordning
  const sortedProjects = [...projects].sort((a, b) =>
    a.name.localeCompare(b.name)
  )

  // Funktion som används av sortedFiles för att sortera filerna i ett projekt efter vald sortering
  function getSortedFiles(files, sortBy) {
    const sorted = [...files]

    sorted.sort((a, b) => {
      let comparison = 0

      // Sorterar först efter valda metod
      switch (sortBy) {
        case 'filename':
          comparison = a.filename.localeCompare(b.filename)

          break

        case 'last_changed':
          comparison = new Date(b.last_changed) - new Date(a.last_changed)

          break

        case 'created_by':
          comparison = a.created_by.localeCompare(b.created_by)

          break

        case 'language':
          comparison = getFileType(a).localeCompare(getFileType(b))

          break

        default:
          return 0
      }

      // Sortera återigen i bokstavsordning efter switch-satsen
      if (comparison === 0) {
        comparison = a.filename.localeCompare(b.filename)
      }

      return sortDir === 'Desc' ? comparison : -comparison
    })

    return sorted
  }

  return (
    <div className="sidebar-content">
      {isLoading && <p>Loading projects...</p>}
      {error && <p>{error}</p>}
      {showDeleteModal && (
        <DeleteModal
          selectedProjects={selectedProjects}
          selectedFiles={selectedFiles}
          confirmDeletion={confirmDeletion}
          cancelDeletion={cancelDeletion}
        />
      )}
      <RemoveUserModal
        project={projectToLeave}
        isOpen={showRemoveUserModal}
        onConfirm={() => projectToLeave && handleRemoveUser(projectToLeave.uid)}
        onCancel={cancelRemoveUser}
      />

      <ul ref={ref}>
        {sortedProjects
          // Filtrerar bort projekt utan namn eller med tomt namn, och mappar sedan över projekten
          .filter((project) => project.name && project.name.trim() !== '')
          .map((project) => {
            // Kollar om projektet är valt för borttagning, och lägger till klassen 'selected' om det är det.
            const isSelected = selectedProjects.includes(project.uid)
            // kontrollerar om projektet är med i projektlistan för deladeprojekt
            const isShared = sharedProjects.includes(project.uid)

            const sortedFiles = getSortedFiles(
              projectDetails?.[project.uid]?.files || [],
              sortBy
            )

            return (
              // Skapar en list-item för varje projekt, knapp för att öppna/stänga projektet eller gå in i deleteMode
              <li
                key={project.uid}
                className={`project-list-item ${isSelected ? 'selected' : ''}`}
              >
                <button
                  className={`list-row ${expandedProjectUid === project.uid ? 'active-proj' : ''}`}
                  onClick={() => handleProjectRowClick(project.uid)}
                  aria-label={`Open project ${project.name}`}
                >
                  <div className="listselect-btn">
                    <AppWindow size={16} />
                    <span className="list-label">{project.name}</span>
                    <span></span>
                  </div>
                </button>
                {isShared && (
                  <button
                    type="button"
                    //Knappen får klassen shared-users, men också klassen disabled om deleteMode är aktivt.
                    //Det gör att knappen för att visa delade projekt inte visas om man har deleteMode aktivt.
                    onMouseEnter={() => setHoveredProjectUid(project.uid)}
                    onMouseLeave={() => setHoveredProjectUid(null)}
                    className={`shared-users ${deleteMode ? 'disabled' : ''}`}
                    onClick={() => openRemoveUserModal(project)}
                    disabled={deleteMode}
                    aria-label={`Remove myself from ${project.name}`}
                  >
                    {hoveredProjectUid === project.uid ? (
                      <UserMinus size={16} />
                    ) : (
                      <Users size={16} />
                    )}
                  </button>
                )}

                <input
                  // Om deleteMode är aktiverad, visa checkbox för att markera projektet för borttagning
                  type="checkbox"
                  name="fileSelect"
                  className={deleteMode ? 'active delete-mode' : ''}
                  checked={isSelected}
                  onChange={() => toggleProject(project.uid)}
                  aria-label={`Select project ${project.name} for deletion`}
                />
                {expandedProjectUid === project.uid && (
                  <ul className="nested-files">
                    {/* {sortBy !== '' && <div>{sortBy}</div>} */}
                    {!deleteMode && (
                      <SortFiles
                        uid={project.uid}
                        details={projectDetails}
                        sortBy={sortBy}
                        setSortBy={setSortBy}
                        sortDir={sortDir}
                        setSortDir={setSortDir}
                      />
                    )}
                    {sortedFiles.map((file) => {
                      const isActiveFile = activeFile?.uid === file.uid
                      const isSelectedFile = selectedFiles.includes(file.uid)

                      return (
                        <li
                          key={file.uid}
                          className={`${isActiveFile ? 'active-file' : ''} ${isSelectedFile ? 'selected selected-file' : ''}`.trim()}
                        >
                          <button
                            className={`list-row ${isSelectedFile ? 'selected' : ''}`.trim()}
                            onClick={() => handleFileClick(file)}
                          >
                            <div className="listselect-btn">
                              {getIconNameFromFileName(file.filename)}
                              {/*Returnerar ikon-komponent baserat på filnamnets ändelse*/}
                              <span className="list-label">
                                {file.filename}
                              </span>
                            </div>
                          </button>
                          <input
                            type="checkbox"
                            name="fileSelect"
                            className={deleteMode ? 'active delete-mode' : ''}
                            checked={isSelectedFile}
                            onChange={() => toggleFile(file.uid)}
                            aria-label={`Select file ${file.filename} for deletion`}
                          />
                        </li>
                      )
                    })}
                    {createMode === 'file' && (
                      <InputField
                        createMode={createMode}
                        setPendingName={setPendingName}
                        setCreateMode={setCreateMode}
                        onClose={() => setCreateMode('')}
                      />
                    )}
                  </ul>
                )}
              </li>
            )
          })}
        {createMode === 'proj' && (
          <InputField
            createMode={createMode}
            setPendingName={setPendingName}
            setCreateMode={setCreateMode}
            onClose={() => setCreateMode('')}
          />
        )}
      </ul>
    </div>
  )
}

export default forwardRef(FileListContent)
