import { Route, BrowserRouter, Routes, Navigate } from 'react-router-dom'
import Home from '../Home/Home'
import Signup from '../Signup/Signup'
import Error from '../Error/Error'
import Contact from '../Contact/Contact'
import {Toaster} from 'react-hot-toast'
import DashBoard from '../DashBoard/DashBoard'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'


import React from 'react'

const Routing  = () => {
  const { user } = useSelector((state) => state.user);
  // const navigate = useNavigate()


  return (
    <div>
      <Toaster />
        <Routes>
        <Route path= "/" element={ <Home />}/>
        <Route path= "/contact" element={ <Contact/>}/>
        <Route path= "/signup" element={ <Signup/>}/>
        <Route path= "/dashboard" element={ user? <DashBoard/> : <Navigate to ="/" />  }/>


        <Route path= "*" element={ <Error/>}/>



        </Routes>
      
    </div>
  )
}

export default Routing
