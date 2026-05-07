import {
  Trash2,
  FolderOutput,
  FolderPlus,
  FilePlus,
  UserPlus,
} from 'lucide-react'

function CreateFileHeader({ deleteMode, setDeleteMode }) {
  return (
    <div className="sidebar-header">
      <div className="sidebar-header-left">
        <button
          onClick={() => setDeleteMode((prev) => !prev)}
          className={`sidebar-header-btn btn-delete ${deleteMode ? 'delete-mode' : ''}`}
        >
          <Trash2 />
        </button>
        <button className="sidebar-header-btn btn-newprojmemb">
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
