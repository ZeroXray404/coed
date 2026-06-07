import { useEffect, useState, useRef, useCallback } from 'react'
import CodeEditor from './MainArea/CodeEditor'
import EditorToolbar from './MainArea/EditorToolbar'
import { useSocketFile } from '../hooks/useSocketFile'
import { useSocketSelection } from '../hooks/useSocketSelection'

// Objekt som innehåller en standard-template för varje språk.
// Används när användaren byter språk utan att en fil är aktiv
const languageTemplates = {
  javascript: `/* 
    Welcome to CoEd, an intuitive realtime code editor where collaboration is made easy!
    Feel free to try the editor at your conviniance
    To enjoy the full experience with realtime collaborative editing Register an account or Login
      
    Bonus: As a registered user you get free cloudstorage for all your files and projects 
  
*/`,
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
  realtimeStatus,
  setRealtimeStatus,
  saveStatus,
  setSaveStatus,
  activeUsers,
  setActiveUsers,
  currentUser,
}) {
  // State som håller editor-inställningar
  const [editorOptions, setEditorOptions] = useState(() => {
    const savedOptions = localStorage.getItem('editorOptions')
    return savedOptions ? JSON.parse(savedOptions) : defaultEditorOptions
  })
  // State för valt tema i editorn
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('editorTheme')
    return savedTheme || 'vs-dark'
  })

  // State för användarens cursor
  const [remoteCursors, setRemoteCursors] = useState({})

  // State för Monaco-editorns instans
  const [editorInstance, setEditorInstance] = useState(null)
  // Referens till Monaco-editorns instans.
  const editorRef = useRef(null)

  // Hämtar uid för den aktiva filen.
  const activeFileUid = activeFile?.uid

  // Uppdaterar content för den aktiva filen.
  // useCallback användss för att React ska återanvända samma funktion
  // mellan renders så länge activeFileUid inte ändras
  let code = languageTemplates[language] || ''

  if (activeFileUid) {
    const savedCode = codeByFileUid[activeFileUid]

    if (savedCode !== undefined && savedCode !== null) {
      code = savedCode
    } else {
      code = activeFile.content || ''
    }
  }

  const setActiveFileCode = useCallback(
    (newContent) => {
      if (!activeFileUid) {
        return
      }

      // Uppdaterar state för den aktiva filens uid
      setCodeByFileUid((prev) => ({
        ...prev,
        [activeFileUid]: newContent,
      }))
    },
    [activeFileUid, setCodeByFileUid]
  )
  // Använder custom hooken useSocketFile för att hantera socket-logiken för aktiv fil
  const { sendContent } = useSocketFile(
    activeFile,
    editorRef,
    setActiveFileCode,
    setRealtimeStatus,
    setSaveStatus,
    setActiveUsers
  )

  // Körs när Monaco-editorn mountas.
  // Sparar editor-instansen i refen
  // Sparar editor-instansen i state
  function handleEditorMount(editor) {
    editorRef.current = editor
    setEditorInstance(editor)
  }

  // Triggar Monaco-editorns inbyggda undo-kommando
  function handleUndo() {
    editorRef.current?.trigger('toolbar', 'undo')
  }

  // Triggar Monaco-editorns inbyggda redo-kommando
  function handleRedo() {
    editorRef.current?.trigger('toolbar', 'redo')
  }

  // Sparar editor-inställningar i localStorage när de ändras
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

  const handleRemoteCursorChange = useCallback((cursorData) => {
    setRemoteCursors((prev) => ({
      ...prev,
      // Uppdaterar / lägger till cursorData för den användare som skickade eventet
      // cursorData.userId = e-postadress för användare som skickade eventet
      // cursorData = lineNumber och column för cursor-position
      [cursorData.userId]: cursorData,
    }))
    console.log('Remote cursor updated: ', cursorData)
  }, [])

  // Anropar useSocketSelection för att hantera cursor-position och markeringar i realtid
  useSocketSelection({
    editor: editorInstance,
    activeFile,
    currentUser,
    onRemoteCursorChange: handleRemoteCursorChange,
  })

  useEffect(() => {
    if (!editorInstance) {
      return
    }
    const decorationCollection = editorInstance.createDecorationsCollection()
    const decorations = Object.values(remoteCursors).map((cursor) => {
      const userIndex = activeUsers.indexOf(cursor.userId)

      return {
        range: {
          startLineNumber: cursor.lineNumber,
          startColumn: cursor.column,
          endLineNumber: cursor.lineNumber,
          endColumn: cursor.column + 1,
        },
        options: {
          className: `remote-cursor remote-cursor-${userIndex}`,
          afterContentClassName: `remote-cursor-head remote-cursor-head-${userIndex}`,
          hoverMessage: { value: `${cursor.userId}` },
        },
      }
    })
    decorationCollection.set(decorations)

    return () => {
      decorationCollection.clear()
    }
  }, [editorInstance, remoteCursors, activeUsers])

  return (
    <section className="main-area">
      {/* Toolbar med editor-relaterade kontroller:
      - språkval
      - editor-inställningar
      - undo/redo */}
      <EditorToolbar
        language={language}
        onLanguageChange={handleLanguageChange}
        onUndo={handleUndo}
        onRedo={handleRedo}
        realtimeStatus={realtimeStatus}
        saveStatus={saveStatus}
        activeUsers={activeUsers}
        editorOptions={editorOptions}
        setEditorOptions={setEditorOptions}
        theme={theme}
        setTheme={setTheme}
      />
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
