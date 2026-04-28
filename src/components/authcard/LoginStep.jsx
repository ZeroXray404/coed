import { useState } from 'react'
import { loginUser } from '../../services/authServices'

function LoginStep({ email, goBack, onLoginSuccess }) {
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  const recognizeSubmitButton = (e) => {
    setMessage('')
    e.preventDefault()
    handleLogin()
  }

  async function handleLogin() {
    try {
      const result = await loginUser(email, password)
      console.log('Login successful:', result)
      onLoginSuccess?.()
    } catch (error) {
      setMessage('Login failed')
    }
  }

  return (
    <form className="auth-step" onSubmit={recognizeSubmitButton}>
      <h2>Welcome back</h2>
      <p>Enter your password to log in.</p>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <div className="error-message">{message}</div>
      <button type="submit" value="login" className="btn-primary" required>
        Log in
      </button>
      <button type="button" className="btn-secondary" onClick={goBack}>
        Back
      </button>
    </form>
  )
}

export default LoginStep
