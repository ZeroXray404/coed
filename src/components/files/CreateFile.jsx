import {
  Trash2,
  FolderOutput,
  FolderPlus,
  FilePlus,
  UserPlus,
} from 'lucide-react'
import {
  createProject,
  createFile,
  getProjectWithFilesAndUsers,
} from '../../services/fileServices.js'
import { useEffect } from 'react'

// === Komponent för att hantera knappar och funktioner i sidopanelens header ===
function CreateFileHeader({
  deleteMode,
  setDeleteMode,
  createMode,
  setCreateMode,
  pendingName,
  setPendingName,
  fetchProjects,
  expandedProjectUid,
  setSelectedProjects,
  setProjectDetails,
  addMember,
  setAddMember,
}) {
  // === Funktion för att skapa ett nytt projekt ===
  async function handleCreateProject(name) {
    if (!name || name.trim() === '') {
      // validering så att projektet inte skapas med tomt fält
      // Vid skapande av inputfält kan här skapas ett tootip istället för alert
      alert('Project name cannot be empty')
      return
    }
    try {
      await createProject(name.trim())
      console.log(`Project ${name} has been created successfully`)
      await fetchProjects()
    } catch (error) {
      alert(`Error creating project: ${error.message}`)
    }
  }

  // === Funktion för att skapa en ny fil i ett projekt ===
  async function handleCreateFile(filename) {
    if (!expandedProjectUid) {
      // validering så att filen inte skapas utan att ett projekt är valt
      // Använda tooltip för denna med??
      alert('Please select a project to add the file to')
      return
    }
    if (!filename || filename.trim() === '') {
      // validering så att filen inte skapas med tomt fält
      // Vid skapande av inputfält kan här skapas ett tootip istället för alert
      alert('File name cannot be empty')
      return
    }
    try {
      await createFile(filename.trim(), expandedProjectUid, null)
      const result = await getProjectWithFilesAndUsers(expandedProjectUid)
      setProjectDetails((prev) => ({
        ...prev,
        [expandedProjectUid]: result.data,
      }))
      console.log(`File ${filename} has been created successfully`)
    } catch (error) {
      alert(`Error creating file: ${error.message}`)
    }
  }

  useEffect(() => {
    if (pendingName === '') return

    switch (createMode) {
      case 'proj':
        handleCreateProject(pendingName)
        setCreateMode('')
        setPendingName('')

        break
      case 'file':
        handleCreateFile(pendingName, expandedProjectUid, null)
        setCreateMode('')
        setPendingName('')

        break
      default:
        setCreateMode('')
        setPendingName('')

        break
    }
  }, [
    createMode,
    pendingName,
    expandedProjectUid,
    handleCreateFile,
    handleCreateProject,
    setCreateMode,
    setPendingName,
  ])

  return (
    <div className="sidebar-header">
      <div className="sidebar-header-left">
        <button
          className={`sidebar-header-btn btn-delete ${deleteMode ? 'delete-mode' : ''}`}
          onClick={() => {
            if (addMember) {
              setSelectedProjects([])
              setAddMember(false)
              setDeleteMode(true)
              return
            }
            setDeleteMode((prev) => !prev)
          }}
        >
          <Trash2 />
        </button>
      </div>
      <div className="sidebar-header-right">
        <button
          className={`sidebar-header-btn btn-newprojmemb ${addMember ? 'add-member' : ''}`}
          onClick={() => {
            if (deleteMode) {
              setSelectedProjects([])
              setDeleteMode(false)
              setAddMember(true)
              return
            }
            setAddMember((prev) => !prev)
          }}
        >
          <UserPlus />
        </button>
        {/* <button className="sidebar-header-btn btn-projback">
          <FolderOutput />
        </button> */}
        <button
          className="sidebar-header-btn btn-newproj"
          onClick={() => {
            setCreateMode('proj')

            // // Prompten kan bytas ut mot formulär input i sidopanelen för att skapa nya projekt.
            // const projectName = prompt('Enter project name:')
            // if (projectName === null) {
            //   return
            // } else {
            //   handleCreateProject(projectName)
            // }
          }}
        >
          <FolderPlus />
        </button>
        <button
          className="sidebar-header-btn btn-newfile"
          onClick={() => {
            setCreateMode('file')

            // // Prompten kan bytas ut mot formulär input i sidopanelen för att skapa nya filer.
            // const fileName = prompt('Enter file name:')
            // if (fileName === null) {
            //   return
            // } else {
            //   handleCreateFile(fileName, expandedProjectUid, null)
            // }
          }}
        >
          <FilePlus />
        </button>
      </div>
    </div>
  )
}

export default CreateFileHeader
