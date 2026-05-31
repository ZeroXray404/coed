import { useEffect, useRef } from 'react'
import Editor from '@monaco-editor/react'

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

  useEffect(() => {
    const editor = editorRef.current

    if (!editor) {
      previousPathRef.current = path
      return
    }

    if (previousPathRef.current !== path) {
      previousPathRef.current = path

      if (editor.getValue() !== value) {
        editor.setValue(value)
      }
    }
  }, [path, value])

  function handleMount(editor, monaco) {
    editorRef.current = editor
    previousPathRef.current = path
    onMount?.(editor, monaco)
  }

  // Tar emot props från MainArea:
  // 'language' = valt språk
  // 'value' = kodinnehåll
  // 'onChange' = funktion för att uppdatera kod
  // 'options' = Monaco-inställnignar
  return (
    <div className="editor-container">
      <Editor
        language={language}
        theme={theme}
        height="100%"
        path={path}
        defaultValue={value}
        onChange={(newValue) => onChange(newValue || '')}
        options={options}
        onMount={handleMount}
        saveViewState={true}
      />
    </div>
  )
}

export default CodeEditor
