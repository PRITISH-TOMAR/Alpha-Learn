import React from 'react'
import Nav from './Components/Navbar/Navbar'
import Routing from './Components/Routes/Routing'
import { Footer } from './Components/Footer/Footer'
import { Route, BrowserRouter, Routes } from 'react-router-dom'
import Divider from '@mui/material/Divider';



const App = () => {
  return (
    <div className='bg-black '>
      <BrowserRouter>
      <Nav/>
      <Routing/>
    <Footer />
      

      
      </BrowserRouter>
    
    </div>
  )
}

export default App
