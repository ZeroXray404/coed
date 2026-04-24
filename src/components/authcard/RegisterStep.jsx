import { useState } from 'react'
import { loginUser, registerUser } from '../../services/authServices'

function RegisterStep({ email, setEmail, goBack, onRegisterSuccess }) {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  async function handleRegister() {
    if (password !== confirmPassword) {
      console.error('Passwords do not match')
      return
    }

    try {
      const registerResult = await registerUser(email, password)
      const loginResult = await loginUser(email, password)
      console.log(
        'Registration successful:',
        registerResult,
        'Login successful:',
        loginResult
      )
      onRegisterSuccess?.()
    } catch (error) {
      console.error('Registration or login failed:', error)
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
