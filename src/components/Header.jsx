import { Search, User } from 'lucide-react'
import { useState } from 'react'
import AuthModal from './Header/AuthModal'
import logo from '../assets/coed-logo-header.svg'

function Header({ isLoggedIn, onLogoutClick, onLoginSuccess }) {
  const [showAuth, setShowAuth] = useState(false)

  // Körs när användaren loggat in eller registrerat sig.
  // Skickar användaren vidare till App-komponenten
  // och stänger sedan auth-modalen.
  function handleLoginSuccess(user) {
    onLoginSuccess(user)
    setShowAuth(false)
  }
  return (
    <section className="header">
      <a href="/" className="logo" aria-label="Go to homepage">
        <img src={logo} alt="Coed Logo" />
      </a>
      <div className="search-bar">
        <Search size={24} />
        <input type="text" placeholder="Search..." />
      </div>

      <div className="user-btns">
        <div className="login">
          <input
            onClick={isLoggedIn ? onLogoutClick : () => setShowAuth(true)}
            className="login-btn btn-primary"
            type="button"
            value={isLoggedIn ? 'Logout' : 'Login'}
            title={isLoggedIn ? 'Logout' : 'Login or register'}
            aria-label={isLoggedIn ? 'Logout' : 'Login'}
          />
        </div>

        <button
          onClick={() => alert('USER-PROFILE')}
          className="user"
          title="User Profile"
          aria-label="User Profile"
        >
          <User size={24} />
        </button>
      </div>
      {/* Visar AuthModal endast när showAuth är true */}
      {showAuth && (
        <AuthModal
          onClose={() => setShowAuth(false)}
          onLoginSuccess={handleLoginSuccess}
        />
      )}
    </section>
  )
}

export default Header
