import React from 'react'
import Nav from './Components/Navbar/Navbar'
import Routing from './Components/Routes/Routing'
import { Footer } from './Components/Footer/Footer'
import { Route, BrowserRouter, Routes } from 'react-router-dom'
import Divider from '@mui/material/Divider';
import Scroll from './Components/Essantials/ScrollToTop'



const App = () => {
  return (
    <div className='bg-black '>
      <BrowserRouter>
      <Scroll/>
      <Nav/>
      <Routing/>
    <Footer />
      

      
      </BrowserRouter>
    
    </div>
  )
}

export default App
