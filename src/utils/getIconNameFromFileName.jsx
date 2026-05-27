import { FileQuestionMark } from 'lucide-react'

import JavaScript from '../assets/javascript.svg'
import React from '../assets/react.svg'
import Css from '../assets/css.svg'
import Html from '../assets/html.svg'
import MarkDown from '../assets/markdown.svg'
import Python from '../assets/python.svg'
import Scss from '../assets/scss.svg'
import TypeScript from '../assets/typescript.svg'
import Tsx from '../assets/tsx.svg'
import Json from '../assets/json.svg'

export function getIconNameFromFileName(filename = '') {
  if (!filename) return <FileQuestionMark size={14} />

  const extension = filename.split('.').pop().toLowerCase()

  switch (extension) {
    case 'js':
      return <img src={JavaScript} className="sidebar-file-icon" />
    case 'jsx':
      return <img src={React} className="sidebar-file-icon" />
    case 'ts':
      return <img src={TypeScript} className="sidebar-file-icon" />
    case 'tsx':
      return <img src={React} className="sidebar-file-icon" />
    case 'py':
      return <img src={Python} className="sidebar-file-icon" />
    case 'html':
      return <img src={Html} className="sidebar-file-icon" />
    case 'css':
      return <img src={Css} className="sidebar-file-icon" />
    case 'scss':
      return <img src={Scss} className="sidebar-file-icon" />
    case 'json':
      return <img src={Json} className="sidebar-file-icon" />
    case 'md':
      return <img src={MarkDown} className="sidebar-file-icon" />

    default:
      return <FileQuestionMark size={14} />
  }
}
