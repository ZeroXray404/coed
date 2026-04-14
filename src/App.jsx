import Header from './components/Header'
import MainArea from './components/MainArea'
import SidebarLeft from './components/SidebarLeft'

// Importerar CodeEditor komponenten.
function App() {
  return (
    <main className="app">
      <header className="app-header">
        <Header />
      </header>
      <aside className="app-sidebar">
        <SidebarLeft />
      </aside>
      <section className="app-main">
        <MainArea />
      </section>
      <footer className="app-footer">
        {/* Placera Footer-komponent här */}
      </footer>
    </main>
  )
}

export default App
