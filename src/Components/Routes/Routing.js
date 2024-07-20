import { Route, BrowserRouter, Routes, Navigate } from 'react-router-dom'
import Home from '../Home/Home'
import Signup from '../Signup/Signup'
import Error from '../Error/Error'
import Contact from '../Contact/Contact'
import {Toaster} from 'react-hot-toast'
import DashBoard from '../DashBoard/DashBoard'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import ArticleTemplate from '../ArticleTemplate/ArticleTemplate'


import React from 'react'
import Resources from '../Resources/Resources'
import About from '../About/About'

const Routing  = () => {
  const  user  = useSelector((state) => state.user.user);
  // const navigate = useNavigate()


  return (
    <div>
      <Toaster />
        <Routes>
        <Route path= "/" element={ <Home />}/>
        <Route path= "/contact" element={ <Contact/>}/>
        <Route path= "/signup" element={ <Signup/>}/>
        <Route path= "/dashboard" element={ user && user._id? <DashBoard/> : <Navigate to ="/" />  }/>
        {/* <Route path= "/dashboard" element={  <DashBoard/> }/> */}
        <Route path= "/article" element={ <ArticleTemplate/> }/>

        <Route path= "/resources" element={ <Resources/> }/>
        <Route path= "/about" element={ <About/> }/>

        <Route path= "*" element={ <Error/>}/>



        </Routes>
      
    </div>
  )
}

export default Routing
