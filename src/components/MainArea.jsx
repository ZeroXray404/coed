import { useEffect, useState, useRef } from 'react'
import CodeEditor from './editor/CodeEditor'
import EditorToolbar from './editor/EditorToolbar'
import EditorOptions from './editor/EditorOptions'
import { useSocketFile } from '../hooks/useSocketFile'

// Objekt som innehåller en standard-template för varje språk.
// Används när användaren byter språk utan att en fil är aktiv
const languageTemplates = {
  javascript: 'console.log("Hello World")',
  python: 'print("Hello World")',
  html: '<h1>Hello World</h1>',
  css: 'h1 {color: red;}',
}

// Standardinställningar för Monaco-Editorn
const defaultEditorOptions = {
  // Allmänna user experience inställningar
  wordWrap: 'on',
  tabSize: 2,
  minimap: { enabled: false },
  fontSize: 14,

  // Interna default-värden för Editor beteende
  insertSpaces: true,
  automaticLayout: true,
  scrollBeyondLastLine: false,
}

function MainArea({
  activeFile,
  language,
  setLanguage,
  codeByFileUid,
  setCodeByFileUid,
}) {
  // State som styr om Options är öppen eller stängd
  const [isOptionsOpen, setIsOptionsOpen] = useState(false)
  // State som håller editor-inställningar
  const [editorOptions, setEditorOptions] = useState(() => {
    // Försöker hämta sparade inställningar från localStorage
    const savedOptions = localStorage.getItem('editorOptions')
    // Om det finns sparade inställningar, parsea och returnera dem, annars returnera defaultinställningarna
    return savedOptions ? JSON.parse(savedOptions) : defaultEditorOptions
  })
  // State för valt tema i editorn
  const [theme, setTheme] = useState(() => {
    // Försöker hämta sparat tema från localStorage
    const savedTheme = localStorage.getItem('editorTheme')
    // Om det finns ett sparat tema, returnera det, annars default vs-dark
    return savedTheme || 'vs-dark'
  })

  // Referens till Monaco-editorns instans.
  // Används för att kunna trigga editor-kommandon som undo/redo
  const editorRef = useRef(null)

  const activeFileUid = activeFile?.uid

  const code = activeFileUid
    ? (codeByFileUid[activeFileUid] ?? activeFile.content ?? '')
    : languageTemplates[language] || ''

  function setActiveFileCode(newContent) {
    if (!activeFileUid) {
      return
    }
    setCodeByFileUid((prev) => ({
      ...prev,
      [activeFileUid]: newContent,
    }))
  }

  // Använder custom hooken useSocketFile för att hantera socket-logiken för aktiv fil
  const { sendContent } = useSocketFile(activeFile, setActiveFileCode)

  // Körs när Monaco-editorn mountas.
  // Sparar editor-instansen i refen
  function handleEditorMount(editor) {
    editorRef.current = editor
  }

  // Triggar Monaco-editorns inbyggda undo-kommando
  function handleUndo() {
    editorRef.current?.trigger('toolbar', 'undo')
  }

  // Triggar Monaco-editorns inbyggda redo-kommando
  function handleRedo() {
    editorRef.current?.trigger('toolbar', 'redo')
  }

  // Sparar editor-instllningar i localStorage när de ändras
  useEffect(() => {
    localStorage.setItem('editorOptions', JSON.stringify(editorOptions))
  }, [editorOptions])

  // Sparar valt tema i localStorage när det ändras
  useEffect(() => {
    localStorage.setItem('editorTheme', theme)
  }, [theme])

  // Byter språk i editorn.
  function handleLanguageChange(newLanguage) {
    setLanguage(newLanguage)
  }

  // Funktion som styrsynlighet för Options modalen
  // Växlar mellan true/false baserat på tidigare state
  function toggleOptions() {
    setIsOptionsOpen((prev) => !prev)
  }

  return (
    <section className="main-area">
      {/* Toolbar med editor-relaterade kontroller:
      - språkval
      - editor-inställningar
      - undo/redo */}
      <EditorToolbar
        language={language}
        onLanguageChange={handleLanguageChange}
        onOptionsToggle={toggleOptions}
        onUndo={handleUndo}
        onRedo={handleRedo}
      />
      {isOptionsOpen && (
        <EditorOptions
          onClose={toggleOptions}
          options={editorOptions}
          setOptions={setEditorOptions}
          theme={theme}
          setTheme={setTheme}
        />
      )}
      {/* CodeEditor-komponent:
      - Visar kodinnehåll
      - Hanterar syntaxhighlighting via language
      - Skickar realtime-uppdateringar via onChange
      - Tar emot editor-inställningar och tema
      - Returnerar editor-instansen via onMount */}
      <CodeEditor
        language={language}
        value={code}
        path={activeFile?.uid || 'default'}
        onChange={sendContent}
        options={editorOptions}
        theme={theme}
        onMount={handleEditorMount}
      />
    </section>
  )
}

export default MainArea
