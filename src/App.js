import React from 'react'
import Navbar from './Components/Navbar/Navbar'
import Routing from './Components/Routes/Routing'
import { Route, BrowserRouter, Routes } from 'react-router-dom'

const App = () => {
  return (
    <div>
      <BrowserRouter>
      <Navbar/>
      <Routing/>

      
      </BrowserRouter>
    
    </div>
  )
}

export default App
