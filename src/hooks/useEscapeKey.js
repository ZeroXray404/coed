import { useEffect } from 'react'

export function useEscapeKey(onEscape) {
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape') {
        onEscape()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [onEscape])
}
