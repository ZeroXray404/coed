import { ChevronsDown, ChevronsUp, Save } from 'lucide-react'

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
// Tar emot:
// - language: aktuellt språk
// - onLanguageChange: funktion för att uppdatera språk
// - isOpen: boolean som styr om toolbaren är öppen eller stängd
// - onToggle: fuktion för att toggla toolbarens öppna/stängda tillstånd.
function EditorToolbar({ language, onLanguageChange, isOpen, onToggle }) {
  return (
    // Dynamisk klass baserat på isOpen för att styra styling av toolbaren
    <div className={`editor-toolbar ${isOpen ? 'is-open' : 'is-collapsed'}`}>
      {/* Renderas endast om toolbaren är öppen */}
      {isOpen && (
        <div className="editor-toolbar-content">
          <LanguageSelector
            language={language}
            onLanguageChange={onLanguageChange}
          />
          <SaveButton />
        </div>
      )}
      {/* Toggle-knapp för att öppna/stänga toolbaren */}
      <button
        type="button"
        className="editor-toolbar-toggle"
        onClick={onToggle}
      >
        {/* Visar olika ikon beroende på isOpen's state */}
        {isOpen ? <ChevronsUp size={20} /> : <ChevronsDown size={20} />}
      </button>
    </div>
  )
}
// Exporterar komponenten för användning i MainArea
export default EditorToolbar
