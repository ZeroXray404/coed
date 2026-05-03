import CreateFileHeader from './files/CreateFile'
import FileListContent from './files/FileList'
import { useState } from 'react'

function SidebarHeader({ deleteMode, setDeleteMode }) {
  return (
    <CreateFileHeader deleteMode={deleteMode} setDeleteMode={setDeleteMode} />
  )
}

function SidebarContent({ deleteMode, selectedFiles, setSelectedFiles }) {
  return (
    <FileListContent
      deleteMode={deleteMode}
      selectedFiles={selectedFiles}
      setSelectedFiles={setSelectedFiles}
    />
  )
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
  const [selectedFiles, setSelectedFiles] = useState([])

  if (!deleteMode && selectedFiles.length > 0) {
    setSelectedFiles([])
  }

  return (
    <div className="sidebar-left">
      <SidebarHeader deleteMode={deleteMode} setDeleteMode={setDeleteMode} />
      <SidebarContent
        deleteMode={deleteMode}
        selectedFiles={selectedFiles}
        setSelectedFiles={setSelectedFiles}
      />
      <SidebarFooter />
    </div>
  )
}

export default SidebarLeft
