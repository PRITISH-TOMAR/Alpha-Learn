import React from 'react'
import {  Select, TextInput } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

import { TypeAnimation } from 'react-type-animation';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Tooltip,
  IconButton,
} from "@material-tailwind/react";

import Highlight from '../Essantials/Highlight';
import { FaHeart } from 'react-icons/fa';

const truncateContent = (htmlString, wordLimit) => {
  const div = document.createElement('div');
  div.innerHTML = htmlString;
  const text = div.textContent || div.innerText || '';
  const words = text.slice(0, wordLimit);
  return words+ (text.length> wordLimit ?".":"");
};


function DateForm(dateString) {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}

const ResCard = ({result, showMore, handleShowMore}) => {
          

  
    
      const navigate = useNavigate();



        
  return (
   

  
<div className="mx-auto flex flex-col items-center justify-center   mt-4  sm:mt-20 lg:my-4 w-full  min-h-screen ">
 

<h2 className="hidden font-bold tracking-tight text-center text-gray-200 mt-5 mb-8 lg:block text-[40px] ">
            <TypeAnimation
            sequence={["  Dive into the resources!",5000]}
            repeat={1}
             style={{
              // color: "#fff",
              // fontSize: "10px",

              }}
            cursor={true}
            wrapper="span"
            omitDeletionAnimation={true}
           />
            </h2>

          <dl className="grid lg:flex justify-start  place-items-center flex-wrap  grid-cols-1 gap-x-4  gap-y-4  md:grid-cols-2 p-3 z-2 ">
            {result.map((res, key) => (
                <Card className="w-full sm:max-w-[450px] lg:min-w-[300px] md:w-[40vw] lg:min-w-[310px] lg:mx-0 mx-auto lg:w-[24.5vw] border-2 border-[#a7f3f3] transition-transform duration-200 ease-in-out hover:scale-[1.02] hover:bg-gray-100 relative z-22 bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 ">
                <CardHeader floated={false} color="blue-gray">
                  <img className='h-[150px] max-h-[200px] min-h-[150px] min-w-full border'
                        src = { res.image}
                    alt="Load..."
                  />
                  <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60 " />




                 
                </CardHeader>
                <CardBody>
                  <div className="mb-3 flex items-center justify-between">
                    <Typography variant="h6" color="blue-gray" className="font-[400]">
                     { truncateContent(res.art_name, 22) }
                    </Typography>
                    <Typography
                      color="blue-gray"
                      className="flex items-center gap-1.5 font-normal"
                    >
                     
                     { res.numberOfLikes} <FaHeart className='text-red-500'/>
                    </Typography>
                  </div>
                  {/* <Typography color="gray"
                   dangerouslySetInnerHTML={{ __html: truncateContent(res.artName, 20)}} >
                   
                   </Typography> */}
                  <div className="group w-full inline-flex flex-wrap items-center justify-between gap-3">
                   <Button className='bg-gray-600 font-normal lowercase' color='black'  pill size='sm'>
           # { res.category.toLowerCase()}
           </Button>
                   <span className=' font-normal lowercase' color='black' >
                   {DateForm(new Date(res.createdAt).toLocaleDateString())}
                   </span>
                  
                   
                   
                    
                
                  </div>
                </CardBody>
                <CardFooter className="pt-3">
                    <Link to ={`/article?unique=${res.artId}`}>
                  <Button size="md" fullWidth={true}>
                    Explore Now
                  </Button>
                    </Link>
                </CardFooter>
              </Card>
            ))}
          </dl>

          {showMore && (
          <button onClick={handleShowMore} className='w-full text-teal-500 self-center text-sm py-7'>
            Show more
          </button>
        )}
        </div>
   
   
  
  )
}

export default ResCard
