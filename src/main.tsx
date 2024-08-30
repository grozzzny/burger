import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './fonts/fonts.css'
import { Provider } from 'react-redux'
import { store } from '@/services/store'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <DndProvider backend={HTML5Backend}>
          <App />
        </DndProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
)
