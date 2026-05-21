import { ChevronDown, ChevronUp } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import {
  getFileName,
  getDateModified,
  getFileCreator,
  getFileType,
} from '../../services/fileServices.js'

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
  }, [metadataRef, fileListRef])

  return (
    <div className="sidebar-footer">
      <div className={`metadata ${isOpened ? 'opened' : ''}`} ref={metadataRef}>
        <button className="metadata-btn" onClick={toggleMetadata}>
          <p className="metadata-btn-text">Metadata</p>
          <span className="metadata-btn-icon">
            {!isOpened ? <ChevronDown /> : <ChevronUp />}
          </span>
        </button>
        <div className={`metadata-content ${isOpened ? 'opened' : ''}`}>
          <div className="metadata-content-item">
            <span>Title:</span>
            <p>{activeFile ? getFileName(activeFile) : 'N/A'}</p>
          </div>
          <div className="metadata-content-item">
            <span>Last modified:</span>
            <p>{activeFile ? getDateModified(activeFile, true) : 'N/A'}</p>
          </div>
          <div className="metadata-content-item">
            <span>Created by:</span>
            <p>{activeFile ? getFileCreator(activeFile) : 'N/A'}</p>
          </div>
          <div className="metadata-content-item">
            <span>Language:</span>
            <p>{activeFile ? getFileType(activeFile) : 'N/A'}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MetadataFooter
