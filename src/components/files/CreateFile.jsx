import { Trash2, FolderOutput, FolderPlus, FilePlus } from 'lucide-react'
import { createProject, createFile } from '../../services/fileServices.js'

// === Komponent för att hantera knappar och funktioner i sidopanelens header ===
function CreateFileHeader({ deleteMode, setDeleteMode, fetchProjects }) {
  // === Funktion för att skapa ett nytt projekt ===
  async function handleCreateProject(name) {
    // Vid skapande av inputfält kan här skapas ett tooltip som visar att namnet inte får vara tomt istället för att använda alert.
    if (!name || name.trim() === '') {
      alert('Project name cannot be empty')
      return
    }
    try {
      await createProject(name.trim())
      alert('Project created successfully')
      await fetchProjects()
    } catch (error) {
      alert(`Error creating project: ${error.message}`)
    }
    // === Funktion för att skapa en ny fil i ett projekt ===
    //async function handleCreateFile(project_uid, filename)
  }
  return (
    <div className="sidebar-header">
      <div className="sidebar-header-left">
        <button
          onClick={() => setDeleteMode((prev) => !prev)}
          className={`sidebar-header-btn btn-delete ${deleteMode ? 'delete-mode' : ''}`}
        >
          <Trash2 />
        </button>
      </div>
      <div className="sidebar-header-right">
        <button className="sidebar-header-btn btn-projback">
          <FolderOutput />
        </button>
        <button
          className="sidebar-header-btn btn-newproj"
          onClick={() => {
            // Här kan prompten bytas ut mot formulär i sidopanelen för att skapa nya projekt.
            const projectName = prompt('Enter project name:')
            if (projectName === null) {
              return
            } else {
              handleCreateProject(projectName)
            }
          }}
        >
          <FolderPlus />
        </button>
        <button className="sidebar-header-btn btn-newfile">
          <FilePlus />
        </button>
      </div>
    </div>
  )
}

export default CreateFileHeader
