import { X } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { useEscapeKey } from '../../../hooks/useEscapeKey'
import { getLanguageFromFileName } from '../../../utils/getLanguageFromFileName'

function InputField({ createMode, setPendingName, setCreateMode, onClose }) {
  const inputRef = useRef(null)

  useEffect(() => {
    if (createMode) {
      inputRef.current?.focus()
    }
  }, [createMode])

  function handleInput(input) {
    if (input.key === 'Enter' && input.target.value !== '') {
      // Skapar man en fil så kommer en giltig filändelse vara krav för att skapa
      if (
        createMode === 'file' &&
        getLanguageFromFileName(input.target.value) === 'plaintext'
      ) {
        alert('Invalid file extension, please enter a valid file extension')
        return
      }

      setPendingName(input.target.value)
      input.target.value = ''
    }
  }

  useEscapeKey(onClose)

  if (createMode === 'proj') {
    return (
      <div className="create-mode new-proj">
        <input
          type="text"
          placeholder="Enter project name..."
          onKeyDown={handleInput}
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
          onKeyDown={handleInput}
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
