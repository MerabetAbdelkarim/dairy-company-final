import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { Mycontextprovider } from './ctxapi/Mycontext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <Mycontextprovider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Mycontextprovider>
  </React.StrictMode>,
)
