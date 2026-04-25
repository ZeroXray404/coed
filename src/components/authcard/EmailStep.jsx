import { Form } from 'lucide-react'
import { useState } from 'react'

function EmailStep({ email, setEmail, goToLogin, goToRegister }) {
  const [name, setName] = useState('')
  const handleSubmit = (e) => {
    e.preventDefault()
    //  console.log(`Submit form ${name}`)
    const submitter = e.nativeEvent.submitter
    if (submitter.value == 'login') {
      goToLogin()
    } else {
      goToRegister()
    }
  }

  return (
    <form className="auth-step" onSubmit={handleSubmit}>
      <h2>Sign in or create account</h2>
      <p>Enter your email to continue</p>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="name@email.com"
        required
      />
      <button type="submit" value="login" className="btn-primary">
        {' '}
        {/* onClick={goToLogin}>*/}
        Continue
      </button>
      <button type="submit" value="register" className="btn-secondary">
        {' '}
        {/* onClick={goToRegister}>*/}
        Create Account
      </button>
    </form>
  )
}

export default EmailStep
