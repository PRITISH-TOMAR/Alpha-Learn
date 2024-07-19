import { CloudArrowUpIcon, LockClosedIcon, ServerIcon } from '@heroicons/react/20/solid'
import Highlight from '../Essantials/Highlight'
import Miss from "../Essantials/Images/About/Miss.jpg"

export default function Mission() {
  return (
    <div id="mission" className="relative isolate overflow-hidden bg-white px-6 py-24 sm:py-32 lg:overflow-visible lg:px-0">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <svg
          aria-hidden="true"
          className="absolute rounded left-[max(50%,25rem)] top-0 h-[64rem] w-[128rem] -translate-x-1/2 stroke-gray-200 [mask-image:radial-gradient(64rem_64rem_at_top,white,transparent)]"
        >
          <defs>
            <pattern
              x="50%"
              y={-1}
              id="e813992c-7d03-4cc4-a2bd-151760b470a0"
              width={200}
              height={200}
              patternUnits="userSpaceOnUse"
            >
              <path d="M100 200V.5M.5 .5H200" fill="none" />
            </pattern>
          </defs>
          <svg x="50%" y={-1} className="overflow-visible fill-gray-50">
            <path
              d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z"
              strokeWidth={0}
            />
          </svg>
          <rect fill="url(#e813992c-7d03-4cc4-a2bd-151760b470a0)" width="100%" height="100%" strokeWidth={0} />
        </svg>
      </div>
      <div className="mx-auto grid  grid-cols-1 gap-x-8 gap-y-16 lg:mx-0  lg:grid-cols-2 lg:items-start lg:gap-y-10 ">

        <div className="lg:col-span-2 lg:col-start-2 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-4xl lg:grid-cols-2 lg:gap-x-8 lg:px-[60px]  ">
          <div className=" w-[300px]">
            <div className=" ">
              <p className="text-base font-semibold leading-7 text-indigo-600">Entire in Alone</p>
              <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Entire in Alone</h1>
              <p className="mt-6 text-xl leading-8 text-gray-700">
                OUR MISSION
              </p>
            </div>
          </div>
        </div>
        <div className="-ml-12 -mt-12 p-12 lg:sticky lg:top-4 lg:col-start-1 lg:row-span-2 lg:row-start-1 lg:overflow-hidden">
          <img
            alt=""
            src={Miss}
            className="w-[48rem]  h-full object-center max-w-none rounded-xl bg-gray-900 shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem]"
          />
        </div>
        <div className="lg:col-span-2 lg:col-start-2 lg:row-start-2 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8 text-center ">
          <div className="lg:pr-4 ">
            <div className="max-w-xl lg:ml-12 text-left text-base leading-7 text-gray-700 lg:max-w-3xl  lg:w-[40vw]">
              <p>

                At  < Highlight text={"Alpha_Learn"} />, our goal is to empower learners through an integrated platform that includes expertly curated articles, a robust coding IDE, and dynamic coding profiles.We strive to make programming knowledge accessible to all by offering engaging articles tailored for learners at every level. Our advanced IDE enhances learning and coding experiences with features designed for efficiency and creativity. Through personalized coding profiles, users can track progress, showcase projects, and connect with a global community of developers. Alphaleran is dedicated to creating a supportive environment where curiosity flourishes, skills are honed, and innovation thrives.
              </p>
              <ul role="list" className="mt-8 space-y-8 text-gray-600">
                <li className="flex gap-x-3">
                  <CloudArrowUpIcon aria-hidden="true" className="mt-1 h-5 w-5 flex-none text-indigo-600" />
                  <span>
                    <strong className="font-semibold text-gray-900">Comprehensive Learning Platform:</strong>  Offer a unified platform combining insightful articles, a powerful coding IDE, and customizable coding profiles to cater to diverse learning needs.












                  </span>
                </li>
                <li className="flex gap-x-3">
                  <LockClosedIcon aria-hidden="true" className="mt-1 h-5 w-5 flex-none text-indigo-600" />
                  <span>
                    <strong className="font-semibold text-gray-900">Empowerment Through Technology: </strong>
                    Foster a global community where users can track their progress, showcase their work, and collaborate with like-minded individuals, inspiring continuous learning and innovation.
                  </span>
                </li>
                <li className="flex gap-x-3">
                  <ServerIcon aria-hidden="true" className="mt-1 h-5 w-5 flex-none text-indigo-600" />
                  <span>
                    <strong className="font-semibold text-gray-900">Community and Collaboration:</strong> Commit to excellence in education by ensuring every user has the tools, support, and inspiration needed to succeed in the rapidly evolving tech landscape.
                  </span>
                </li>
              </ul>

            </div>
          </div>
        </div>
      </div>


    </div>
  )
}
