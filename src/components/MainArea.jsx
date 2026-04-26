import { useState } from 'react'
import CodeEditor from './editor/CodeEditor'
import EditorToolbar from './editor/EditorToolbar'

// Objekt som innehåller en standard utskrift för varje språk, används när man byter språk i dropdownen
const languageTemplates = {
  javascript: 'console.log("Hello World")',
  python: 'print("Hello World")',
  html: '<h1>Hello World</h1>',
  css: 'h1 {color: red;}',
}

function MainArea() {
  // State för valt programmeringsspråk
  // Används av båda toolbarens select och editorn
  const [language, setLanguage] = useState('javascript')
  // State för aktuell kod i editorn
  // intitialiseras med standardkod för JavaScript
  const [code, setCode] = useState(languageTemplates.javascript)
  // State som styr om toolbaren är öppen eller stängd
  const [isToolbarOpen, setIsToolbarOpen] = useState(false)
  // State som håller editor-inställningar
  const [editorOptions] = useState({
    wordWrap: 'on',
    tabSize: 2,
    insertSpaces: true,
    minimap: { enabled: false },
    fontSize: 14,
    automaticLayout: true,
    scrollBeyondLastLine: false,
  })
  // State för valt tema i editorn
  const [theme] = useState('vs-dark')

  // Handler som körs när användaren byter språk i dropdownen
  // Uppdaterar:
  // 1. Valt språk i state
  // 2. Kod i edtorn baserat på fördefinerad template för det valda språket
  function handleLanguageChange(newLanguage) {
    setLanguage(newLanguage)
    setCode(languageTemplates[newLanguage] || '')
  }

  // Funktion för att toggla toolbarens synlighet
  // Växlar mellan true/false baserat på tidigare state
  function toggleToolbar() {
    setIsToolbarOpen((prev) => !prev)
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
      />
      {/* CodeEditor-komponent:
      - Tar emot aktuellt språk (för syntaxhighlighting)
      - Tar emot kod (value)
      - Tar emot setter-funktion för att uppdatera kod när användaren skriver */}
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
