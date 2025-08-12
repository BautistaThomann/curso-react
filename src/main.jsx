import { BrowserRouter } from "react-router-dom";
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App.jsx'
import { CustomCarritoProvider } from './providers/CarritoProvider.jsx';
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      {/* envuelvo a la aplicacion con el componente CustomCarritoProvider */}
      <CustomCarritoProvider>
        <App />
      </CustomCarritoProvider>
    </BrowserRouter>
  </StrictMode>,
)
