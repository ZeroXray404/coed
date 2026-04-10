import { Undo, Redo, Search, User } from 'lucide-react'

function Header() {
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
        <input
          type="text"
          placeholder="Search..."
          className="w-full pl-10 pr-4 py-2 border rounded-lg"
        />
      </div>

      <div className="user-btns">
        <div className="login">
          <input
            onClick={() => alert('LOGIN')}
            className="login-btn"
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
