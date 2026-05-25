import { Search, User } from 'lucide-react'
import { useState } from 'react'
import AuthCard from './Header/AuthCard'

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
          />
        </div>

        <button onClick={() => alert('USER-PROFILE')} className="user">
          <User size={24} />
        </button>
      </div>
      {/* Visar AuthCard endast när showAuth är true */}
      {showAuth && (
        <AuthCard
          onClose={() => setShowAuth(false)}
          onLoginSuccess={handleLoginSuccess}
        />
      )}
    </section>
  )
}

export default Header
