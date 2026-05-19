import { Settings, Redo, Undo } from 'lucide-react'

// Komponent för att välja programmeringsspråk
// Tar emot:
// - language: aktuellt valt språk (state från parent)
// - onLanguangeChange: callback-funktion för att uppdatera språk i parent state
function LanguageSelector({ language, onLanguageChange }) {
  return (
    <div className="language-selector">
      {/* Label används för tillgänglighet (skrämläsare9, men är visuellt dold) */}
      <label htmlFor="language-select" className="sr-only">
        Programming Language:{' '}
      </label>
      {/* Select-element kopplat till state via value onChange med fördefinerade alternativ*/}
      <select
        id="language-select"
        value={language}
        onChange={(e) => onLanguageChange(e.target.value)}
      >
        <option value="javascript">JavaScript</option>
        <option value="typescript">TypeScript</option>
        <option value="python">Python</option>
        <option value="html">HTML</option>
        <option value="css">CSS</option>
        <option value="scss">SCSS</option>
        <option value="json">JSON</option>
        <option value="markdown">Markdown</option>
      </select>
    </div>
  )
}

// Settings knapp för att öppna editorinställningar i ett modal fönster
function SettingsButton({ onClick }) {
  return (
    <button
      type="button"
      className="toolbar-button settings-button"
      onClick={onClick}
      title="Editor Settings"
      aria-label="Editor Settings"
    >
      <Settings size={20} />
    </button>
  )
}

function UndoButton({ onUndo }) {
  return (
    <button
      type="button"
      className="toolbar-button undo-button"
      onClick={onUndo}
      title="Undo"
      aria-label="Undo"
    >
      <Undo size={20} />
    </button>
  )
}

function RedoButton({ onRedo }) {
  return (
    <button
      type="button"
      className="toolbar-button redo-button"
      onClick={onRedo}
      title="Redo"
      aria-label="Redo"
    >
      <Redo size={20} />
    </button>
  )
}

// Toolbar-komponent som grupperar editor-relaterade kontroller
// Tar emot:
// - language: aktuellt språk
// - onLanguageChange: funktion för att uppdatera språk
// - isOpen: boolean som styr om toolbaren är öppen eller stängd
// - onToggle: fuktion för att toggla toolbarens öppna/stängda tillstånd.
function EditorToolbar({
  language,
  onLanguageChange,
  onOptionsToggle,
  onUndo,
  onRedo,
}) {
  return (
    // Dynamisk klass baserat på isOpen för att styra styling av toolbaren
    <div className="editor-toolbar">
      <div className="editor-toolbar-content">
        <LanguageSelector
          language={language}
          onLanguageChange={onLanguageChange}
        />
        <SettingsButton onClick={onOptionsToggle} />

        <UndoButton onUndo={onUndo} />
        <RedoButton onRedo={onRedo} />
      </div>
    </div>
  )
}
// Exporterar komponenten för användning i MainArea
export default EditorToolbar
