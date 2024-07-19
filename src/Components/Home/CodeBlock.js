import React from 'react'
import {FaArrowRight} from "react-icons/fa"
import { TypeAnimation } from 'react-type-animation'

const CodeBlocks = ({
    position, heading, subheading, codeblock
}) => {
  return (
    <div className={`flex ${position}  my-20 items-center  justify-between gap-0 md:gap-10 flex-wrap text-gray-400 `}>
      
    {/*Section 1*/}
    <div className=' flex flex-col gap-8 md:w-[50%]  items-center justify-center '>
        {heading}
        <div className='text-richblack-300 text-center font-bold text-sm md:px-4 p-2 md:text-lg'>
            {subheading}
        </div>

      
    </div>

     {/*Section 2*/}
     <div className=' h-fit  flex flex-row text-10[px] w-[100%] py-3 md:w-[300px] lg:w-[400px] glass  bg-gradient-to-r from-black via-gray-900  to-black border-2 rounded-[20px]'> 
        {/*HW -> BG gradient*/}

        <div className='text-center flex flex-col w-[10%] text-richblack-400 font-inter font-bold
        '>
            <p>1</p>
            <p>2</p>
            <p>3</p>
            <p>4</p>
            <p>5</p>
            <p>6</p>
            <p>7</p>
            <p>8</p>
            <p>9</p>
            <p>10</p>
            <p>11</p>
          
        </div>

        <div className={`w-[90%] flex flex-col gap-2 font-bold font-mono white pr-2 relative bottom-2 
            `}>
            <div className=""></div>
           <TypeAnimation
            sequence={[codeblock, 2000, ""]}
            repeat={Infinity}
            cursor={true}
           
            style = {
                {
                    whiteSpace: "pre-line",
                    display:"block",
                    overflowX:"hidden",
                    fontSize:"16px",
                    color:'white'
                }
            }
            omitDeletionAnimation={true}
           />
        </div>

     </div>



    </div>
    
  )
}

export default CodeBlocks