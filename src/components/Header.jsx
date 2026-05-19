import { Search, User } from 'lucide-react'

function Header({ isLoggedIn, onLoginClick, onLogoutClick }) {
  return (
    <section className="header">
      <div className="search-bar">
        <Search size={24} />
        <input type="text" placeholder="Search..." />
      </div>

      <div className="user-btns">
        <div className="login">
          {/* När man klickar på login-knappen körs funktionen från App */}
          <input
            onClick={isLoggedIn ? onLogoutClick : onLoginClick}
            className="login-btn btn-primary"
            type="button"
            value={isLoggedIn ? 'Logout' : 'Login'}
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
