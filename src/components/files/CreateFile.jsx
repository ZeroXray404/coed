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
          onClick={() => setDeleteMode((prev) => !prev)}
          className={`sidebar-header-btn btn-delete ${deleteMode ? 'delete-mode' : ''}`}
        >
          <Trash2 />
        </button>
        <button
          onClick={() => setAddMember((prev) => !prev)}
          //onClick={() => {
          //  addUserToProject(uid, email)
          //}}
          className={`sidebar-header-btn btn-newprojmemb ${addMember ? 'add-member' : ''}`}
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
