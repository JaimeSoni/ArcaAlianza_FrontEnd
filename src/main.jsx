import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import ProductInterface from './productos'
import App from './App'
import Ventas from './ventas'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Ventas />
  </StrictMode>,
)
