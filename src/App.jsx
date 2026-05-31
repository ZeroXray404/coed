import { useState } from 'react'
import {
  logoutUser,
  getToken,
  saveCurrentUser,
  getCurrentUser,
} from './services/authServices'
import Header from './components/Header'
import MainArea from './components/MainArea'
import Footer from './components/Footer'
import Sidebar from './components/Sidebar'

// Importerar CodeEditor komponenten.
function App() {
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
          onLogoutClick={handleLogout}
          onLoginSuccess={handleLoginSuccess}
        />
      </header>
      <aside className="app-sidebar">
        <Sidebar
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
          currentUser={currentUser}
        />
      </section>
      <footer className="app-footer">
        <Footer />
      </footer>
    </main>
  )
}

export default App
