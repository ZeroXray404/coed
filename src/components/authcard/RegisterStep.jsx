import { useState } from 'react'
import { registerUser } from '../../services/authServices'

function RegisterStep({ goBack }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  async function handleRegister() {
    try {
      const result = await registerUser(email, password)
      console.log('Registration successful:', result)
      // Plats för logik för att hantera lyckad registrering / visa ett meddelande eller gå vidare till login
    } catch (error) {
      console.error('Registration failed:', error)
      // Plats för logik för att hantera fel / visa ett felmeddelande för användaren
    }
  }

  return (
    <div className="auth-step">
      <h2>Create account</h2>
      <p>Choose a password to register.</p>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="name@email.com"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <input
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder="Confirm password"
      />
      <button type="button" className="btn-primary" onClick={handleRegister}>
        Register
      </button>
      <button type="button" className="btn-secondary" onClick={goBack}>
        Back
      </button>
    </div>
  )
}

export default RegisterStep
