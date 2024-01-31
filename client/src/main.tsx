import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { Store } from './app/Store.ts'
import { Provider } from 'react-redux'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={Store}>
      <App />
    </Provider>
  </React.StrictMode>,
)
