// Wrapper för inloggings/registeringskortens olika steg.
import { useState } from 'react'
import { X } from 'lucide-react'
import { useEscapeKey } from '../../hooks/useEscapeKey'
import EmailStep from './EmailStep'
import LoginStep from './LoginStep'
import RegisterStep from './RegisterStep'
import './__auth-card.scss'

function AuthCard({ onClose, onLoginSuccess }) {
  // Stänger modalen när man klickar på escape-knappen
  useEscapeKey(onClose)

  // State som håller reda på vilket steg i auth-processen vi är på. Börjar på email.
  const [step, setStep] = useState('email')
  const [email, setEmail] = useState('')

  function handleRegisterContinue() {
    onLoginSuccess?.()
  }

  return (
    // Overlay som täcker hela skärmen och ger en skugga när modalen är öppen, klick på den stänger modalen
    <div className="auth-overlay" onClick={onClose}>
      {/* Själva modal-fönstret */}
      {/* stopPropagation förhindrar att klick inuti modalen stänger den */}
      <div className="auth-card" onClick={(e) => e.stopPropagation()}>
        {/* Tar emot onClose-funktionen från App-komponenten */}
        <button
          type="button"
          className="close-btn"
          onClick={onClose}
          aria-label="Close Window"
        >
          <X size={20} />
        </button>

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
          <div className="auth-step">
            <h2>Account created</h2>
            <p>Your account has been created successfully!</p>
            <button
              type="button"
              className="btn-primary"
              onClick={handleRegisterContinue}
            >
              Continue
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default AuthCard
