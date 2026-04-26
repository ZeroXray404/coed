import { X } from 'lucide-react'
import { useEscapeKey } from '../../hooks/useEscapeKey'

// Modal-komponent för editor-inställningar
// Tar emot:
// - onClose: funktion för att stänga modalen
// - options: objekt med nuvarande inställningar
// - setOptions: funktion för att uppdatera inställningarna
// - theme: nuvarande tema
// - setTheme: funktion för att uppdatera temat
function EditorOptions({ onClose, options, setOptions, theme, setTheme }) {
  useEscapeKey(onClose)

  // Uppdaterar en "platt" property i editorOptions
  function updateOption(key, value) {
    setOptions((prev) => ({
      ...prev, // kopierar alla tidigare inställningar
      [key]: value, // skriver över endast den property som ska ändras
    }))
  }

  // Uppdaterar en nästlad property i editorOptions
  function updateMinimap(enabled) {
    setOptions((prev) => ({
      ...prev, // kopierar alla tidigare inställningar
      minimap: {
        ...prev.minimap, // kopierar tidigare minimap-inställningar
        enabled, // uppdaterar endast enabled-värdet
      },
    }))
  }

  return (
    // Overlay som täcker hela skärmen och ger en skugga när modalen är öppen, klick på den stänger modalen
    <div className="editor-options-overlay" onClick={onClose}>
      {/* Själva modal-fönstret */}
      {/* stopPropagation förhindrar att klick inuti modalen stänger den */}
      <div
        className="editor-options-modal"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Stäng-knapp */}
        <button
          type="button"
          className="editor-options-close-btn"
          onClick={onClose}
          aria-label="Close Window"
        >
          <X size={20} />
        </button>

        {/* Innehåll */}
        <h2>Editor Settings</h2>
        <div className="editor-options-section">
          <label>
            Word wrap
            <select
              value={options.wordWrap}
              onChange={(e) => updateOption('wordWrap', e.target.value)}
            >
              <option value="on">On</option>
              <option value="off">Off</option>
            </select>
          </label>

          <label>
            Tab Size
            <select
              value={options.tabSize}
              onChange={(e) =>
                updateOption('tabSize', parseInt(e.target.value))
              }
            >
              <option value="2">2</option>
              <option value="4">4</option>
              <option value="6">6</option>
            </select>
          </label>

          <label>
            Font Size
            <input
              type="number"
              min="10"
              max="24"
              value={options.fontSize}
              onChange={(e) =>
                updateOption('fontSize', parseInt(e.target.value))
              }
            />
          </label>

          <label>
            Minimap
            <select
              value={options.minimap.enabled}
              onChange={(e) => updateMinimap(e.target.value === 'true')}
            >
              <option value="true">On</option>
              <option value="false">Off</option>
            </select>
          </label>

          <label>
            Theme
            <select value={theme} onChange={(e) => setTheme(e.target.value)}>
              <option value="vs-dark">Dark</option>
              <option value="vs-light">Light</option>
              <option value="hc-black">High contrast</option>
            </select>
          </label>
        </div>
      </div>
    </div>
  )
}

export default EditorOptions
