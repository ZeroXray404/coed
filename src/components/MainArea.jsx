import CodeEditor from './CodeEditor'

function MainArea() {
  return (
    <section className="main-area">
      {/* Layout för editor och terminal */}
      <div className="editor-section">
        <CodeEditor />
      </div>
      <div className="terminal-section">
        {/* Tillfällig placeholder för terminal/output komponenten */}
        <p>Terminal/output komponenten kommer här</p>
      </div>
    </section>
  )
}

export default MainArea
