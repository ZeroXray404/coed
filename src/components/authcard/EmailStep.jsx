function EmailStep({ goToLogin, goToRegister }) {
  return (
    <div className="auth-step">
      <h2>Sign in or create account</h2>
      <p>Enter your email to continue</p>
      {/* Visuell input, ingen state är kopplad ännu */}
      <input type="email" placeholder="name@email.com" />

      {/* Knappar för att gå till login/ register-steget */}
      <button type="button" className="btn-primary" onClick={goToLogin}>
        Continue
      </button>
      <button type="button" className="btn-secondary" onClick={goToRegister}>
        Create Account
      </button>
    </div>
  )
}

export default EmailStep
