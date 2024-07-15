import React from "react";
import { Link } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import Profile from "./Profile";

/////////////////////////////////////////////
import { useSelector } from 'react-redux'
import { setUser, setLoading } from '../Redux/UserSlice';

import { useDispatch } from 'react-redux';
////////////////////////////////////////

import {
  Navbar,
  Collapse,
  Typography,
  Button,
  IconButton,
  List,
  ListItem,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Input
} from "@material-tailwind/react";
import {
  ChevronDownIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  Bars4Icon,
  GlobeAmericasIcon,
  NewspaperIcon,
  PhoneIcon,
  RectangleGroupIcon,
  SquaresPlusIcon,
  SunIcon,
  TagIcon,
  UserGroupIcon,
} from "@heroicons/react/24/solid";
import { Person } from "@mui/icons-material";
import { useLocation } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

const navListMenuItems = [
 
  {
    title: "All Topics: Uncategorized",
    description: "Meet and learn about technology",
    icon: UserGroupIcon,
  },
  {
    title: "Machine Learning",
    description: "Explore where ML meets human",
    icon: UserGroupIcon,
  },
  {
    title: "Data Strucures",description: "Store your data perfectly",
    icon: Bars4Icon,
  },

  {
    title: "Web Development",description: "Build a site like ours",
    icon: GlobeAmericasIcon,
  },
  {
    title: "Languages",description: "Choose your favourite language",
    icon: PhoneIcon,
  },
  {
    title: "Algorithms for DS",description: "Play with the structure, not Algos",
    icon: NewspaperIcon,
  }
];

function NavListMenu() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const renderItems = navListMenuItems.map(
    ({ icon, title, description }, key) => (
     
      <Link to= { key!=0 ?`/resources?category=${title}`  : "/resources"} key={key}>
         
        <MenuItem className="flex items-center gap-3 rounded-lg">
          <div className="flex items-center justify-center rounded-lg !bg-blue-gray-50 p-2 ">
            {" "}
            {React.createElement(icon, {
              strokeWidth: 2,
              className: "h-6 text-gray-900 w-6",
            })}
          </div>
          <div>
            <Typography
              variant="h6"
              color="blue-gray"
              className="flex items-center text-sm font-bold"
            >
              {title}
            </Typography>
            <Typography
              variant="paragraph"
              className="text-xs !font-medium text-blue-gray-500"
            >
              {description}
            </Typography>
          </div>
        </MenuItem>
      </Link>
    ),
  );

  return (
    <React.Fragment>
      <Menu
        open={isMenuOpen}
        handler={setIsMenuOpen}
        offset={{ mainAxis: 20 }}
        placement="bottom"
        allowHover={true}
      >
        <MenuHandler>
          <Typography as="div" variant="small" className="font-medium">
            <ListItem
              className="flex items-center gap-2  pr-4  py-1 font-semibold text-gray-900 text-md "
              selected={isMenuOpen || isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen((cur) => !cur)}
            >
              Resources
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`hidden h-3 w-3 transition-transform lg:block ${isMenuOpen ? "rotate-180" : ""
                  }`}
              />
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`block h-3 w-3 transition-transform lg:hidden ${isMobileMenuOpen ? "rotate-180" : ""
                  }`}
              />
            </ListItem>
          </Typography>
        </MenuHandler>
        <MenuList className="hidden max-w-screen-xl rounded-xl lg:block">
          <ul className="grid grid-cols-3 gap-y-2 outline-none outline-0">
            {renderItems}
          </ul>
        </MenuList>
      </Menu>
      <div className="block lg:hidden">
        <Collapse open={isMobileMenuOpen}>{renderItems}</Collapse>
      </div>
    </React.Fragment>
  );
}

function NavList() {



  return (
    <List className="p-0 lg:mt-0 lg:mb-0 lg:flex-row  text-sm ">
      <Typography
        as="a"
        href="#"
        variant="small"
        color="blue-gray"
        className="font-medium"
      >
        <Link to='/'>
          <ListItem className="flex items-center gap-2  pr-4 text-md  py-1 font-semibold">Home</ListItem>
        </Link>
      </Typography>
      <NavListMenu />
      <Link to = "/about">
      <Typography
        as="a"
        href="#"
        variant="small"
        color="blue-gray"

      >
        <ListItem className="flex items-center gap-2 py-1 pr-4 text-md font-semibold">
          About Us
        </ListItem>
      </Typography>
      </Link>
      <Typography
        as="a"
        href="#"
        variant="small"
        color="blue-gray"
        
        >
          <Link to='/contact'>
        <ListItem className="flex items-center gap-2 py-1 pr-4 text-md font-semibold">
          Contact Us
        </ListItem>
          </Link>
      </Typography>
    </List>
  );
}

export default function Nav() {
  const [openNav, setOpenNav] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState('');
  const navigate = useNavigate()
  const user = useSelector((store) => store.user.user)
  const loading = useSelector((store) => store.user.isLoading)
  const dispatch = useDispatch();
  const location = useLocation()


  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false),
    );
    // if(user._id)
    // console.log(true)
  }, []);

  React.useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('search');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
    else
    setSearchTerm('');
  }, [location]);

  const handleSearch=()=>{
    
      const urlParams = new URLSearchParams(location.search);
      if(searchTerm)
      {

        urlParams.set('search', searchTerm);
        const searchQuery = urlParams.toString();
        navigate(`/resources?search=${searchTerm}`);
      }
      else 
      navigate(`/resources`);
    

  
  }

  const handlekey=(e)=>
  {
      if (e.key === 'Enter') handleSearch()
  }



  return (
    <Navbar className="   max-w-[100vw] z-20  py-2">
      <div className="flex items-center justify-between text-blue-gray-900 ">
        <div className="flex items-center">

          <img src="https://img.icons8.com/?size=100&id=mpeojql23sni&format=png&color=000000" alt="" className="w-6 h-6 ml-2" />
          <Typography
            as="a"
            href="#"
            variant="h6"
            className="mr-4 cursor-pointer  lg:ml-2 "
          >
            AlphaLearn

          </Typography>
        </div>

        <div className="hidden items-center gap-x-2 lg:flex">
          <div className=" flex items-center  w-full gap-2 md:w-max">
          <FaSearch onClick={handleSearch} 
          size={20} className="cursor-pointer"/>
            <Input onKeyDown={(e)=>handlekey(e)}
              type="search"
              placeholder="Search"
              value={searchTerm}
              onChange={(e)=>setSearchTerm(e.target.value)}
              containerProps={{
                className: "min-w-[150px] bg-gray-200 rounded-[12px]",
              }}
              className="!border-t-blue-gray-300 pl-9 placeholder:text-blue-gray-300 focus:!border-blue-gray-300"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
          </div>


        </div>
        <div className="hidden lg:block">
          <NavList />
        </div>


        <div className="hidden gap-2 lg:flex">
          {
            user && user._id ?
           <Profile/>

              : <Link to="signup">
                <Button variant="gradient" size="sm" >
                  Sign In
                </Button>
              </Link>
          }
        </div>
        <IconButton
          variant="text"
          color="blue-gray"
          className="lg:hidden"
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <XMarkIcon className="h-6 w-6" strokeWidth={2} />
          ) : (
            <Bars3Icon className="h-6 w-6" strokeWidth={2} />
          )}
        </IconButton>
      </div>
      <Collapse open={openNav}>
        <NavList />


        <div className="flex w-full flex-nowrap items-center gap-2 lg:hidden">
          {
               user ?
               <Link to= {`dashboard?user=${user.uniqueName}&tab=profile`}>

               <Person />
               </Link>
    
                  : <Link to="signup">
                    <Button variant="gradient" size="sm" >
                      Sign In
                    </Button>
                  </Link>

          }
        </div>
      </Collapse>
    </Navbar>
  );
}