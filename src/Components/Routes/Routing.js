import { Route, BrowserRouter, Routes } from 'react-router-dom'
import Home from '../Home/Home'
import Signup from '../Signup/Signup'
import Error from '../Error/Error'


import React from 'react'

const Routing  = () => {
  return (
    <div>
        <Routes>
        <Route path= "/" element={ <Home/>}/>
        <Route path= "/signup" element={ <Signup/>}/>


        <Route path= "*" element={ <Error/>}/>



        </Routes>
      
    </div>
  )
}

export default Routing
