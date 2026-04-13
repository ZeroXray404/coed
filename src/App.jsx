import Header from './components/Header'
import MainArea from './components/MainArea'

// Importerar CodeEditor komponenten.
function App() {
  return (
    <main className="app">
      <header className="app-header">
        <Header />
      </header>
      <aside className="app-sidebar">
        {/* Placera Sidebar-komponent här */}
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
