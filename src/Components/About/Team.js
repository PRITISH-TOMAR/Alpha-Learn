import { Link } from "react-router-dom";
import { MdEmail, MdWallet } from "react-icons/md";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import Team1 from "../Essantials/Images/Team1.jpg"
import Team2 from "../Essantials/Images/Team2.jpg"

const people = [
  {
    name: 'PZ_Alpha',
    role: 'Co-Founder / CEO',
    imageUrl:
      Team2,
    Linkedin: "https://www.linkedin.com",
    Email: "demoapi1.0@gmail.com",
    Instagram: "https://www.instagram.com",
  },
  {
    name: 'Pritish Tomar',
    role: 'MERN Developer',
    imageUrl: Team1,

    Linkedin: "https://www.linkedin.com/in/pritish-tomar",
    Email: "demoapi1.0@gmail.com",
    Instagram: "https://www.instagram.com",
  },
  {
    name: 'Deedy Algok',
    role: 'UI/UX Designer',
    imageUrl:
      Team2,
    Linkedin: "https://www.linkedin.com",
    Email: "demoapi1.0@gmail.com",
    Instagram: "https://www.instagram.com",
  },
  {
    name: 'Jack Census',
    role: 'Data Engineer',
    imageUrl:
      Team2,
    Linkedin: "https://www.linkedin.com",
    Email: "demoapi1.0@gmail.com",
    Instagram: "https://www.instagram.com",
  },
  {
    name: 'Smack Powqeh',
    role: 'CLead Programmer',
    imageUrl:
      Team2,
    Linkedin: "https://www.linkedin.com",
    Email: "demoapi1.0@gmail.com",
    Instagram: "https://www.instagram.com",
  },
  {
    name: 'Beta Tester',
    role: 'Structural Engineer',
    imageUrl:
      Team2,
    Linkedin: "https://www.linkedin.com",
    Email: "demoapi1.0@gmail.com",
    Instagram: "https://www.instagram.com",
  },

  // More people...
]

export default function Team() {
  return (
    <div id="team" className=" py-24 sm:py-32 bg- text-white">
      <div className="mx-auto flex max-w-6xl w-full flex-col gap-x-8 gap-y-20 px-6 lg:px-8 items-center ">
        <div className="max-w-2xl">
          <h1 className="lg:text-5xl text-4xl text-center font-bold tracking-tight text-gray-100  ">Meet Our Team </h1>
          <p className="mt-6 text-lg leading-8 text-center text-gray-400">
            Here, we feel proud and happy to introduce our dedicated and hardworking leads. Do visit their profiles.
          </p>
        </div>

        <ul role="list" className="grid  lg:grid-cols-3  w-full gap-12 md:grid-cols-2 md:max-w-5xl sm:grid-cols-1 sm:gap-y-16 p-4 sm:mx-auto ">
          {people.map((person) => (
            <div class=" flex flex-col mx-auto items-center text-gray-700 bg-white shadow-md bg-clip- rounded-xl max-w-70 overflow-hidden ">
              <div class=" mx-4 mt-4 overflow-hidden  text-gray-700 bg-white shadow-lg bg-clip- rounded-xl h-60 lg:max-w-[20vw]">
                <img src={person.imageUrl} className="object-contain" alt="profile-picture" />
              </div>
              <div class="p-6 text-center">
                <h4 class="block mb-2 font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                  {person.name}
                </h4>
                <p
                  class="block font-sans text-base antialiased font-medium leading-relaxed text-transparent bg-clip-text bg-gradient-to-tr from-blue-gray-600 to-blue-gray-400">
                  {/* CEO / Co-Founder */}
                  {person.role}
                </p>
              </div>
              <div class="flex justify-center p-6 pt-2 gap-7">
                <Link to={person.Email}>
                  <MdEmail size={22} />
                </Link>
                <Link to={person.Instagram}>
                  <FaInstagram size={22} />
                </Link>
                <Link to={person.Linkedin}>
                  <FaLinkedin size={22} />
                </Link>

              </div>
            </div>
          ))}
        </ul>
      </div>
    </div>
  )
}
