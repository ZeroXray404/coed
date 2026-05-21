import { ChevronDown, ChevronUp } from 'lucide-react'

const DropdownBtn = ({ openState, toggleFunc, children }) => {
  return (
    <button
      className={`dropdown-btn ${openState ? 'opened' : ''}`}
      onClick={toggleFunc}
    >
      <div className="dropdown-btn-text">
        <p>{children}</p>
      </div>
      <span className="dropdown-btn-icon">
        {!openState ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
      </span>
      <div className="dropdown-btn-backdrop"></div>
    </button>
  )
}

export default DropdownBtn
