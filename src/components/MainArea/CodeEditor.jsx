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
        value={value}
        onChange={(newValue) => onChange(newValue || '')}
        options={options}
        onMount={onMount}
        saveViewState={true}
      />
    </div>
  )
}

export default CodeEditor
