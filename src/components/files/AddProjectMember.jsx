import { useState } from 'react'
import { AppWindow, X, Users } from 'lucide-react'
import { addUserToProject } from '../../services/fileServices'

function AddProjectMemberContent({
  users,
  addMember,
  setAddMember,
  selectedProjects,
  setSelectedProjects,
  projects,
  isLoading,
  error,
}) {
  const [showAddUserModal, setShowAddUserModal] = useState(false)
  const [selectedUser, setSelectedUser] = useState('')
  const [searchUser, setSearchUser] = useState('')

  function toggleProject(uid) {
    setSelectedProjects((prev) =>
      prev.includes(uid) ? prev.filter((x) => x !== uid) : [...prev, uid]
    )

    if (!showAddUserModal && !selectedProjects.includes(uid)) {
      setShowAddUserModal(true)
    }
  }

  function cancelAddUser() {
    setShowAddUserModal(false)
    setSelectedProjects([])
    setSelectedUser('')
    setAddMember(false)
  }

  const filterData = users.filter((user) =>
    user.email.toLowerCase().includes(searchUser.toLowerCase())
  )

  async function confirmAddUser() {
    for (const uid of selectedProjects) {
      console.log(uid)
      console.log(selectedUser)
      //const projectMembers =
      await addUserToProject(uid, selectedUser)
    }
    cancelAddUser()
  }

  return (
    <div className="sidebar-content">
      {isLoading && <p>Loading projects...</p>}
      {error && <p>{error}</p>}
      {showAddUserModal && selectedProjects.length !== 0 && (
        <div className="add-user-modal">
          <div className="add-user-modal-text">
            <h1>Add a user to a project</h1>
            <p>
              User will be added to following projects:{' '}
              {selectedProjects.length}
            </p>
          </div>
          <p>Search for a user: </p>
          <input
            className="input-search"
            type="text"
            placeholder="Search user"
            value={searchUser}
            onChange={(e) => setSearchUser(e.target.value)}
          ></input>
          <select
            className="user-options"
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
          >
            <option value=""> -- choose user -- </option>
            {filterData.map((user) => (
              <option key={user.user_id} value={user.email}>
                {user.email}
              </option>
            ))}

            {/**/}
          </select>
          <div className="add-user-modal-btns">
            <button className="confirm" onClick={confirmAddUser}>
              Add user
            </button>
            <button onClick={cancelAddUser}>Cancel</button>
          </div>
        </div>
      )}

      <ul>
        {projects
          .filter((project) => project.name && project.name.trim() !== '')
          .map((project) => {
            // Kollar om projektet är valt för att lägga till en användare, och lägger till klassen 'selected' om det är det.
            const isSelected = selectedProjects.includes(project.uid)
            return (
              <li
                key={project.uid}
                className={`project-list-item ${isSelected ? 'selected-add' : ''}`}
              >
                <button
                  className="list-row"
                  onClick={() => toggleProject(project.uid)}
                  aria-label={`Add user to ${project.name}`}
                >
                  <div className="listselect-btn">
                    <AppWindow size={16} />
                    <span className="list-label">{project.name}</span>
                  </div>
                </button>
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
