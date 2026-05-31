import { useEffect, useRef } from 'react'
import Editor from '@monaco-editor/react'

// Hjälpfunktion för att spara och återställa editor state (position och scroll-läge)
function getEditorViewState(editor) {
  return {
    position: editor.getPosition(),
    scrollTop: editor.getScrollTop(),
    scrollLeft: editor.getScrollLeft(),
  }
}

function restoreEditorViewState(editor, viewState) {
  if (viewState.position) {
    editor.setPosition(viewState.position)
  }
  editor.setScrollTop(viewState.scrollTop)
  editor.setScrollLeft(viewState.scrollLeft)
}

function CodeEditor({
  language,
  value,
  path,
  onChange,
  options,
  theme,
  onMount,
}) {
  const editorRef = useRef(null)
  const previousPathRef = useRef(path)
  const ignoreChangeRef = useRef(false) // Referens som används för att ignorera onChange när vi uppdaterar värdet uppdateringar via editor.setValue()

  useEffect(() => {
    const editor = editorRef.current

    if (!editor) {
      previousPathRef.current = path
      return
    }

    // Om Editorns innehåll skiljer sig från react-state böhöver Monaco uppdateras
    // Detta sker exempelvis när content kommer från scoket-servern eller vid filbyte.
    if (editor.getValue() !== value) {
      // Används för att spara cursor-positionen och scroll-läge innan uppdatering
      const viewState = getEditorViewState(editor)

      // Används för att skilja på:
      // 1. ändringar som användaren skriver själv
      // 2. ändringar som koden lägger in i editorn via editor.setValue()
      //
      // När setValue körs kan Monaco trigga onChange.
      // Då vill vi inte skicka ett nytt socket-event,
      // eftersom ändringen redan kommer från React/socket-state.
      ignoreChangeRef.current = true

      // Uppdaterar Editorn innehåll
      editor.setValue(value)

      // Använder hjälpfunktion för att återställa cursor-positionen och scroll-läge
      restoreEditorViewState(editor, viewState)

      // Aktiverar vanligaa onChange-event igen efter att uppdateringen är klar
      setTimeout(() => {
        ignoreChangeRef.current = false
      }, 0)
    }

    previousPathRef.current = path
  }, [path, value])

  function handleMount(editor, monaco) {
    editorRef.current = editor
    previousPathRef.current = path
    onMount?.(editor, monaco)
  }

  function handleChange(newValue) {
    if (ignoreChangeRef.current) {
      return
    }

    onChange(newValue || '')
  }

  return (
    <div className="editor-container">
      <Editor
        language={language}
        theme={theme}
        height="100%"
        path={path}
        defaultValue={value}
        onChange={handleChange}
        options={options}
        onMount={handleMount}
        saveViewState={true}
      />
    </div>
  )
}

export default CodeEditor
