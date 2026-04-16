function RegisterStep({ goBack }) {
  return (
    <div className="auth-step">
      <h2>Create account</h2>
      <p>Choose a password to register.</p>

      {/* Fält för email/lösenord och bekräftelse, ännu utan state */}
      <input type="email" placeholder="name@email.com" />
      <input type="password" placeholder="Password" />
      <input type="password" placeholder="Confirm password" />
      {/* Själva register-logiken kopplas in senare */}
      <button type="button" className="btn-primary">
        Register
      </button>
      {/* Går tillbaka till första steget */}
      <button type="button" className="btn-secondary" onClick={goBack}>
        Back
      </button>
    </div>
  )
}

export default RegisterStep
