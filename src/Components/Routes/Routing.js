import { Route, BrowserRouter, Routes } from 'react-router-dom'
import Home from '../Home/Home'


import React from 'react'

const Routing  = () => {
  return (
    <div>
        <Routes>
        <Route path= "/" element={ <Home/>}/>

        </Routes>
      
    </div>
  )
}

export default Routing
