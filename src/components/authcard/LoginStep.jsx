import { useState } from 'react'
import { loginUser } from '../../services/authServices'

function LoginStep({ email, goBack, onLoginSuccess }) {
  const [password, setPassword] = useState('')

  const recognizeSubmitButton = (e) => {
    e.preventDefault()
    const submitButton = e.nativeEvent.submitter
    console.log(submitButton.value)
    if (submitButton.value == 'login') {
      handleLogin()
    } else {
      goBack()
    }
  }

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
