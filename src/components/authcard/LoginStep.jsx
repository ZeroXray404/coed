function LoginStep({ goBack }) {
  return (
    <div className="auth-step">
      <h2>Welcome back</h2>
      <p>Enter your password to log in.</p>
      {/* Lösenordsfält, ännu utan state */}
      <input type="password" placeholder="Password" />

      {/* Själva login-logiken kopplas in senare */}
      <button type="button" className="btn-primary">
        Log in
      </button>
      {/* Går tillbaka till första steget */}
      <button type="button" className="btn-secondary" onClick={goBack}>
        Back
      </button>
    </div>
  )
}

export default LoginStep
