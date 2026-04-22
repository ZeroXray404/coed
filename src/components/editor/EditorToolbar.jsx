// Komponent för att välja programmeringsspråk
function LanguageSelector({ language, onLanguageChange }) {
  return (
    <div className="language-selector">
      <label htmlFor="language-select" className="sr-only">
        Språk:{' '}
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
    <button type="button" onClick={handleClick} className="toolbar-save-button">
      Save File
    </button>
  )
}

// Toolbar-komponent som grupperar editor-relaterade kontroller
function EditorToolbar({ language, onLanguageChange }) {
  return (
    <div className="editor-toolbar">
      <LanguageSelector
        language={language}
        onLanguageChange={onLanguageChange}
      />
      <SaveButton />
    </div>
  )
}

export default EditorToolbar
