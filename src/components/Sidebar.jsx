import CreateFileHeader from './files/CreateFile'
import FileListContent from './files/FileList'
import { useState } from 'react'

function SidebarHeader({ deleteMode, setDeleteMode }) {
  return (
    <CreateFileHeader deleteMode={deleteMode} setDeleteMode={setDeleteMode} />
  )
}

function SidebarContent({ deleteMode }) {
  return <FileListContent deleteMode={deleteMode} />
}

function SidebarFooter() {
  return (
    <div className="sidebar-footer">
      <h3>Sidebar Footer</h3>
    </div>
  )
}

function SidebarLeft() {
  const [deleteMode, setDeleteMode] = useState(false)

  return (
    <div className="sidebar-left">
      <SidebarHeader deleteMode={deleteMode} setDeleteMode={setDeleteMode} />
      <SidebarContent deleteMode={deleteMode} />
      <SidebarFooter />
    </div>
  )
}

export default SidebarLeft
