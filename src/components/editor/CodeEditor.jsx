import Editor from '@monaco-editor/react'

function CodeEditor({ language, value, onChange, options, theme }) {
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
        height="90%"
        value={value}
        onChange={(newValue) => onChange(newValue || '')}
        options={options}
      />
    </div>
  )
}

export default CodeEditor
