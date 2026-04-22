import { useState } from 'react'
import CodeEditor from './editor/CodeEditor'
import EditorToolbar from './editor/EditorToolbar'

// Objekt som innehåller en standard utskrift för varje språk, används när man byter språk i dropdownen
const languageTemplates = {
  javascript: 'console.log("Hello World")',
  python: 'print("Hello World")',
  html: '<h1>Hello World</h1>',
  css: 'H1 {color: red;}',
}

function MainArea() {
  // State för att hålla reda på valt språk och kod i editorn(default javascript)
  const [language, setLanguage] = useState('javascript')
  const [code, setCode] = useState(languageTemplates.javascript)

  // Funktion som hanterar språkbyte
  // Uppdaterar både språket och sätter utgångskoden för det nya språket
  function handleLanguageChange(newLanguage) {
    setLanguage(newLanguage)
    setCode(languageTemplates[newLanguage] || '')
  }

  return (
    <section className="main-area">
      {/* Skickar state och handler-funktion som props till toolbar */}
      <EditorToolbar
        language={language}
        onLanguageChange={handleLanguageChange}
      />
      {/* Skickar state och setter-funktion till editorn */}
      <CodeEditor language={language} value={code} onChange={setCode} />
    </section>
  )
}

export default MainArea
