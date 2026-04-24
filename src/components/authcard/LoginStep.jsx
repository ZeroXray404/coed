import { useState } from 'react'
import { loginUser } from '../../services/authServices'

function LoginStep({ email, goBack, onLoginSuccess }) {
  const [password, setPassword] = useState('')

  async function handleLogin() {
    try {
      const result = await loginUser(email, password)
      console.log('Login successful:', result)
      onLoginSuccess?.()
    } catch (error) {
      console.error('Login failed:', error)
      // Plats för logik för att hantera fel / visa ett felmeddelande för användaren.
    }
  }

  return (
    <div className="auth-step">
      <h2>Welcome back</h2>
      <p>Enter your password to log in.</p>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button type="button" className="btn-primary" onClick={handleLogin}>
        Log in
      </button>
      <button type="button" className="btn-secondary" onClick={goBack}>
        Back
      </button>
    </div>
  )
}

export default LoginStep
