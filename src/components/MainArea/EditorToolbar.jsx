import { useState } from 'react'
import { Settings, Redo, Undo } from 'lucide-react'
import EditorOptions from './EditorToolbar/EditorOptions'

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
// Komponent som visar aktiva users i filen.
// Färgen på namn (och framtida cursor) mappax via index.
function ActiveUsers({ users }) {
  if (!users?.length) {
    return null
  }
  return (
    <div className="active-users">
      {users.map((email, index) => (
        <span key={email} className={`active-user active-user-${index}`}>
          {email}
        </span>
      ))}
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

// Komponent som visar realtime- och sparstatus i toolbaren
// Tar emot:
// -realtimeStatus: status för socket anslutning
// -saveStatus: status för sprande/sync av innehåll

function StatusIndicator({ realtimeStatus, saveStatus }) {
  const realtimeLabels = {
    connected: 'Connected',
    disconnected: 'Not Connected',
    reconnecting: 'Reconnecting...',
    error: 'Error',
  }
  const saveLabels = {
    idle: '',
    unsaved: 'Unsaved changes',
    saving: 'Saving...',
    saved: 'Saved',
    error: 'Save failed',
  }
  // Visar save-status bara om status inte är "idle"
  return (
    <div className="toolbar-status">
      <span className={`status-label status-${realtimeStatus}`}>
        {realtimeLabels[realtimeStatus] || ''}
      </span>

      {saveStatus !== 'idle' && (
        <span className={`status-label status-${saveStatus}`}>
          {saveLabels[saveStatus] || ''}
        </span>
      )}
    </div>
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
  onUndo,
  onRedo,
  realtimeStatus,
  saveStatus,
  activeUsers,
  editorOptions,
  setEditorOptions,
  theme,
  setTheme,
}) {
  // State som styr om Options är öppen eller stängd
  const [isOptionsOpen, setIsOptionsOpen] = useState(false)

  // Funktion som styrsynlighet för Options modalen
  // Växlar mellan true/false baserat på tidigare state
  function toggleOptions() {
    setIsOptionsOpen((prev) => !prev)
  }
  return (
    // Dynamisk klass baserat på isOpen för att styra styling av toolbaren
    <div className="editor-toolbar">
      <div className="editor-toolbar-content">
        <UndoButton onUndo={onUndo} />
        <RedoButton onRedo={onRedo} />

        <StatusIndicator
          realtimeStatus={realtimeStatus}
          saveStatus={saveStatus}
        />

        <ActiveUsers users={activeUsers} />

        <LanguageSelector
          language={language}
          onLanguageChange={onLanguageChange}
        />
        <SettingsButton onClick={toggleOptions} />
        {isOptionsOpen && (
          <EditorOptions
            onClose={toggleOptions}
            options={editorOptions}
            setOptions={setEditorOptions}
            theme={theme}
            setTheme={setTheme}
          />
        )}
      </div>
    </div>
  )
}
// Exporterar komponenten för användning i MainArea
export default EditorToolbar
