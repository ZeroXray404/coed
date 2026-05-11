import { useEffect, useState } from 'react'
import CodeEditor from './editor/CodeEditor'
import EditorToolbar from './editor/EditorToolbar'
import EditorOptions from './editor/EditorOptions'
import { useSocketFile } from '../hooks/useSocketFile'

// Objekt som innehåller en standard utskrift för varje språk, används när man byter språk i dropdownen
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

function MainArea({ activeFile, language, setLanguage, code, setCode }) {
  // State som styr om toolbaren/Options är öppen eller stängd
  const [isToolbarOpen, setIsToolbarOpen] = useState(false)
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

  // Testar socket-hooken med en "testfil" då fil logiken itne är implementerad än.
  const testActiveFile = { uid: 'socket-test-file' }
  useSocketFile(testActiveFile)

  // Sparar editor-instllningar i localStorage när de ändras
  useEffect(() => {
    localStorage.setItem('editorOptions', JSON.stringify(editorOptions))
  }, [editorOptions])

  // Sparar valt tema i localStorage när det ändras
  useEffect(() => {
    localStorage.setItem('editorTheme', theme)
  }, [theme])

  // Byter språk i editorn.
  // Om ingen fil är aktiv används en standard-template för valt språk.
  // Om en fil är aktiv behålls filens content
  function handleLanguageChange(newLanguage) {
    setLanguage(newLanguage)

    if (!activeFile) {
      setCode(languageTemplates[newLanguage] || '')
    }
  }

  // Funktioner som styrsynlighet för Toolbar och Options
  // Växlar mellan true/false baserat på tidigare state
  function toggleToolbar() {
    setIsToolbarOpen((prev) => !prev)
  }
  function toggleOptions() {
    setIsOptionsOpen((prev) => !prev)
  }

  function handleSave() {
    if (!activeFile) {
      alert('No active file selected')
      return
    }

    console.log('Ready to save via socket later:', {
      uid: activeFile.uid,
      filename: activeFile.filename,
      content: code,
    })
  }

  return (
    <section className="main-area">
      {/* Toolbar-komponent:
      - Tar emot aktuellt språk (state)
      - Tar emot callback för att ändra språk
      - Tar emot state för om den är öppen eller stängd
      - Tar emot funktionm för att toggla state */}
      <EditorToolbar
        language={language}
        onLanguageChange={handleLanguageChange}
        isOpen={isToolbarOpen}
        onToggle={toggleToolbar}
        onOptionsToggle={toggleOptions}
        onSave={handleSave}
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
      - Tar emot aktuellt språk (för syntaxhighlighting)
      - Tar emot kod (value)
      - Tar emot setter-funktion för att uppdatera kod när användaren skriver
      - Tar emot editor-inställningar
      - Tar emot tema */}
      <CodeEditor
        language={language}
        value={code}
        onChange={setCode}
        options={editorOptions}
        theme={theme}
      />
    </section>
  )
}

export default MainArea
