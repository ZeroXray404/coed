import { Undo, Redo, Search, User } from 'lucide-react'

function Header({ onLoginClick }) {
  return (
    <section className="header">
      <div className="quick-actions">
        <button onClick={() => alert('UNDO')}>
          <Undo size={24} />
        </button>
        <button onClick={() => alert('REDO')}>
          <Redo size={24} />
        </button>
      </div>

      <div className="search-bar">
        <Search size={24} />
        <input type="text" placeholder="Search..." />
      </div>

      <div className="user-btns">
        <div className="login">
          {/* När man klickar på login-knappen körs funktionen från App */}
          <input
            onClick={onLoginClick}
            className="login-btn btn-primary"
            type="button"
            value="Login"
          />
        </div>
        <button onClick={() => alert('USER-PROFILE')} className="user">
          <User size={24} />
        </button>
      </div>
    </section>
  )
}

export default Header
