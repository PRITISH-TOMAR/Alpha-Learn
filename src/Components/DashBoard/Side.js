import { Sidebar } from 'flowbite-react';
import { HiUser, HiArrowSmRight, } from 'react-icons/hi';
import { MdArticle, MdEdit } from "react-icons/md";
import { VscThreeBars } from "react-icons/vsc";
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setUser } from '../Redux/UserSlice';
import toast from 'react-hot-toast';
import { IoIosCloseCircle } from "react-icons/io";
///////////////
import { Dialog, DialogBackdrop, DialogPanel, } from '@headlessui/react'
import { useEffect } from 'react';
export default function Side() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [showSidebar, setShowSidebar] = useState(false);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const currUser = useSelector((state) => state.user.user);
  const [usert, setUsert] = useState({})





  ///////////////////////////////////////////////////////////////


  useEffect(() => {
    const url = new URLSearchParams(location.search)
    let urlUser = url.get('user')
    // const searchQuery = url.toString();
    if (!urlUser) urlUser = currUser.uniqueName



    const getUser = async () => {
      try {



        const res = await axios.get(`${process.env.REACT_APP_API_END}user?user=${urlUser}`)
        if (res.status) {
          setUsert(res.data.item);
          // console.log(res.data.item)
        }
      }


      catch (e) {
        console.log(e)
      }
    }

    getUser()
  }, [location])

  ///////////////////////////////////////////////////////////////

  const Logout = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_END}logout`);
      if (res.data.success) {
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
  const handleElseClick = () => {
    if (showSidebar)
      setShowSidebar(!showSidebar);

  }


  ///////////////////////////////////////////////////////////////

  return (
    <>


      <button
        type="button"
        onClick={() => setMobileFiltersOpen(true)}
        className=" w-screen  flex justify-end p-3  text-gray-400 hover:text-gray-200  lg:hidden"
      >

        <VscThreeBars aria-hidden="true" size={26} />
      </button>

      <div className=' z-40 relative lg:hidden'>


        <Dialog open={mobileFiltersOpen} onClose={setMobileFiltersOpen} className=" z-40     relative lg:hidden">
          <DialogBackdrop
            transition
            className="fixed inset-0  transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
          />

          <div className="fixed inset-0 z-40 flex">
            <DialogPanel
              transition
              className="relative ml-auto mt-[58px] rounded-r px-2 rounded-[18px] border-l flex h-full  w-full max-w-[200px] transform flex-col overflow-y-auto bg-gray-900  py-4 pb-12 shadow-xl transition duration-300 ease-in-out data-[closed]:translate-x-full "
            >
              <div className="flex items-center justify-end px-4 ">
                <button

                >

                  <IoIosCloseCircle
                    onClick={() => setMobileFiltersOpen(false)}
                    size={30}
                    className="   text-gray-400" />
                </button>
              </div>

              {/*  */}

              <Sidebar className=' w-fit'>

                <Sidebar.Items className="flex justify-start items-start pt-2  ">
                  <Sidebar.ItemGroup className="flex flex-col  gap-1   items-start">
                    <Link to={usert._id === currUser._id ? `/dashboard?tab=profile` : `/dashboard?user=${usert.uniqueName}&tab=profile`}>
                      <Sidebar.Item className=' hover:text-gray-900 text-gray-200  ' icon={HiUser} onClick={()=>{setMobileFiltersOpen(false);}} as='div'>
                        <p className=''>Profile</p>
                      </Sidebar.Item>
                    </Link>
                    <Link to={usert._id === currUser._id ? `/dashboard?tab=my-articles` : `/dashboard?user=${usert.uniqueName}&tab=my-articles`}>
                      <Sidebar.Item icon={MdArticle}  onClick={()=>{setMobileFiltersOpen(false);}} className='hover:text-gray-900  cursor-pointer text-gray-200  ' as='div'>
                        <p className=' lg:flex'> {currUser._id === usert._id && 'My '}Articles</p>
                      </Sidebar.Item>
                    </Link>

                    {usert && usert._id === currUser._id &&
                      <>
                        <Link to='/dashboard?tab=create'>
                          <Sidebar.Item icon={MdEdit} onClick={()=>{setMobileFiltersOpen(false);}} className=' cursor-pointer' as='div'>
                            <p className=' lg:flex text-gray-200   hover:text-gray-900'>Write New</p>
                          </Sidebar.Item>
                        </Link>
                        <Link to=''>
                          <Sidebar.Item icon={HiArrowSmRight} className='cursor-pointer' onClick={() => { Logout(); setMobileFiltersOpen(false) }} as='div'>
                            <p className='hover:text-gray-900 lg:flex text-gray-200  '>SignOut</p>
                          </Sidebar.Item>
                        </Link>
                      </>}
                  </Sidebar.ItemGroup>
                </Sidebar.Items>
              </Sidebar>
              {/*  */}

            </DialogPanel>
          </div>
        </Dialog>


        

      </div>

      <Sidebar className=' min-w-[14vw] max-w-[14vw] lg:flex border-r rounded-r rounded-[15px] bg-gray-900 hidden'>

<Sidebar.Items className="flex justify-center items-start pt-2  ">
  <Sidebar.ItemGroup className="flex flex-col  ml-1 gap-1   items-start ">
    <Link to={usert._id === currUser._id ? `/dashboard?tab=profile` : `/dashboard?user=${usert.uniqueName}&tab=profile`}>
      <Sidebar.Item className=' hover:text-gray-900 text-gray-200  ' icon={HiUser} onClick={toggleSidebar} as='div'>
        <p className=''>Profile</p>
      </Sidebar.Item>
    </Link>
    <Link to={usert._id === currUser._id ? `/dashboard?tab=my-articles` : `/dashboard?user=${usert.uniqueName}&tab=my-articles`}>
      <Sidebar.Item icon={MdArticle} onClick={toggleSidebar} className='hover:text-gray-900  cursor-pointer text-gray-200  ' as='div'>
        <p className=' lg:flex'> {currUser._id === usert._id && 'My '}Articles</p>
      </Sidebar.Item>
    </Link>

    {usert && usert._id === currUser._id &&
      <>
        <Link to='/dashboard?tab=create'>
          <Sidebar.Item icon={MdEdit} onClick={toggleSidebar} className=' cursor-pointer text-gray-200   hover:text-gray-900' as='div'>
            <p className=' lg:flex '>Write New</p>
          </Sidebar.Item>
        </Link>
        <Link to=''>
          <Sidebar.Item icon={HiArrowSmRight} className='cursor-pointer text-gray-200   hover:text-gray-900' onClick={() => { Logout(); toggleSidebar() }} as='div'>
            <p className='lg:flex   '>SignOut</p>
          </Sidebar.Item>
        </Link>
      </>}
  </Sidebar.ItemGroup>
</Sidebar.Items>
</Sidebar>
    </>
  );
}
