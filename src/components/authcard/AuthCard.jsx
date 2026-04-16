// Wrapper för inloggings/registeringskortens olika steg.
import { useState } from 'react'
import EmailStep from './EmailStep'
import LoginStep from './LoginStep'
import RegisterStep from './RegisterStep'
import './__auth-card.scss'

function AuthCard({ onClose }) {
  // State som håller reda på vilket steg i auth-processen vi är på. Börjar på email.
  const [step, setStep] = useState('email')

  return (
    <div className="auth-overlay">
      <div className="auth-card">
        {/* Tar emot onClose-funktionen från App-komponenten */}
        <button type="button" className="close-btn" onClick={onClose}>
          X
        </button>
        {/* Om step är "email" visa EmailStep */}
        {step === 'email' && (
          <EmailStep
            // Byter step till "login" och renderar LoginStep när Continue-knappen klickas
            goToLogin={() => setStep('login')}
            // Byter steg till "register" och renderar RegisterStep när Create Account-knappen klickas
            goToRegister={() => setStep('register')}
          />
        )}
        {/* Om step är "login" visa LoginStep */}
        {step === 'login' && <LoginStep goBack={() => setStep('email')} />}
        {/* Om step är "register" visa RegisterStep */}
        {step === 'register' && (
          <RegisterStep goBack={() => setStep('email')} />
        )}
      </div>
    </div>
  )
}

export default AuthCard
