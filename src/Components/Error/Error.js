import noimg from "../Essantials/Images/notFound.png"
import { Link } from "react-router-dom"
export default function Error() {
  return (
    <>

      <main className="flex justify-center bg-black min-h-fit py-4 items-center flex-col ">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-100 sm:text-5xl">Page not found</h1>


          <img src={noimg} className="invert" alt="" />
          <Link to="/"
            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mb-4"
          >
            Go back home
          </Link>

        </div>
      </main>
    </>
  )
}
