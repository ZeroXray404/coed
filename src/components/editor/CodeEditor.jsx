import Editor from '@monaco-editor/react'

function CodeEditor({ language, value, onChange }) {
  // Tar emot props 'language', 'value' och 'onChange' från MainArea
  return (
    <div className="editor-container">
      <Editor
        language={language}
        theme="vs-dark"
        height="90%"
        value={value}
        onChange={(newValue) => onChange(newValue || '')}
      />
    </div>
  )
}

export default CodeEditor
