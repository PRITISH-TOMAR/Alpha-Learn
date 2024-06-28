import { Route, BrowserRouter, Routes } from 'react-router-dom'
import Home from '../Home/Home'
import Signup from '../Signup/Signup'
import Error from '../Error/Error'
import {Toaster} from 'react-hot-toast'
import DashBoard from '../DashBoard/DashBoard'
import { useSelector } from 'react-redux'


import React from 'react'

const Routing  = () => {
  const { user } = useSelector((state) => state.user);


  return (
    <div>
      <Toaster />
        <Routes>
        <Route path= "/" element={ <Home/>}/>
        <Route path= "/signup" element={ <Signup/>}/>
        <Route path= "/dashboard" element={ user? <DashBoard/> : <Home/>}/>


        <Route path= "*" element={ <Error/>}/>



        </Routes>
      
    </div>
  )
}

export default Routing
