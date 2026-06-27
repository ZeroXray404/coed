import { forwardRef } from 'react'

function EmailStep({ email, setEmail, goToLogin, goToRegister }, ref) {
  const recognizeSubmitButton = (e) => {
    e.preventDefault()
    const submitButton = e.nativeEvent.submitter
    if (submitButton.value == 'login') {
      goToLogin()
    } else {
      goToRegister()
    }
  }

  return (
    <form className="auth-step" onSubmit={recognizeSubmitButton}>
      <h2>Sign in or create account</h2>
      <p>Enter your email to continue</p>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="name@email.com"
        pattern="^[^@\s]+@[a-z0-9-]+\.[a-z]$"
        required
        ref={ref}
      />
      <button type="submit" value="login" className="btn-primary">
        Continue
      </button>
      <button type="submit" value="register" className="btn-secondary">
        Create Account
      </button>
    </form>
  )
}

export default forwardRef(EmailStep)
