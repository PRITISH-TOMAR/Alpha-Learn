import { Sidebar } from 'flowbite-react';
import {
  HiUser,
  HiArrowSmRight,
  HiDocumentText,
  HiOutlineUserGroup,
  HiAnnotation,
  HiChartPie,
} from 'react-icons/hi';
import { MdArticle, MdEdit } from "react-icons/md";
import { VscThreeBars } from "react-icons/vsc";
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setUser } from '../Redux/UserSlice';
import toast from 'react-hot-toast';
import { useEffect } from 'react';
export default function Side() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [showSidebar, setShowSidebar] = useState(false);
  const currUser = useSelector((state) => state.user.user);
  const [usert, setUsert] = useState({})



  useEffect(()=>
    {
        const  url =new URLSearchParams(location.search)
        const urlUser = url.get('user')
        // const searchQuery = url.toString();
        if(!urlUser)setUsert(currUser)
        
       
            
        const getUser= async ()=>
        {
            try
            {
                if(urlUser)
                {

                    const res = await axios.get(`${process.env.REACT_APP_API_END}user?user=${urlUser}`)
                    if(res.status)
                        {
                            setUsert(res.data.item);
                            console.log(res.data.item)
                        }
                        else
                        {
                          // console.log("Hellod ef")
                          navigate('/')
                        }
                    }
                    }
            catch(e)
            {
                console.log(e)
                navigate('/')
            }
        }
            getUser()
    }, [location])


  const Logout = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_END}logout`);
      if(res.data.success){
          toast.success(res.data.message);
          dispatch(setUser({}));
      navigate("/");
      }
      
  } catch (error) {
      console.log(error);
  }

  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };
  const handleElseClick =()=>
  {
    if(showSidebar)
    setShowSidebar(!showSidebar);

  }

  return (
    <div  className={`h-full    ${showSidebar? 'max-w-0 w-0 ':'max-w-[15vw] flex  '}`} >
      <button
        className="lg:hidden  text-white absolute top-[70px] left-4 z-[200]"
        onClick={toggleSidebar}
      >
       <VscThreeBars size={22}/>
      </button>
      <Sidebar className={`border-r bg-gray-800 min-h-screen relative lg:max-w-[15vw]  transition-transform duration-200  ${
          showSidebar
            ? '  translate-x-0 max-w-[50vw] z-[100] block z-[100] max-w-[50vw] '
            : '-translate-x-full lg:translate-x-0 lg:block '
        }`} >
        <Sidebar.Items className="flex justify-center items-start pt-2  ">
          <Sidebar.ItemGroup className="flex flex-col  ml-1 gap-1 text-gray-200 items-start">
            <Link to={`/dashboard?user=${usert.uniqueName}&tab=profile`}>
              <Sidebar.Item icon={HiUser} onClick={toggleSidebar} as='div'>
                <p className=' lg:flex text-gray-200   hover:text-gray-900'>Profile</p>
              </Sidebar.Item>
            </Link>
            <Link to={`/dashboard?user=${usert.uniqueName}&tab=my-articles`}>  
                        <Sidebar.Item icon={MdArticle} onClick={toggleSidebar} className='hover:text-gray-900  cursor-pointer text-gray-200  ' as='div'>
                <p className=' lg:flex'> { currUser._id === usert._id && 'My ' }Articles</p>
              </Sidebar.Item>
            </Link>
          
            {usert && usert._id === currUser._id &&  
            <>
            <Link to='/dashboard?tab=create'>
              <Sidebar.Item icon={MdEdit} onClick={toggleSidebar}  className=' cursor-pointer' as='div'>
                <p className=' lg:flex text-gray-200   hover:text-gray-900'>Write New</p>
              </Sidebar.Item>
            </Link>
            <Link to=''>
              <Sidebar.Item icon={HiArrowSmRight}    className='cursor-pointer' onClick={()=>{Logout() ;toggleSidebar()}} as='div'>
                <p className='hover:text-gray-900 lg:flex text-gray-200  '>SignOut</p>
              </Sidebar.Item>
            </Link>
            </>}
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </div>
  );
}
