import React, { useState, useEffect } from 'react'
import Nav from './Components/Navbar/Navbar'
import Routing from './Components/Routes/Routing'
import { Footer } from './Components/Footer/Footer'
import { Route, BrowserRouter, Routes } from 'react-router-dom'
import Scroll from './Components/Essantials/ScrollToTop'
import Preloader from './PreLoader'




const App = () => {
  const [loading, setLoading] = useState(true)


  useEffect(() => {

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);

  }, []);


  if (loading)
    return <Preloader />;

  return (
    <div className='bg-black '>
      <BrowserRouter>
        <Scroll />
        <Nav />
        <Routing />
        <Footer />



      </BrowserRouter>

    </div>
  )
}

export default App
