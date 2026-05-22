function DropdownItem({ children, itemId, itemName, onItemSelect }) {
  return (
    <button
      id={itemId}
      className="dropdown-content-item"
      onClick={() => onItemSelect(itemName, itemId)}
    >
      <p>{children}</p>
    </button>
  )
}

export default DropdownItem
