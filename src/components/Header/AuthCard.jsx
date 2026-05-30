// Wrapper för inloggings/registeringskortens olika steg.
import { useEffect, useRef, useState } from 'react'
import { X } from 'lucide-react'
import { useEscapeKey } from '../../hooks/useEscapeKey'
import EmailStep from './AuthCard/EmailStep'
import LoginStep from './AuthCard/LoginStep'
import RegisterStep from './AuthCard/RegisterStep'
import RegisterSuccessStep from './AuthCard/RegisterSuccessStep'

function AuthCard({ onClose, onLoginSuccess }) {
  // Stänger modalen när man klickar på escape-knappen
  useEscapeKey(onClose)

  // State som håller reda på vilket steg i auth-processen vi är på. Börjar på email.
  const [step, setStep] = useState('email')
  const [email, setEmail] = useState('')
  const [registeredUser, setRegisteredUser] = useState(null)

  const inputRef = useRef(null)

  function handleRegisterContinue() {
    onLoginSuccess?.(registeredUser)
  }

  useEffect(() => {
    if (step) {
      inputRef.current?.focus()
    }
  }, [step])

  return (
    // Overlay som täcker hela skärmen och ger en skugga när modalen är öppen, klick på den stänger modalen
    <div className="auth-overlay" onClick={onClose}>
      {/* Själva modal-fönstret */}
      {/* stopPropagation förhindrar att klick inuti modalen stänger den */}
      <div className="auth-card" onClick={(e) => e.stopPropagation()}>
        {/* Tar emot onClose-funktionen från App-komponenten */}
        {step !== 'register-success' && (
          <button
            type="button"
            className="close-btn"
            onClick={onClose}
            aria-label="Close Window"
          >
            <X size={20} />
          </button>
        )}

        {/* Om step är "email" visa EmailStep */}
        {step === 'email' && (
          <EmailStep
            email={email}
            setEmail={setEmail}
            goToLogin={() => setStep('login')}
            goToRegister={() => setStep('register')}
            ref={inputRef}
          />
        )}

        {/* Om step är "login" visa LoginStep */}
        {step === 'login' && (
          <LoginStep
            email={email}
            goBack={() => setStep('email')}
            onLoginSuccess={onLoginSuccess}
            ref={inputRef}
          />
        )}

        {/* Om step är "register" visa RegisterStep */}
        {step === 'register' && (
          <RegisterStep
            email={email}
            setEmail={setEmail}
            goBack={() => setStep('email')}
            onRegisterSuccess={(user) => {
              setRegisteredUser(user)
              setStep('register-success')
            }}
            ref={inputRef}
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
