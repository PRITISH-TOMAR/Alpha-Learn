/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
import { CalendarDaysIcon, HandRaisedIcon } from '@heroicons/react/24/outline'
import emailjs from '@emailjs/browser';
import { useRef, useState } from 'react';
import toast from 'react-hot-toast';



export default function Newsletter() {


  const form = useRef();
  const [success, setSuccess] = useState(false)
  const [click, setClick] = useState(false)

  const sendEmail = (e) => {
    e.preventDefault();

    if(success == true) return

    setClick(true)

    // console.log(process.env.REACT_APP_NEWSLETTER_SERVICE_KEY)
    emailjs
      .sendForm(process.env.REACT_APP_NEWSLETTER_SERVICE_KEY, process.env.REACT_APP_NEWSLETTER_TEMPLATE_KEY, form.current, {
        publicKey: process.env.REACT_APP_NEWSLETTER_PUBLIC_KEY,
      })
      .then(
        () => {
          console.log('SUCCESS!');
          setSuccess(true)

          
          
          toast.success( "Thanks for Contacting us. ")
        },
        (error) => {
          setClick(false)
          console.log('FAILED...', error);
        },
      );
  };


  return (
    <div id="news" className="relative isolate overflow-hidden w-full m-0 bg-gray-900 pt-16 sm:py-24 lg:py-32  ">
      <div className="mx-auto max-w-7xl px-6 lg:px-8  px-auto">
        <div className="mx-12 grid max-w-2xl grid-cols-1  gap-y-16 lg:max-w-none lg:grid-cols-2">
          <div className="max-w-xl lg:max-w-lg ">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Subscribe to our newsletter.</h2>
            <p className="mt-4 text-lg leading-8 text-gray-300">
            Your email is safe with us. We'll never share your information.
            </p>
              <form ref={form} onSubmit={sendEmail}>
            <div className="mt-6 flex max-w-md gap-x-4">
                
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                // name="email"
                type="email"
                required
                placeholder="Enter your email"
                autoComplete="email"
                name="user_email"
                disabled={success}
                className="min-w-0 flex-auto rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                />
              <button
                type="submit" disabled={click || success} 
                className="flex-none rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                >
                {!success ?
                "Subscribe" : "Subscribed"}
              </button>
            </div>
                </form>
          </div>
          <dl className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:pt-2">
            <div className="flex flex-col items-start">
              <div className="rounded-md bg-white/5 p-2 ring-1 ring-white/10">
                <CalendarDaysIcon aria-hidden="true" className="h-6 w-6 text-white" />
              </div>
              <dt className="mt-4 font-semibold text-white">Weekly articles</dt>
              <dd className="mt-2 leading-7 text-gray-400">
              Get exclusive articles, tips, and insights from industry experts every week.
              </dd>
            </div>
            <div className="flex flex-col items-start">
              <div className="rounded-md bg-white/5 p-2 ring-1 ring-white/10">
                <HandRaisedIcon aria-hidden="true" className="h-6 w-6 text-white" />
              </div>
              <dt className="mt-4 font-semibold text-white">No spam</dt>
              <dd className="mt-2 leading-7 text-gray-400">
              We value your privacy. You'll only receive content you care about, without any spam.
              </dd>
            </div>
          </dl>
        </div>
      </div>
      <div aria-hidden="true" className="absolute left-1/2 top-0 -z-10 -translate-x-1/2 blur-3xl xl:-top-6">
        <div
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
          className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
        />
      </div>
    </div>
  )
}
