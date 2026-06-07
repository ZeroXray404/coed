import { useEffect, useRef, useState } from 'react'
import { AppWindow } from 'lucide-react'
import { addUserToProject } from '../../services/fileServices'
import Dropdown from '../Dropdown'

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

  const inputRef = useRef(null)

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
      console.log('The uid of project user will be added to:', uid)
      console.log('The selected user:', selectedUser)
      await addUserToProject(uid, selectedUser)
    }
    cancelAddUser()
  }

  // Sorterar projekten i bokstavsordning
  const sortedProjects = [...projects].sort((a, b) =>
    a.name.localeCompare(b.name)
  )

  function getChosenUserId(choiceId) {
    setSelectedUser(choiceId)
  }

  useEffect(() => {
    if (showAddUserModal && selectedProjects.length !== 0) {
      inputRef.current?.focus()
    }
  }, [showAddUserModal, selectedProjects])

  return (
    <div className="sidebar-content">
      {isLoading && <p>Loading projects...</p>}
      {error && <p>{error}</p>}
      {showAddUserModal && selectedProjects.length !== 0 && (
        <div className="add-user-modal">
          <div className="add-user-modal-text">
            <h1>Add a user to project</h1>
            <p>
              User will be added to {selectedProjects.length} project
              {selectedProjects.length > 1 ? 's' : ''}
            </p>
          </div>

          <input
            name="user-search"
            className="input-search"
            type="text"
            placeholder="Search for a user"
            value={searchUser}
            onChange={(e) => setSearchUser(e.target.value)}
            ref={inputRef}
          />

          <Dropdown
            buttonText="Choose user"
            dataObj={filterData}
            dataName="email"
            dataId="email"
            hasDefaultOption={false}
            getIdHandler={getChosenUserId}
          />

          <div className="add-user-modal-btns">
            <button className="confirm" onClick={confirmAddUser}>
              Add user
            </button>
            <button className="cancel" onClick={cancelAddUser}>
              Cancel
            </button>
          </div>
        </div>
      )}

      <ul>
        {sortedProjects
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
                  title={`Add member to ${project.name}`}
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
