export function getLanguageFromFileName(filename = '') {
  const extension = filename.split('.').pop().toLowerCase()

  const language = {
    js: 'javascript',
    jsx: 'javascript',
    ts: 'typescript',
    tsx: 'typescript',
    py: 'python',
    html: 'html',
    css: 'css',
    scss: 'scss',
    json: 'json',
    md: 'markdown',
  }
  return language[extension] || 'plaintext'
}
