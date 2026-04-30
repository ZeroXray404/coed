import { Trash2, HardDriveDownload, FolderPlus, FilePlus } from 'lucide-react'

function CreateFileHeader() {
  return (
    <div className="sidebar-header">
      <div className="sidebar-header-left">
        <button className="sidebar-header-btn btn-delete">
          <Trash2 />
        </button>
      </div>
      <div className="sidebar-header-right">
        <button className="sidebar-header-btn btn-loadproj">
          <HardDriveDownload />
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
