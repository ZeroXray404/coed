import { Trash2, FolderOutput, FolderPlus, FilePlus } from 'lucide-react'

function CreateFileHeader() {
  return (
    <div className="sidebar-header">
      <div className="sidebar-header-left">
        <button className="sidebar-header-btn btn-delete">
          <Trash2 />
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
