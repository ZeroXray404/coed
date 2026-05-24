import { useState } from 'react'
import {
  logoutUser,
  getToken,
  saveCurrentUser,
  getCurrentUser,
} from './services/authServices'
import Header from './components/Header'
import MainArea from './components/MainArea'
import AuthCard from './components/authcard/AuthCard'
import Footer from './components/Footer'
import SidebarLeft from './components/SidebarLeft'

// Importerar CodeEditor komponenten.
function App() {
  const [showAuth, setShowAuth] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(() => Boolean(getToken()))
  const [currentUser, setCurrentUser] = useState(() => getCurrentUser())

  const [activeFile, setActiveFile] = useState(null)
  const [language, setLanguage] = useState('javascript')
  const [codeByFileUid, setCodeByFileUid] = useState({})
  const [realtimeStatus, setRealtimeStatus] = useState('disconnected')
  const [saveStatus, setSaveStatus] = useState('idle')
  const [activeUsers, setActiveUsers] = useState([])

  function handleLoginSuccess(user) {
    setIsLoggedIn(true)
    setCurrentUser(user)
    saveCurrentUser(user)
    setShowAuth(false)
    console.log(user)
  }

  function resetEditorState() {
    setActiveFile(null)
    setLanguage('javascript')
  }

  function handleLogout() {
    setIsLoggedIn(false)
    resetEditorState()
    setCodeByFileUid({})
    setActiveUsers([])
    setCurrentUser(null)
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
          currentUser={currentUser}
          activeFile={activeFile}
          setActiveFile={setActiveFile}
          setCodeByFileUid={setCodeByFileUid}
          setLanguage={setLanguage}
        />
      </aside>
      <section className="app-main">
        <MainArea
          activeFile={activeFile}
          language={language}
          setLanguage={setLanguage}
          codeByFileUid={codeByFileUid}
          setCodeByFileUid={setCodeByFileUid}
          realtimeStatus={realtimeStatus}
          setRealtimeStatus={setRealtimeStatus}
          saveStatus={saveStatus}
          setSaveStatus={setSaveStatus}
          activeUsers={activeUsers}
          setActiveUsers={setActiveUsers}
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
