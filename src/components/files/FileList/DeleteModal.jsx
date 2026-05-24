function DeleteModal({
  selectedProjects,
  selectedFiles,
  confirmDeletion,
  cancelDeletion,
}) {
  if (selectedProjects.length !== 0 || selectedFiles.length !== 0) {
    return (
      <div className="delete-modal">
        <div className="delete-modal-text">
          <h1>Confirm Deletion?</h1>
          <p>Are you sure you want to delete?</p>
          <p>Files cannot be recovered once deleted.</p>
          <p>Projects to be deleted: {selectedProjects.length}</p>
          <p>Files to be deleted: {selectedFiles.length}</p>
        </div>
        <div className="delete-modal-btns">
          <button
            type="button"
            className="confirm"
            onClick={confirmDeletion}
            aria-label="Confirm Deletion"
          >
            Delete
          </button>
          <button
            type="button"
            className="cancel"
            onClick={cancelDeletion}
            aria-label="Cancel Deletion"
          >
            Cancel
          </button>
        </div>
      </div>
    )
  }
}

export default DeleteModal
