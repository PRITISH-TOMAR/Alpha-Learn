import { ArrowPathIcon, CloudArrowUpIcon, FingerPrintIcon, LockClosedIcon } from '@heroicons/react/24/outline'
import { Button } from '@material-tailwind/react'
import Banner from "../Essantials/banner.mp4"
import CodeBlock from './CodeBlock'
import Highlight from '../Essantials/Highlight'
import { Link } from 'react-router-dom'

const features = [
  {
    name: 'Push to deploy',
    description:
      'Morbi viverra dui mi arcu sed. Tellus semper adipiscing suspendisse semper morbi. Odio urna massa nunc massa.',
    icon: CloudArrowUpIcon,
  },
  {
    name: 'SSL certificates',
    description:
      'Sit quis amet rutrum tellus ullamcorper ultricies libero dolor eget. Sem sodales gravida quam turpis enim lacus amet.',
    icon: LockClosedIcon,
  },
  {
    name: 'Simple queues',
    description:
      'Quisque est vel vulputate cursus. Risus proin diam nunc commodo. Lobortis auctor congue commodo diam neque.',
    icon: ArrowPathIcon,
  },
  {
    name: 'Advanced security',
    description:
      'Arcu egestas dolor vel iaculis in ipsum mauris. Tincidunt mattis aliquet hac quis. Id hac maecenas ac donec pharetra eget.',
    icon: FingerPrintIcon,
  },
]

export default function Home() {
  return (
    <div className="bg-black  max-w-[100vw]  pt-[50px] z-5">
      <div className=" mx-auto max-w-7xl px-6 lg:px-8 flex-col items-center justify-center">
        <div className="mx-auto max-w-6xl lg:text-center">
          <h2 className=" text-2xl font-semibold  text-indigo-400">Learn Faster</h2>
          <p className="mt-2  font-bold  text-gray-300 text-[42px] ">
            Dive into Algorithms and Build the 
            <Highlight text = { "Diamond Structure..."}/>
    

          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600  text-center">
            Quis tellus eget adipiscing convallis sit sit eget aliquet quis. Suspendisse eget egestas a elementum
            pulvinar et feugiat blandit at. In mi viverra elit nunc.
          </p>

          <div >
           {/* //................................................................................ */}

           <CodeBlock
                position={"lg:flex-row"}
                heading={
                    <div className=' font-semibold text-2xl lg:text-4xl sm:w-full'>
                        Unlock Your
                        <Highlight text={"coding potential"}/>
                        with our online courses
                    </div>
                }
                subheading = {
                    "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
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
</html>
`}
                
               
            />
           {/* //................................................................................ */}
        </div>
        <Link to='signup'>
          <Button variant="gradient" size="md" className='my-[40px] '>
            Sign In
          </Button>
        </Link>
        </div>
        <div className=' flex justify-center  '>
        <video className='video w-[90%] border-2 rounded lg:w-[70%]' 
            muted
            loop
            autoPlay
            >

            <source  src={Banner} type="video/mp4" />
            </video>
                </div>
        <div>
            
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                    <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}
