export function getIconNameFromFileName(filename = '') {
  const extension = filename.split('.').pop().toLowerCase()

  const language = {
    js: '<SquareAsterisk /> javascript', // Bild på fyrkant med en stjärna inuti
    jsx: '<FileCog /> javascript', //Bild på fil med ett kugghjul nere till vänster
    ts: '<FileTypeCorner /> typescript', //Bild på fil med ett T nere till vänster
    tsx: '<TypeOutline />typescript', // Bild på ett stort ihåligt T
    py: '<FileBracesCorner /> python', //Bild på fil med {} nere till vänster
    html: '<FileCodeCorner /> html', //Bild på fil med <> nere till vänster
    css: '<FileBox /> css', // Bild på fil med en box nere till vänster
    scss: '<FileHeart />scss', // Bild på fil med ett hjärta nere till vänster
    json: '<Atom /> json', // Bild på en atom/partikel
    md: '<FileText /> markdown', //Bild på fil med linjer för text
    other: '<FileQuestionMark />', //Bild på fil med frågetecken
  }
  return fileicon[extension] || 'plaintext'
}
