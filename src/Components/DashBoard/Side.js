import { Sidebar } from 'flowbite-react';
import {  HiUser, HiArrowSmRight, } from 'react-icons/hi';
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



  ///////////////////////////////////////////////////////////////


  useEffect(()=>
    {
        const  url =new URLSearchParams(location.search)
        let urlUser = url.get('user')
        // const searchQuery = url.toString();
        if(!urlUser)urlUser= currUser.uniqueName
        
       
            
        const getUser= async ()=>
        {
            try
            {
              

                
                const res = await axios.get(`${process.env.REACT_APP_API_END}user?user=${urlUser }`)
                if(res.status)
                  {
                    setUsert(res.data.item);
                    // console.log(res.data.item)
                  }
                }
                    
                    
            catch(e)
            {
                console.log(e)
            }
        }

            getUser()
    }, [location])

///////////////////////////////////////////////////////////////

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


  ///////////////////////////////////////////////////////////////

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };
  const handleElseClick =()=>
  {
    if(showSidebar)
    setShowSidebar(!showSidebar);

  }


  ///////////////////////////////////////////////////////////////

  return (
    <>
     <VscThreeBars size={22}  className="lg:hidden  text-white absolute top-[70px] left-4 z-[200]"
        onClick={toggleSidebar}/>
    <div  className={`h-full   ${showSidebar? 'max-w-0 w-0 ':'lg:flex hidden  '}`} >
     
      
      <Sidebar className={`border-r bg-gray-800 min-h-screen relative lg:max-w-[14vw]  transition-transform duration-200  ${
          showSidebar
            ? '  translate-x-0 max-w-[50vw] z-[100] block z-[100] max-w-[50vw] '
            : '-translate-x-full lg:translate-x-0 lg:block '
        }`} >
        <Sidebar.Items className="flex justify-center items-start pt-2  ">
          <Sidebar.ItemGroup className="flex flex-col  ml-1 gap-1   items-start">
            <Link to={usert._id=== currUser._id ? `/dashboard?tab=profile`:  `/dashboard?user=${usert.uniqueName}&tab=profile`}>
              <Sidebar.Item className=' hover:text-gray-900 text-gray-200  ' icon={HiUser} onClick={toggleSidebar} as='div'>
                <p className=''>Profile</p>
              </Sidebar.Item>
            </Link>
            <Link to={usert._id=== currUser._id ? `/dashboard?tab=my-articles`:  `/dashboard?user=${usert.uniqueName}&tab=my-articles`}>
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
    </>
  );
}
