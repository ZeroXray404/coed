import { useState } from 'react'
import Header from './components/Header'
import MainArea from './components/MainArea'
import AuthCard from './components/authcard/AuthCard'
import Footer from './components/Footer'
import SidebarLeft from './components/Sidebar'

// Importerar CodeEditor komponenten.
function App() {
  // State som styr om auth-kortet ska visas eller ej
  const [showAuth, setShowAuth] = useState(false)

  return (
    <main className="app">
      <header className="app-header">
        {/* Skickar en funktion till Header som öppnar auth-kortet */}
        <Header onLoginClick={() => setShowAuth(true)} />
      </header>
      <aside className="app-sidebar">
        <SidebarLeft />
      </aside>
      <section className="app-main">
        <MainArea />
      </section>
      <footer className="app-footer">
        <Footer />
      </footer>

      {/* Visar AuthCard bara om showAuth är true och skickar en onClose-funktion till AuthCard */}
      {showAuth && <AuthCard onClose={() => setShowAuth(false)} />}
    </main>
  )
}

export default App
