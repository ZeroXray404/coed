import { useState } from 'react'
import { loginUser, registerUser } from '../../services/authServices'

function RegisterStep({ email, setEmail, goBack, onRegisterSuccess }) {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState('')

  const recognizeSubmitButton = (e) => {
    setMessage('')
    e.preventDefault()

    handleRegister()
  }

  async function handleRegister() {
    if (password !== confirmPassword) {
      setMessage("Passwords don't match")

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
      onRegisterSuccess?.({ email })
    } catch (error) {
      setMessage('User account already exist')
      console.error('User account already exist:', error)
    }
  }

  return (
    <form className="auth-step" onSubmit={recognizeSubmitButton}>
      <h2>Create account</h2>
      <p>Choose a password to register.</p>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="name@email.com"
        pattern="^[^@\s]+@[a-z0-9-]+\.[a-z]$"
        required
      />
      <div className="info-sign">
        <div>
          Password must contain at least 1 uppercase letter, 1 lowercase letter
          and 1 digit.
        </div>
      </div>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
        pattern="^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).+$"
      />
      <input
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder="Confirm password"
        required
      />
      <div className="error-message">{message}</div>
      <button type="submit" value="register" className="btn-primary">
        Register
      </button>
      <button type="button" className="btn-secondary" onClick={goBack}>
        Back
      </button>
    </form>
  )
}

export default RegisterStep
