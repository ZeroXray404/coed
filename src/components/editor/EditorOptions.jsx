import { X } from 'lucide-react'
import { useEscapeKey } from '../../hooks/useEscapeKey'

// Modal-komponent för editor-inställningar
// Tar emot:
// - onClose: funktion för att stänga modalen
function EditorOptions({ onClose }) {
  useEscapeKey(onClose)

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
        <p>Här kommer editorinställningar att visas.</p>

        {/* Placeholder för framtida settings */}
        <div className="editor-options-section">
          <p>Word wrap</p>
          <p>Tab size</p>
          <p>Font size</p>
          <p>Theme</p>
        </div>
      </div>
    </div>
  )
}

export default EditorOptions
