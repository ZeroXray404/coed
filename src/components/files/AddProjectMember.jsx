import { useEffect, useState } from 'react'
import { AppWindow, X } from 'lucide-react'
import { getAllUsers } from '../../services/userServices'
import { addUserToProject } from '../../services/fileServices'

function AddProjectMemberContent({
  addMember,
  //deleteMode,
  //setAddMember,
  selectedProjects,
  setSelectedProjects,
  projects,
  isLoading,
  setIsLoading,
  error,
  setError,
}) {
  const [showAddUserModal, setShowAddUserModal] = useState(false)
  const [users, setUsers] = useState([])
  const [selectedUser, setSelectedUser] = useState('')
  const [searchUser, setSearchUser] = useState('')
  {
    useEffect(() => {
      async function fetchUsers() {
        if (!addMember) {
          setUsers([])
          setError('')
          return
        }

        try {
          setIsLoading(true)
          setError('')
          const result = await getAllUsers()
          console.log(result)
          setUsers(result?.data || [])
        } catch (loadError) {
          setError(loadError.message || 'Failed to fetch users')
        } finally {
          setIsLoading(false)
        }
      }

      fetchUsers()
    }, [addMember])
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
