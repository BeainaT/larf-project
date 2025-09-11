# Registration & Login Card Demo

**EN**: A quick UI/UX demo of a registration and login card for a hypothetical app. Built with **React + TypeScript + CSS and Vite**, focused on design and interactivity.

**IT**: Una demo veloce di UI/UX per una card di registrazione e login per un’ipotetica app. Realizzata con **React + TypeScript + CSS e Vite**, con focus su design e interattività.

## Features / Funzionalità

**EN**: Login and registration card (UI only, no data saved). Responsive design with simple animations

**IT**: Card di login e registrazione (solo UI, i dati non vengono salvati). Design responsive con animazioni semplici

## Run / Avvio

`npm install`

`npm run dev`

**EN**: Open http://localhost:5173 in your browser to try the demo

**IT**: Apri http://localhost:5173 nel browser per provare la demo

## Purpose / Scopo

**EN**: Portfolio-ready UI demo to showcase an elegant and functional login card

**IT**: Demo UI pronta per il portfolio per mostrare una card di login elegante e funzionale

## React + Vite setup

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```
>>>>>>> b7768cf (init project setup)
