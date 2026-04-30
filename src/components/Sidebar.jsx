import CreateFileHeader from './files/CreateFile'
import FileListContent from './files/FileList'

function SidebarHeader() {
  return <CreateFileHeader />
}

function SidebarContent() {
  return <FileListContent />
}

function SidebarFooter() {
  return (
    <div className="sidebar-footer">
      <h3>Sidebar Footer</h3>
    </div>
  )
}

function SidebarLeft() {
  return (
    <div className="sidebar-left">
      <SidebarHeader />
      <SidebarContent />
      <SidebarFooter />
    </div>
  )
}

export default SidebarLeft
