// Wrapper för inloggings/registeringskortens olika steg.
import { useState } from 'react'
import EmailStep from './EmailStep'
import LoginStep from './LoginStep'
import RegisterStep from './RegisterStep'
import RegisterSuccessStep from './RegisterSuccessStep'
import './__auth-card.scss'

function AuthCard({ onClose, onLoginSuccess }) {
  // State som håller reda på vilket steg i auth-processen vi är på. Börjar på email.
  const [step, setStep] = useState('email')
  const [email, setEmail] = useState('')

  function handleRegisterContinue() {
    onLoginSuccess?.()
  }

  return (
    <div className="auth-overlay">
      <div className="auth-card">
        {/* Tar emot onClose-funktionen från App-komponenten */}
        {step !== 'register-success' && (
          <button type="button" className="close-btn" onClick={onClose}>
            X
          </button>
        )}

        {/* Om step är "email" visa EmailStep */}
        {step === 'email' && (
          <EmailStep
            email={email}
            setEmail={setEmail}
            goToLogin={() => setStep('login')}
            goToRegister={() => setStep('register')}
          />
        )}

        {/* Om step är "login" visa LoginStep */}
        {step === 'login' && (
          <LoginStep
            email={email}
            goBack={() => setStep('email')}
            onLoginSuccess={onLoginSuccess}
          />
        )}

        {/* Om step är "register" visa RegisterStep */}
        {step === 'register' && (
          <RegisterStep
            email={email}
            setEmail={setEmail}
            goBack={() => setStep('email')}
            onRegisterSuccess={() => setStep('register-success')}
          />
        )}

        {/* Om step är "register-success" visa ett enkelt meddelande */}
        {step === 'register-success' && (
          <RegisterSuccessStep onContinue={handleRegisterContinue} />
        )}
      </div>
    </div>
  )
}

export default AuthCard
