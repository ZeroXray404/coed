import { ChevronsDown, ChevronsUp, Save } from 'lucide-react'

// Komponent för att välja programmeringsspråk
function LanguageSelector({ language, onLanguageChange }) {
  return (
    <div className="language-selector">
      <label htmlFor="language-select" className="sr-only">
        Programming Language:{' '}
      </label>
      <select
        id="language-select"
        value={language}
        onChange={(e) => onLanguageChange(e.target.value)}
      >
        <option value="javascript">JavaScript</option>
        <option value="python">Python</option>
        <option value="html">HTML</option>
        <option value="css">CSS</option>
      </select>
    </div>
  )
}

// Placeholder-komponent för att spara en fil, kommer utvecklas senare med funktionalitiet för att spara kod från editorn
function SaveButton() {
  function handleClick() {
    alert('Placeholder: Implementera spara-funktionalitet här!')
  }
  return (
    <button
      type="button"
      onClick={handleClick}
      className="toolbar-save-button"
      title="Save File"
      aria-label="Save File"
    >
      <Save size={20} />
    </button>
  )
}

// Toolbar-komponent som grupperar editor-relaterade kontroller
function EditorToolbar({ language, onLanguageChange, isOpen, onToggle }) {
  return (
    <div className={`editor-toolbar ${isOpen ? 'is-open' : 'is-collapsed'}`}>
      {isOpen && (
        <div className="editor-toolbar-content">
          <LanguageSelector
            language={language}
            onLanguageChange={onLanguageChange}
          />
          <SaveButton />
        </div>
      )}
      <button
        type="button"
        className="editor-toolbar-toggle"
        onClick={onToggle}
      >
        {isOpen ? <ChevronsUp size={20} /> : <ChevronsDown size={20} />}
      </button>
    </div>
  )
}

export default EditorToolbar
