import { useState } from 'react'
import { logoutUser, getToken } from './services/authServices'
import Header from './components/Header'
import MainArea from './components/MainArea'
import AuthCard from './components/authcard/AuthCard'
import Footer from './components/Footer'
import SidebarLeft from './components/SidebarLeft'

// Importerar CodeEditor komponenten.
function App() {
  const [showAuth, setShowAuth] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(() => Boolean(getToken()))
  const [activeFile, setActiveFile] = useState(null)
  const [language, setLanguage] = useState('javascript')
  const [code, setCode] = useState('console.log("Hello World")')

  function handleLoginSuccess() {
    setIsLoggedIn(true)
    setShowAuth(false)
  }

  function handleLogout() {
    setIsLoggedIn(false)
    logoutUser()
    console.log('Logout successful')
  }

  return (
    <main className="app">
      <header className="app-header">
        {/* Skickar isLoggedIn, onLoginClick och onLogoutClick som props till Header-komponenten */}
        <Header
          isLoggedIn={isLoggedIn}
          onLoginClick={() => setShowAuth(true)}
          onLogoutClick={handleLogout}
        />
      </header>
      <aside className="app-sidebar">
        <SidebarLeft
          isLoggedIn={isLoggedIn}
          activeFile={activeFile}
          setActiveFile={setActiveFile}
          setCode={setCode}
          setLanguage={setLanguage}
        />
      </aside>
      <section className="app-main">
        <MainArea
          activeFile={activeFile}
          language={language}
          setLanguage={setLanguage}
          code={code}
          setCode={setCode}
        />
      </section>
      <footer className="app-footer">
        <Footer />
      </footer>

      {/* Visar AuthCard bara om showAuth är true och skickar en onClose-funktion till AuthCard */}
      {showAuth && (
        <AuthCard
          onClose={() => setShowAuth(false)}
          onLoginSuccess={handleLoginSuccess}
        />
      )}
    </main>
  )
}

export default App
