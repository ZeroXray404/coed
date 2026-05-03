import { ChevronsDown, ChevronsUp, Save, Settings } from 'lucide-react'

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

// Placeholder-komponent för att spara en fil, kommer utvecklas senare med funktionalitiet för att spara kod från editorn
function SaveButton() {
  function handleClick() {
    alert('Placeholder: Implementera spara-funktionalitet här!')
  }
  return (
    <button
      type="button"
      onClick={handleClick}
      className="toolbar-button save-button"
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
function EditorToolbar({
  language,
  onLanguageChange,
  isOpen,
  onToggle,
  onOptionsToggle,
}) {
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
          <SettingsButton onClick={onOptionsToggle} />
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
