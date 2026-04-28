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
      onRegisterSuccess?.()
    } catch (error) {
      setMessage('Registration or login failed')
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
        required
      />
      <div className="info-sign">
        Password must contain at least:
        <div>
          <ul>1 uppercase letter,</ul>
          <ul>1 lowercase letter and</ul>
          <ul>1 digit.</ul>
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
