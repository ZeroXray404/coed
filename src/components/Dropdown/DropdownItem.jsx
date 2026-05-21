function DropdownItem({ children, itemId, itemName, onItemSelect }) {
  return (
    <div
      id={itemId}
      className="dropdown-content-item"
      onClick={() => onItemSelect(itemName, itemId)}
    >
      <p>{children}</p>
    </div>
  )
}

export default DropdownItem
