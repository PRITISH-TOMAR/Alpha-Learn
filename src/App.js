import React from 'react'
import Nav from './Components/Navbar/Navbar'
import Routing from './Components/Routes/Routing'
import { Footer } from './Components/Footer/Footer'
import { Route, BrowserRouter, Routes } from 'react-router-dom'


const App = () => {
  return (
    <div className='bg-black min-h-[100vh]'>
      <BrowserRouter>
      <Nav/>
      <Routing/>'
      <Footer/>

      
      </BrowserRouter>
    
    </div>
  )
}

export default App
