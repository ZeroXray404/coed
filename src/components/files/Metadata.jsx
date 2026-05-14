import { ChevronDown, ChevronUp } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

const Metadata = () => {
  const [isOpened, setIsOpened] = useState(false)

  const metadataRef = useRef(null)

  const toggleMetadata = () => {
    setIsOpened((prev) => !prev)
  }

  useEffect(() => {
    const handler = (e) => {
      if (metadataRef.current && !metadataRef.current.contains(e.target)) {
        setIsOpened(false)
      }
    }

    document.addEventListener('mousedown', handler)

    return () => {
      document.removeEventListener('mousedown', handler)
    }
  }, [isOpened])

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
          <p>Filename.js</p>
        </div>
        <div className="metadata-content-item">
          <span>Last modified:</span>
          <p>14-05-2026</p>
        </div>
        <div className="metadata-content-item">
          <span>Created by:</span>
          <p>Yakowboi</p>
        </div>
        <div className="metadata-content-item">
          <span>Lang:</span>
          <p>Javascript</p>
        </div>
      </div>
    </div>
  )
}

export default Metadata
