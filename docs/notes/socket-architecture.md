# Realtidsredigering - Arkitektur

## App.jsx

- håller global state som behöver delas mellan flera komponenter
- exempel: activeFile, code, language, isLoggedIn
- skickar aktiv fil, kod och språk vidare till MainArea
- skickar setters till SidebarLeft så filval kan uppdatera editor-state
- ansvarar inte för socket-logik eller editorlogik
- ansvarar inte för Monaco Editor-rendering

## SidebarLeft.jsx

- hanterar val av aktiv fil via fillistan
- skickar vald fil vidare genom setActiveFile
- uppdaterar även:
  - code
  - language
- fungerar som kopplingen mellan fillistan och editorn
- ansvarar inte för socket-logik

## MainArea.jsx

- samordnar editor, toolbar och socket-hook
- tar emot activeFile, code, setCode, language och setLanguage som props från App.jsx
- håller lokal UI-state för editorområdet
- ansvarar för:
  - om toolbar/options är öppna
  - editorinställningar
  - tema
  - koppling till useSocketFile hooken
- Innehåller inte själva socket-implementationen

## CodeEditor.jsx

- renderar Monaco Editor
- tar emot code, language, theme och editorOptions via props
- visar editorinnehåll
- skickar textändringar vidare via onChange
- ansvarar inte för socket-logik
- ansvarar inte för API-anrop
- ansvarar inte för vilken fil som är aktiv

## useSocketFile.js

- hanterar realtime-logik för den aktiva filen
- tar emot activeFile och setCode
- ansluter socketen vid behov
- öppnar socket-room för aktiv fil
- stänger socket-room när filen byts eller komponenten avmonteras
- skickar nytt editorinnehåll till servern via content
- tar emot content-uppdateringar från servern
- uppdaterar editor-state när nytt content tas emot
- lyssnar på content saved för att veta när servern har sparat filen
- hanterar cleanup av socket-listeners

Ansvarar för socket-events som:

- open file
- close file
- content
- content saved
- file loaded
- users
- connect
- disconnect
- connect_error

## socketService.js

- skapar och exporterar socket-instansen
- innehåller grundkonfiguration för Socket.IO
- ansvarar för att skicka med auth-token vid anslutning
- hämtar aktuell token innan socketen ansluts
- innehåller funktioner för att ansluta och koppla från socketen
- appen ska endast ha en socket.io-anslutning
- samma socket kan användas för flera rooms
- rooms används för att separera realtime-kommunikation mellan olika filer

# Framtida vidareutveckling

## useSocketSelection.js

Kommer i framtiden ansvara för:

- cursor-positioner
- markeringar/selection
- realtime-visning av andra användares aktivitet i editorn

Exempel:

- flera användares cursors
- markerad kod
