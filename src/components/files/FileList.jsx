import { AppWindow } from 'lucide-react'

function FileListContent({
  deleteMode,
  selectedFiles,
  setSelectedFiles,
  projects,
  isLoading,
  error,
}) {
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
      {isLoading && <p>Loading projects...</p>}
      {error && <p>{error}</p>}
      <ul>
        {projects
          .filter((project) => project.name && project.name.trim() !== '')
          .map((project) => {
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

export default FileListContent
