import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";

import {
  
  NewspaperIcon,
  
} from "@heroicons/react/24/solid";

import { BiSolidCategoryAlt } from "react-icons/bi";
import { IoBarChartSharp } from "react-icons/io5";
import { BsDatabaseFillGear } from "react-icons/bs";
import { FaGlobe } from "react-icons/fa6";
import { FaCodeBranch } from "react-icons/fa";
import { Link } from "react-router-dom";

 const categories=[
{
  title: "All Topics: Uncategorized",
  description: "Meet and learn about technology",
  icon: <BiSolidCategoryAlt className='w-8 h-8'/>,
},
{
  title: "Machine Learning",
  description: "Explore where ML meets human",
  icon: <IoBarChartSharp className='w-8 h-8'/>,
},
{
  title: "Data Structures",description: "Store your data perfectly",
  icon: <BsDatabaseFillGear className='w-8 h-8'/>,
},

{
  title: "Web Development",description: "Build a site like ours",
  icon: <FaGlobe className='w-8 h-8'/>,
},
{
  title: "Languages",description: "Choose your favourite language",
  icon: <FaCodeBranch className='w-8 h-8'/>,
},
{
  title: "Algorithms for DS",description: "Play with the structure, not Algos",
  icon: <NewspaperIcon className='w-8 h-8'/>,
}
];

 
export function Category() {
  return (
    <div>
        <div className="mx-auto m-16  sm:mt-20 lg:my-24 " >
          <dl className="grid  grid-cols-1 gap-x-12 gap-y-4  lg:grid-cols-3 lg:gap-y-5 sm:grid-cols-2 ">
            {categories.map((category, key) => (
               <Card className="w-70 lg:w-85 flex ">
                 <div className=" pl-4 pt-4"> {category.icon} </div>
               <CardBody className="flex flex-col justify-center items-between h-full">

                 <Typography variant="h5" color="blue-gray" className="">
                  {category.title}
                  </Typography>
                 <Typography>
                  {category.description}
                 </Typography>
               </CardBody>
               <CardFooter className="pt-0 pb-1 self-center border-t ">
                 <a href="#" className="inline-block">
                  <Link to= {key ? `/resources?category=${category.title}`: "/resources"}>
                   <Button size="sm" variant="text" color="black" className="flex items-center gap-2 ">
                     Explore Now
                    
                   </Button>
                  </Link>
                 </a>
               </CardFooter>
             </Card>
            ))}
          </dl>
        </div>
    </div>
   
  );
}