function FileListContent() {
  return (
    <div className="sidebar-content">
      <ul>
        {demoProjects.data.map((project) => (
          <li key={project.uid}>{project.name}</li>
        ))}
      </ul>
    </div>
  )
}

function FileExplorer() {}

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

export default FileListContent
