import { ArrowPathIcon, CloudArrowUpIcon, FingerPrintIcon, LockClosedIcon } from '@heroicons/react/24/outline'
import { Button } from '@material-tailwind/react'
import Banner from "../Essantials/banner.mp4"
import CodeBlock from './CodeBlock'
import Highlight from '../Essantials/Highlight'
import { Link } from 'react-router-dom'
import RandomCard from '../ArticleTemplate/RandomCard'
import { Category } from '../Essantials/Category'
import { useSelector } from 'react-redux'
import Timeline from '../Essantials/Timeline'
import { TypeAnimation } from 'react-type-animation'
import Newsletter from '../Essantials/Newsletter'
import Faq from '../Essantials/FAQ'

export default function Home() {
  const user = useSelector((store) => store.user.user)

  return (
    <div className="bg-black  max-w-[100vw]  pt-[50px] z-5 select-none">
      <div className=" mx-auto max-w-7xl px-6 lg:px-8 flex-col items-center justify-center text-center">
        <div className="mx-auto max-w-6xl lg:text-center">
          <h2 className=" text-2xl font-semibold  text-indigo-400">Learn Faster</h2>
          <p className="mt-2  font-bold  text-gray-300  md:text-[42px] ">
            

          <TypeAnimation
            sequence={["  Dive into Advanced Algorithms and Build the ", 2000, ""]}
            repeat={Infinity}

            cursor={true}
           className='font-semibold text-2xl lg:text-4xl'
            style = {
                {
                    whiteSpace: "pre-line",
                    display:"block",
                    overflowX:"hidden",
                    
                }
            }
            omitDeletionAnimation={true}
           />
          </p>
          <p className='font-semibold text-2xl lg:text-4xl'>
            
            <Highlight text = { "Mind Web..."}/>
          </p>
    

          <p className="mt-6 text-lg leading-8 text-gray-500  text-center">
          Explore our courses and discover the path to your success. Whether you're a beginner looking to start your coding journey or an experienced developer seeking to expand your skills.
          </p>
            
          <div >
           {/* //................................................................................ */}

           <CodeBlock
                position={"md:flex-row "}
                heading={
                    <div className=' font-semibold text-2xl lg:text-4xl sm:w-full'>
                        Unlock Your 
                        <Highlight text={"coding potential "}/> 
                        with our endless articles.
                    </div>
                    
                }
                subheading = { <>
                <p className='text-lg'>

                    "Our comprehensions are designed and reviwed by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
                </p>
                { !user._id  && 
                <Link to='signup'>
          <Button variant="gradient" size="lg" className='my-[40px] w-full sm:w-[60%] '>
            Sign In
          </Button>
        </Link>
                }
                </>
                }
              

                codeblock={`<!DOCTYPE html>
<html>
<head>
<title>ALPHA_LEARN</title>
</head>
<body>
    <h1>Empower Your Future</h1>
    <p>Dedicate yourself to your passion!</p>
    <p>Happy Coding, Love Logic!</p>
</body>
</html>`}
                
               
            />
           {/* //................................................................................ */}
                   
        </div>
       
        </div>
        <div className=' flex justify-center mt-12 '>
        <video  className='video w-full border-2 rounded lg:w-[75%] select-none mb-[80px] lg:mb-[130px] -z-2' 
            muted
            loop
            autoPlay
            >

            <source  src={Banner} type="video/mp4" />
            </video>
                </div>

                <div className='w-full  flex justify-center lg:h-[600px] lg:min-h-[600px] lg:max-h-[600px]'>

<RandomCard home={true} />
         </div>


              
       
      
      <Category />
      </div>
      <Faq/>
                <Timeline/>
      <Newsletter/>
    </div>
  )
}
