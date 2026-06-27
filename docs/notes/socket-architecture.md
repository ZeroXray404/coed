# Realtime Editing Architecture

This document describes the current socket-related architecture in the client.
It reflects the implementation in `App.jsx`, `Sidebar.jsx`, `MainArea.jsx`,
`useSocketFile.js`, `useSocketSelection.js`, and `socketServices.js`.

## High-level flow

1. `Sidebar/FileList.jsx` sets the active file when the user clicks a file.
2. `App.jsx` stores the active file, per-file editor content, realtime status,
   save status, active users, and the current user.
3. `MainArea.jsx` derives the visible editor content from `codeByFileUid` and
   coordinates the realtime hooks.
4. `useSocketFile.js` owns the file-room lifecycle and content synchronization.
5. `useSocketSelection.js` handles realtime cursor updates for the active file.
6. `EditorToolbar.jsx` renders connection status, save status, and active users.

## Component and module responsibilities

### `App.jsx`

- Owns global state shared across the editor flow.
- Stores:
  - `activeFile`
  - `language`
  - `codeByFileUid`
  - `realtimeStatus`
  - `saveStatus`
  - `activeUsers`
  - `currentUser`
- Passes file-selection setters to `Sidebar.jsx`.
- Passes editor state and socket-related state to `MainArea.jsx`.
- Does not contain socket event handling itself.

### `Sidebar.jsx`

- Fetches and renders project and file data through `FileList.jsx`.
- Passes `setActiveFile`, `setCodeByFileUid`, and `setLanguage` down to the file list.
- Does not manage socket connections directly.

### `Sidebar/FileList.jsx`

- Handles the user interaction that activates a file.
- In `handleFileClick(file)` it:
  - sets the clicked file as `activeFile`
  - derives the Monaco language from the filename
  - initializes `codeByFileUid[file.uid]` if the file has not been opened before
- This is the entry point that starts the realtime editor flow for a file.

### `MainArea.jsx`

- Orchestrates the editor, toolbar, and realtime hooks.
- Derives the editor content from:
  - `codeByFileUid[activeFile.uid]` when a file is active
  - a language template when no file is active
- Creates `setActiveFileCode`, which updates content for the current file only.
- Mounts:
  - `useSocketFile(...)`
  - `useSocketSelection(...)`
- Stores the Monaco editor instance in both:
  - `editorRef` for imperative updates
  - `editorInstance` for cursor and decoration logic
- Tracks remote cursor data and turns it into Monaco decorations.

### `CodeEditor.jsx`

- Renders the Monaco editor.
- Receives:
  - `language`
  - `value`
  - `path`
  - `onChange`
  - `options`
  - `theme`
  - `onMount`
- Sends text changes to `onChange`, which is currently `sendContent` from `useSocketFile`.
- Returns the Monaco editor instance through `onMount`.
- Does not talk to Socket.IO directly.

### `EditorToolbar.jsx`

- Displays connection state from `realtimeStatus`.
- Displays content save state from `saveStatus`.
- Displays the active users list supplied by `activeUsers`.
- Does not manage socket events directly, but it is the main UI surface for socket feedback.

### `socketServices.js`

- Creates and exports the single shared Socket.IO client instance.
- Uses `autoConnect: false`, so the connection is opened manually.
- Reads the JWT token from `authServices.getToken()`.
- Exports:
  - `socket`
  - `connectSocket()`
  - `disconnectSocket()`
- Ensures the latest token is attached immediately before connecting.

### `useSocketFile.js`

- Owns file-room membership and content synchronization for the active file.
- Connects the shared socket when `activeFile.uid` exists.
- Disconnects the socket when the active file is cleared or when the hook cleans up.
- Registers listeners for:
  - `connect`
  - `connect_error`
  - `disconnect`
  - `file loaded`
  - `content`
  - `content saved`
  - `users`
  - `socket.io reconnect_attempt`
- Emits:
  - `open file`
  - `close file`
  - `content`
- Applies remote text updates with Monaco `executeEdits(...)` instead of replacing the whole document.
- Prevents echo loops with a per-client `clientId`.
- Updates:
  - `setActiveFileCode`
  - `setRealtimeStatus`
  - `setSaveStatus`
  - `setActiveUsers`

### `useSocketSelection.js`

- Handles realtime cursor-position updates for the active file.
- Depends on:
  - a mounted Monaco editor instance
  - `activeFile.uid`
  - `currentUser.email`
- Emits `selection` whenever the local cursor position changes.
- Listens for incoming `selection` events from other users.
- Ignores:
  - events without payload
  - events for another file
  - events from the current user
- Calls `onRemoteCursorChange(...)` so `MainArea.jsx` can update Monaco decorations.

Note:
- Despite the hook name, the current implementation tracks cursor position only.
- It does not yet render full text selections or multi-range highlights.

## Event flow

### 1. Open a file

1. The user clicks a file in `Sidebar/FileList.jsx`.
2. `handleFileClick(file)` updates:
   - `activeFile`
   - `language`
   - `codeByFileUid`
3. `MainArea.jsx` re-renders with the new active file.
4. `useSocketFile.js` connects the shared socket if needed.
5. On socket connect, `useSocketFile.js` emits:

```text
open file -> activeFile.uid
```

6. When the server responds with `file loaded`, the hook updates the editor content.

### 2. Realtime content sync

1. The user types in Monaco.
2. `CodeEditor.jsx` calls `onChange(newValue)`.
3. `sendContent(newContent)` in `useSocketFile.js`:
   - updates local React state immediately
   - marks the file as `unsaved`
   - schedules a `saving` status
   - emits:

```text
content -> { uid, content, clientId }
```

4. When the server broadcasts `content`, the hook:
   - ignores messages for other files
   - ignores messages from the same client
   - applies the remote edit to Monaco

### 3. Save status

1. After the server persists content, it emits `content saved`.
2. `useSocketFile.js` checks how recently the local user typed.
3. If the user has typed again very recently, status returns to `unsaved`.
4. Otherwise the status becomes `saved`, then resets to `idle` after a short timeout.

### 4. Active users

1. The server emits `users` for the currently opened file room.
2. `useSocketFile.js` updates `activeUsers`.
3. `EditorToolbar.jsx` renders the user list for that file.

### 5. Realtime cursor positions

1. `useSocketSelection.js` subscribes to Monaco cursor-position changes.
2. On each cursor move it emits:

```text
selection -> { uid, data: { userId, lineNumber, column } }
```

3. When another user's cursor event arrives, the hook forwards it to `MainArea.jsx`.
4. `MainArea.jsx` stores the remote cursor by `userId`.
5. A Monaco decorations collection renders the remote cursor markers in the editor.

## Lifecycle details

- There is one shared Socket.IO client instance for the app.
- Multiple hooks import the same socket instance.
- `useSocketFile.js` currently owns the connect/disconnect lifecycle.
- `useSocketSelection.js` assumes the socket connection already exists through that shared instance.
- When the active file changes, `useSocketFile.js`:
  - emits `close file` for the previous file during cleanup
  - removes all registered listeners
  - clears local timers
  - resets `activeUsers`, `realtimeStatus`, and `saveStatus`
  - disconnects the socket
- The next active file then reconnects and opens its own room.

## Current limitations

- `useSocketSelection.js` tracks cursor position, not full text selection ranges.
- `useSocketFile.js` disconnects the shared socket on every file cleanup instead of keeping one persistent connection across file switches.
- `CodeEditor.jsx` uses Monaco with `defaultValue`, while live updates are driven through imperative edits and per-file state in `MainArea.jsx`.

## Relevant files

- `src/App.jsx`
- `src/components/Sidebar.jsx`
- `src/components/Sidebar/FileList.jsx`
- `src/components/MainArea.jsx`
- `src/components/MainArea/CodeEditor.jsx`
- `src/components/MainArea/EditorToolbar.jsx`
- `src/hooks/useSocketFile.js`
- `src/hooks/useSocketSelection.js`
- `src/services/socketServices.js`
