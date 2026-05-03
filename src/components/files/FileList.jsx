import { AppWindow } from 'lucide-react'

function FileListContent({ deleteMode, selectedFiles, setSelectedFiles }) {
  /*
   * prev = current selected IDs
   * includes(id) = check if selected (if ID exists)
   * filter(...) = removes if ID already exists
   * [...prev, id] = adds ID if none exist
   */
  function toggle(id) {
    setSelectedFiles((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    )
  }

  return (
    <div className="sidebar-content">
      <ul>
        {demoProjects.data.map((project) => {
          const isSelected = selectedFiles.includes(project.uid)

          return (
            <li key={project.uid} className={isSelected ? 'selected' : ''}>
              <AppWindow size={16} />
              {project.name}
              <input
                type="checkbox"
                name="fileSelect"
                className={deleteMode ? 'active delete-mode' : ''}
                checked={isSelected}
                onChange={() => toggle(project.uid)}
              />
            </li>
          )
        })}
      </ul>
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

export default FileListContent
