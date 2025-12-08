import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import SearchPrices from './pages/SearchPrices'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SearchPrices />
  </StrictMode>,
)
