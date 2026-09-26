import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import ShopContextProvider from './Context/ShopContext.jsx'
import DataContextProvider from './Context/DataContext.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
   <DataContextProvider>
    <ShopContextProvider>
        <App />
    </ShopContextProvider>
     </DataContextProvider>
  </BrowserRouter>
)
