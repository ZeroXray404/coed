import JavaScriptIcon from '../assets/javascript.svg'
import ReactIcon from '../assets/react.svg'
import CssIcon from '../assets/css.svg'
import HtmlIcon from '../assets/html.svg'
import MarkdownIcon from '../assets/markdown.svg'
import PythonIcon from '../assets/python.svg'
import ScssIcon from '../assets/scss.svg'
import TypeScriptIcon from '../assets/typescript.svg'
import JsonIcon from '../assets/json.svg'

const iconsByExtension = {
  js: JavaScriptIcon,
  jsx: ReactIcon,
  ts: TypeScriptIcon,
  tsx: ReactIcon,
  py: PythonIcon,
  html: HtmlIcon,
  css: CssIcon,
  scss: ScssIcon,
  json: JsonIcon,
  md: MarkdownIcon,
}

export function getIconSrcFromFileName(filename = '') {
  if (!filename) return null

  const extension = filename.split('.').pop().toLowerCase()

  return iconsByExtension[extension] ?? null
}
