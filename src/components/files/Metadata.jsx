import { ChevronDown, ChevronUp } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { getLanguageFromFileName } from '../../utils/getLanguageFromFileName.js'

const MetadataFooter = ({ activeFile, fileListRef }) => {
  const [isOpened, setIsOpened] = useState(false)

  const metadataRef = useRef(null)

  const toggleMetadata = () => {
    setIsOpened((prev) => !prev)
  }

  useEffect(() => {
    const handler = (e) => {
      const insideMetadata =
        metadataRef.current && !metadataRef.current.contains(e.target)
      const insideFileList =
        fileListRef.current && !fileListRef.current.contains(e.target)

      if (insideMetadata && insideFileList) {
        setIsOpened(false)
      }
    }

    document.addEventListener('mousedown', handler)

    return () => {
      document.removeEventListener('mousedown', handler)
    }
  }, [isOpened])

  // Returnerar filnamnet utan filändelsen
  const getFileName = () => {
    const fileName = activeFile.filename

    return fileName.split('.').shift()
  }

  // Returnerar det formatterade datum och tid
  const getDateModified = () => {
    const iso = activeFile.last_changed
    const date = new Date(iso)

    const datePart = date.toLocaleDateString('sv-SE')
    const timePart = date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    })

    const dateModified = `${datePart}, ${timePart}`

    return dateModified
  }

  // Returnerar filskaparens namn/email utan den andra halvan efter '@'
  const getFileCreator = () => {
    const fileCreator = activeFile.created_by

    return fileCreator.split('@').shift()
  }

  // Returnerar kodspråket kapitaliserat
  const getFileType = () => {
    if (getLanguageFromFileName(activeFile.filename) === 'plaintext') {
      return 'N/A'
    } else {
      const fileType = getLanguageFromFileName(activeFile.filename)
      let language = ''

      if (fileType === 'javascript' || fileType === 'typescript') {
        let firstHalf = fileType.charAt(0).toUpperCase() + fileType.slice(1, 4) // first 4 letters

        language = `${firstHalf}Script`
      } else {
        language = fileType.charAt(0).toUpperCase() + fileType.slice(1)
      }

      return language
    }
  }

  return (
    <div className={`metadata ${isOpened ? 'opened' : ''}`} ref={metadataRef}>
      <div className="metadata-btn" onClick={toggleMetadata}>
        <p className="metadata-btn-text">Metadata</p>
        <span className="metadata-btn-icon">
          {!isOpened ? <ChevronDown /> : <ChevronUp />}
        </span>
      </div>
      <div className={`metadata-content ${isOpened ? 'opened' : ''}`}>
        <div className="metadata-content-item">
          <span>Title:</span>
          <p>{activeFile ? getFileName() : 'N/A'}</p>
        </div>
        <div className="metadata-content-item">
          <span>Last modified:</span>
          <p>{activeFile ? getDateModified() : 'N/A'}</p>
        </div>
        <div className="metadata-content-item">
          <span>Created by:</span>
          <p>{activeFile ? getFileCreator() : 'N/A'}</p>
        </div>
        <div className="metadata-content-item">
          <span>Language:</span>
          <p>{activeFile ? getFileType() : 'N/A'}</p>
        </div>
      </div>
    </div>
  )
}

export default MetadataFooter
