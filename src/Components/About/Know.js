import { TypeAnimation } from "react-type-animation"
import Highlight from "../Essantials/Highlight"
import AnchorLink from "react-anchor-link-smooth-scroll"
const links = [
  { name: 'Our Vision', href: '#vision' },
  { name: 'Our Mission', href: '#mission' },
  { name: 'Our values', href: '#values' },
  { name: 'Meet our leadership', href: '#team' },
]
const stats = [
  { name: 'Offices worldwide', value: '12' },
  { name: 'Full-time colleagues', value: '300+' },
  { name: 'Hours per week', value: '40' },
  { name: 'Paid time off', value: 'Unlimited' },
]


export default function Know() {
  return (
    <div className="max-w-[100vw]   bg-gray-900 py-12 sm:py-8 bg-about-bg bg-cover object-right md:object-center ">
      {/* <img
          alt=""
          src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&crop=focalpoint&fp-y=.8&w=2830&h=1500&q=80&blend=111827&sat=-100&exp=15&blend-mode=multiply"
          className="absolute inset-0 -z-10 h-full w-full object-cover object-right md:object-center"
        /> */}
      <div
        aria-hidden="true"
        className="hidden sm:absolute sm:-top-10 sm:right-1/2 sm:-z-10 sm:mr-10 sm:block sm:transform-gpu sm:blur-3xl"
      >
        <div
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
          className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20"
        />
      </div>

      <div className="mx-auto max-w-7xl flex flex-col justify-center items-center px-6 lg:px-8 mt-6">
        <div className="mx-auto max-w-4xl lg:mx-0">


          <h2 className="text-[30px] font-bold tracking-tight text-center text-gray-200 mt-5 mb-8 lg:text-[50px] ">
            <TypeAnimation
              sequence={["  Want to Know about us? ", 2000, ""]}
              repeat={Infinity}
              style={{
                // color: "#fff",
                // fontSize: "10px",

              }}
              cursor={true}
              wrapper="span"
              omitDeletionAnimation={true}
            />
          </h2>
          <p className="my-6 text-2xl leading-8 text-gray-300">
            < Highlight text={"Alpha_Learn"} /> empowers coding enthusiasts with top-notch tutorials and insightful articles. We make complex concepts accessible, fostering a vibrant community of learners driven by innovation and continuous skill enhancement.
          </p>

          <p className="my-6 text-2xl leading-8 text-gray-300">
            We at < Highlight text={"Alpha_Learn"} /> promise to deliver the best of the Tech-Creations. The only we expect from our users is their beloved and forever support.We wish our developers and programmers a good coding journey ahead.
          </p>
        </div>
        <div className="mx-auto mt-10 lg:min-w-4xl lg:max-w-4xl w-full ">
          <div className="grid grid-cols-1 w-full  mx-auto gap-y-6 text-base font-semibold leading-7 text-white sm:grid-cols-2 md:flex  ">
            {links.map((link) => (
              <div className="mx-auto lg:w-[25%]  text-center">

                <AnchorLink key={link.name} href={link.href}>
                  {link.name} <span aria-hidden="true">&rarr;</span>
                </AnchorLink>
              </div>
            ))}
          </div>
          <dl className="grid grid-cols-1  mx-auto gap-y-6 text-base font-semibold leading-7 text-white sm:grid-cols-2 md:flex   mt-8 text-center">
            {stats.map((stat) => (
              <div key={stat.name} className="flex  mx-auto lg:w-[25%] flex-col-reverse ">
                <dt className="text-base leading-7 text-gray-300">{stat.name}</dt>
                <dd className="text-2xl font-bold leading-9 tracking-tight text-white">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}
