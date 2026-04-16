import Header from './components/Header'
import MainArea from './components/MainArea'
import Footer from './components/Footer'
import SidebarLeft from './components/Sidebar'

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
        <Footer />
      </footer>
    </main>
  )
}

export default App
