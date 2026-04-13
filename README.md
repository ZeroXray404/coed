# Short description about the project

In the project we develop a web-based code editor that updates in real-time. This means several developers can edit the code simultaneously. The application is user friendly, responsive and robust.

## Instructions on how to run the application locally

### Installation

To install the application clone the repository.

`git clone git@github.com:Zebwul/coed-grupp-12.git`<br>`cd coed-grupp-12`

### Use correct Node version

`nvm use`

**If you don’t have nvm installed:**
https://github.com/nvm-sh/nvm

### Install dependencies

`npm ci` (preffered; exact copy of dev-environment)
or
`npm install`

### Run server

`npm run dev`

### Run Eslint

`npm run lint`

### Run Prettier

`npm run format`<br>
`npm run format:check`

## Tech stack

- [React](https://react.dev/)
- [Vite](https://vite.dev/)
- [Monaco-Editor](https://microsoft.github.io/monaco-editor/)
- [SCSS](https://sass-lang.com/install/)
- [socket.io-client](https://socket.io/docs/v4/client-api/)
- [Prettier](https://prettier.io/)
- [Eslint](https://eslint.org/)
- [Lucide](https://lucide.dev)

### GitHub Pages

The project is deployed via GitHub Pages:
https://zebwul.github.io/coed-grupp-12/

<!-- ### React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

### React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

### Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project. -->
