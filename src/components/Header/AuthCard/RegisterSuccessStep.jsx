function RegisterSuccessStep({ onContinue }) {
  return (
    <div className="auth-step">
      <h2>Account created</h2>
      <p>Your account has been created successfully!</p>
      <button type="button" className="btn-primary" onClick={onContinue}>
        Continue
      </button>
    </div>
  )
}
export default RegisterSuccessStep
