import React from 'react'
import './homePage/index.css'
import App from './homePage/App.jsx'
import {BrowserRouter} from "react-router-dom"
import {createRoot } from "react-dom/client"
import { StrictMode } from 'react'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <App />
    </BrowserRouter>
  </StrictMode>,
)
