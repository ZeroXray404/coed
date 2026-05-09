import { useEffect, useState } from 'react'
import { AppWindow, X } from 'lucide-react'

function AddProjectMemberContent({
  addMember,
  deleteMode,
  setAddMember,
  selectedProjects,
  setSelectedProjects,
  projects,
  isLoading,
  error,
  users,
  selectedUser,
}) {
  const [showAddUserModal, setShowAddUserModal] = useState(false)

  //const [users, setUsers] = useState([])
  //const [selectedUser, setSelectedUser] = useState('')

  {
    console.log('test: ' + addMember)
    /*}
  useEffect(() => {
    if (showAddUserModal) {
      async function addProjectMember() {
        const projectMembers = await addUserToProject(uid, email)
      }
      addProjectMember()
    }
  }, [showAddUserModal])  */
  }

  function toggleProject(id) {
    setSelectedProjects((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    )

    if (!showAddUserModal && !selectedProjects.includes(id)) {
      setShowAddUserModal(true)
    }
  }

  function cancelAddUser() {
    setShowAddUserModal(false)
    setSelectedProjects([])
    setSelectedUser('')
  }

  /*
  async function confirmAddUser() {
    if (!selectedUser) {
       alert("Välj en användare först")
    return
    } else {
      try {
        const projectMembers = await addUserToProject(uid, email)
      } catch {
        
      }
    }
  }
    */
  //async function confirmAddUser() {
  // if (!selectedUser) {
  //   alert("Välj en användare först")
  // return
  // }
  //try {
  //  const projectMembers = await addUserToProject(uid, email)
  //}
  //}

  return (
    <div className="sidebar-content">
      {isLoading && <p>Loading projects...</p>}
      {error && <p>{error}</p>}
      {showAddUserModal && selectedProjects.length !== 0 && (
        <div className="delete-modal">
          <div className="delete-modal-text">
            <h1>Add a user to a project</h1>
            <p>""""</p>
            <p>""</p>
            <p>
              User will be added to following projects:{' '}
              {selectedProjects.length}
            </p>
          </div>

          <select
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
          >
            <option value="">-- Select User --</option>
            <option value="testuser@example.com">
              -- testuser@example.com --
            </option>
          </select>
          {/*
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          
          */}
          <div className="delete-modal-btns">
            {/* <button onClick={confirmAddUser}>Add user</button> */}
            <button onClick={cancelAddUser}>Cancel</button>
          </div>
        </div>
      )}

      <ul>
        {projects
          .filter((project) => project.name && project.name.trim() !== '')
          .map((project) => {
            const isSelected = selectedProjects.includes(project.uid)
            return (
              <li
                key={project.uid}
                className={isSelected ? 'selected-add' : ''}
              >
                <AppWindow size={16} />
                {project.name}
                <input
                  type="checkbox"
                  name="fileSelect"
                  className={addMember ? 'active add-member' : ''}
                  checked={isSelected}
                  onChange={() => toggleProject(project.uid)}
                />
              </li>
            )
          })}
      </ul>
    </div>
  )
}

export default AddProjectMemberContent
