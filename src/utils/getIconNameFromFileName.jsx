import {
  AppWindow,
  File,
  Users,
  UserMinus,
  SquareAsterisk,
  FileCog,
  FileTypeCorner,
  TypeOutline,
  FileBracesCorner,
  FileCodeCorner,
  FileHeart,
  FileBox,
  Atom,
  FileText,
  FileQuestionMark,
} from 'lucide-react'

export function getIconNameFromFileName(filename = '') {
  if (!filename) return <FileQuestionMark size={14} />

  const extension = filename.split('.').pop().toLowerCase()

  switch (extension) {
    case 'js':
      return <SquareAsterisk size={14} />
    case 'jsx':
      return <FileCog size={14} />
    case 'ts':
      return <FileTypeCorner size={14} />
    case 'tsx':
      return <TypeOutline size={14} />
    case 'py':
      return <FileBracesCorner size={14} />
    case 'html':
      return <FileCodeCorner size={14} />
    case 'css':
      return <FileBox size={14} />
    case 'scss':
      return <FileHeart size={14} />
    case 'json':
      return <Atom size={14} />
    case 'md':
      return <FileText size={14} />

    default:
      return <FileQuestionMark size={14} />
  }
}
