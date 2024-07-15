import TL1 from "./Images/TL1.svg"
import TL2 from "./Images/TL2.svg"
import TL3 from "./Images/TL3.svg"
import TL4 from "./Images/TL4.svg"
import TL5 from "./Images/TL5.svg"
export default function TimeLine() {
  
  return (
    <div className="bg-transparent pb-[60px] select-none">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h2 className="text-center text-lg font-semibold leading-8 text-gray-400">
          Trusted by the India's most innovative teams
        </h2>
        <div className="mx-auto mt-10 grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5">
          <img
            alt="Transistor"
            src={TL1}
            width={158}
            height={48}
            className="col-span-2 max-h-12 w-full object-contain lg:col-span-1 invert-image scale-[1.2]"
          />
          <img
            alt="Reform"
            src={TL2}
           width={158}
            height={48}
            className="col-span-2 max-h-12 w-full object-contain lg:col-span-1 invert-image scale-[1.2]"
          />
          <img
            alt="Tuple"
            src={TL3}
            width={158}
            height={48}
            className="col-span-2 max-h-12 w-full object-contain lg:col-span-1 invert-image scale-[1.2]"
          />
          <img
            alt="SavvyCal"
            src={TL4}
            width={158}
            height={48}
            className="col-span-2 max-h-12 w-full object-contain sm:col-start-2 lg:col-span-1 invert-image scale-[1.2]"
          />
          <img
            alt="Statamic"
            src={TL5}
            width={158}
            height={48}
            className="col-span-2 col-start-2 max-h-12 w-full object-contain sm:col-start-auto lg:col-span-1 invert-image scale-[1.2]"
          />
        </div>
      </div>
    </div>
  )
}
