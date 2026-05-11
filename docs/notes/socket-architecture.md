# Realtidsredigering - Arkitektur

## App.jsx

- håller global state som behöver delas mellan syskonkomponenter
- exempel: activeFile
- skickar aktiv fil mellan Sidebar och MainArea
- ansvarar inte för socket-logik eller editorlogik

## MainArea.jsx

- samordnar editor, toolbar och socket-hook
- håller state för aktuell editor-session
- ansvarar för:
  - aktuell kod
  - språk
  - editorinställningar
  - tema
  - användarstatus/sparstatus (framtida)

## CodeEditor.jsx

- renderar Monaco Editor
- presentationell komponent
- visar endast editorinnehåll
- skickar vidare textändringar via props
- ska inte innehålla socket-logik

## useSocketFile.js

- hanterar realtime-logik för aktiv fil
- ansvarar för:
  - open file
  - close file
  - content updates
  - users-events
  - content saved-events
- synkroniserar editorinnehåll mellan användare

## socketService.js

- skapar och exporterar socket-instansen
- ansvarar för auth-token vid anslutning
- appen ska endast ha EN socket.io-anslutning
- samma socket kan användas i flera rooms

# Framtida vidareutveckling

## useSocketSelection.js

Kommer i framtiden ansvara för:

- cursor-positioner
- markeringar/selection
- realtime-visning av andra användares aktivitet i editorn

Exempel:

- flera användares cursors
- markerad kod
