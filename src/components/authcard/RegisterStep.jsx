import { useState } from 'react'
import { loginUser, registerUser } from '../../services/authServices'

function RegisterStep({ email, setEmail, goBack, onRegisterSuccess }) {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const recognizeSubmitButton = (e) => {
    e.preventDefault()
    const submitButton = e.nativeEvent.submitter
    console.log(submitButton.value)
    if (submitButton.value == 'register') {
      if (password == confirmPassword) {
        handleRegister()
      } else {
        console.log("Passwords don't match")
      }
    }
  }

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
      <p>
        Password must contain at least
        <li>one uppercase letter</li>
        <li>one lowercase letter and</li>
        <li>one digit.</li>
      </p>
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
