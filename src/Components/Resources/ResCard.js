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

const truncateContent = (htmlString, wordLimit) => {
  const div = document.createElement('div');
  div.innerHTML = htmlString;
  const text = div.textContent || div.innerText || '';
  const words = text.slice(0, wordLimit);
  return words+ (text.length> wordLimit ?".":"");
};


const ResCard = ({result, showMore, handleShowMore}) => {

  
    
      const navigate = useNavigate();



        
  return (
   
<div className="mx-auto flex flex-col items-center  mt-4  sm:mt-20 lg:my-4 w-full  min-h-screen ">
  {/* <div className='lg:text-[40px] text-[30px] mb-6 hidden lg:block'>
    
  <Highlight text = { "Dive into our Resources!"} ></Highlight>
  </div> */}

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

          <dl className="grid  grid-cols-1 gap-x-4 gap-y-4  lg:grid-cols-3 lg:gap-y-5 m-3 ">
            {result.map((res, key) => (
                <Card className="w-full lg:w-[25vw] border-2 border-[#a7f3f3] transition-transform duration-200 ease-in-out hover:scale-105 hover:bg-gray-100  bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 ">
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
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="-mt-0.5 h-5 w-5 text-yellow-700"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                          clipRule="evenodd"
                        />
                      </svg>
                     { res.likes} Likes
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
                   {new Date(res.createdAt).toLocaleDateString()}
                   </span>
                  
                   
                   
                    
                
                  </div>
                </CardBody>
                <CardFooter className="pt-3">
                    <Link to ={`/article?unique=${res.artId}`}>
                  <Button size="lg" fullWidth={true}>
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
