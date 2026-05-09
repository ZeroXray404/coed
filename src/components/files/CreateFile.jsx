import {
  Trash2,
  FolderOutput,
  FolderPlus,
  FilePlus,
  UserPlus,
} from 'lucide-react'

function CreateFileHeader({
  deleteMode,
  setDeleteMode,
  addMember,
  setAddMember,
}) {
  return (
    <div className="sidebar-header">
      <div className="sidebar-header-left">
        <button
          className={`sidebar-header-btn btn-delete ${deleteMode ? 'delete-mode' : ''}`}
          onClick={() => {
            console.log(deleteMode)
            if (addMember === false) {
              setDeleteMode((prev) => !prev)
            } else {
              setProjects(false)
            }
          }}
        >
          <Trash2 />
        </button>

        <button
          className={`sidebar-header-btn btn-newprojmemb ${addMember ? 'add-member' : ''}`}
          onClick={() => {
            console.log(addMember)
            if (deleteMode === false) {
              setAddMember((prev) => !prev)
            }
          }}
        >
          <UserPlus />
        </button>
      </div>
      <div className="sidebar-header-right">
        <button className="sidebar-header-btn btn-projback">
          <FolderOutput />
        </button>
        <button className="sidebar-header-btn btn-newproj">
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
