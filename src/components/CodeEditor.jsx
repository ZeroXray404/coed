import Editor from '@monaco-editor/react'

function CodeEditor() {
  return (
    <div className="editor-container">
      <Editor
        defaultLanguage="javascript"
        defaultValue='console.log("Hello World")'
        theme="vs-dark"
        height="100%"
      />
    </div>
  )
}

export default CodeEditor
