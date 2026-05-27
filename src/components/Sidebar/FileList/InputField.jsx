import { X } from 'lucide-react'
import { useEffect, useRef } from 'react'

function InputField({ createMode, setPendingName, setCreateMode }) {
  const inputRef = useRef(null)

  useEffect(() => {
    if (createMode) {
      inputRef.current?.focus()
    }
  }, [createMode])

  if (createMode === 'proj') {
    return (
      <div className="create-mode new-proj">
        <input
          type="text"
          placeholder="Enter project name..."
          onKeyDown={(e) => {
            if (e.key === 'Enter' && e.target.value !== '') {
              setPendingName(e.target.value)
              e.target.value = ''
            }
          }}
          ref={inputRef}
        />
        <button
          onClick={() => {
            setCreateMode('')
          }}
        >
          <X size={20} />
        </button>
      </div>
    )
  } else if (createMode === 'file') {
    return (
      <div className="create-mode new-file">
        <input
          type="text"
          placeholder="Enter file name..."
          onKeyDown={(e) => {
            if (e.key === 'Enter' && e.target.value !== '') {
              setPendingName(e.target.value)
              e.target.value = ''
            }
          }}
          ref={inputRef}
        />
        <button
          onClick={() => {
            setCreateMode('')
          }}
        >
          <X size={20} />
        </button>
      </div>
    )
  }
}

export default InputField
