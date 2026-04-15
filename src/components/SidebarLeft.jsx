function SidebarHeader() {
  return (
    <div className="sidebar-header">
      <h3>Sidebar Header</h3>
    </div>
  )
}

function SidebarContent() {
  return (
    <div className="sidebar-content">
      <h3>Sidebar Content</h3>
      <ul>
        {demoProjects.data.map((project) => (
          <li key={project.uid}>{project.name}</li>
        ))}
      </ul>
    </div>
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
  return (
    <div className="sidebar-left">
      <SidebarHeader />
      <SidebarContent />
      <SidebarFooter />
    </div>
  )
}

const demoProjects = {
  // Mockad data för projekten i sidofältet.
  data: [
    {
      uid: 'project-1',
      name: 'Starter project',
    },
    {
      uid: 'project-2',
      name: 'Greatest project ever',
    },
    {
      uid: 'project-3',
      name: 'Another project',
    },
    {
      uid: 'project-4',
      name: 'Yet another project',
    },
    {
      uid: 'project-5',
      name: 'Yet another project',
    },
  ],
}

export default SidebarLeft
