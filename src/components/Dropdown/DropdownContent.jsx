function DropdownContent({ children, openState }) {
  return (
    <div className={`dropdown-content ${openState ? 'opened' : ''}`}>
      {children}
    </div>
  )
}

export default DropdownContent
