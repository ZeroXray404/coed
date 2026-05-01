import { useEffect, useState } from 'react'
import { loginUser } from '../../services/authServices'

function LoginStep({ email, goBack, onLoginSuccess }) {
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState([])

  useEffect(() => {
    const errorMessage = console.error

    console.error = (...loadingMessage) => {
      setErrors([])
      setErrors((p) => [...p, loadingMessage.join(' ')])
      errorMessage.apply(console, loadingMessage)
    }
    return () => {
      console.error = errorMessage
    }
  }, [])

  const recognizeSubmitButton = (e) => {
    e.preventDefault()
    handleLogin()
  }

  async function handleLogin() {
    try {
      const result = await loginUser(email, password)
      console.log('Login successful:', result)
      onLoginSuccess?.()
    } catch (error) {
      console.error('', error)
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
      <div className="error-message">
        {errors.map((error, i) => (
          <div key={i}>{error.slice(7)}</div>
        ))}
      </div>
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
