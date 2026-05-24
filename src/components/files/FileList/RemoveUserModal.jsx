function RemoveUserModal({ project, isOpen, onConfirm, onCancel }) {
  if (!isOpen || !project) {
    return null
  }

  return (
    <div className="sidebar-content">
      <div className="delete-modal">
        <div className="delete-modal-text">
          <h1>Leave Project?</h1>
          <p>Are you sure you want to leave project?</p>
          <p>If you want to regain access you</p>
          <p>have to get invited again.</p>
          <p>Leave: {project.name}</p>
        </div>
        <div className="delete-modal-btns">
          <button
            type="button"
            className="confirm"
            onClick={onConfirm}
            aria-label="Confirm leaving project"
          >
            Leave
          </button>
          <button
            type="button"
            className="cancel"
            onClick={onCancel}
            aria-label="Cancel leaving project"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

export default RemoveUserModal
