import {React, useState, useEffect} from 'react'
import { Button } from '@material-tailwind/react'
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
const MyArticles = () => {



  
  return (
    <div className="md:w-[60vw]  min-w-[85vw] bg-black rounded-lg shadow-lg p-6 flex flex-col items-center border-2 text-white">      
    <p>My Articles.. </p>
    <Link to ="/dashboard?tab=create">
    <Button variant="gradient" size="md" >
                      Write New
                    </Button>
    </Link>


    </div>
  )
}

export default MyArticles
