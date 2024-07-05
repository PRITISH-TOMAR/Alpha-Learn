import { Sidebar } from 'flowbite-react';

import {
  HiUser,
  HiArrowSmRight,
  HiDocumentText,
  HiOutlineUserGroup,
  HiAnnotation,
  HiChartPie,
} from 'react-icons/hi';
import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
// import { signoutSuccess } from '../redux/user/userSlice';
import { setUser } from '../Redux/UserSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function Side() {
  const dispatch = useDispatch();
  const navigate = useNavigate()


const Logout = async () => {
  try {
      const res = await axios.get(`${process.env.REACT_APP_API_END}/logout`);
      if (res.data.success) {
          toast.success(res.data.message);
      }
      dispatch(setUser(null));
      navigate("/");
  } catch (error) {
      console.log(error);
  }
}
  
  return (
    <Sidebar className="max-w-[10vw] md:max-w-[20vw] lg:max-w-[15vw] border-r">
    <Sidebar.Items className="flex justify-center items-start">
      <Sidebar.ItemGroup className="flex flex-col gap-1 text-gray-200 items-start">
        <Link to='/dashboard?tab=profile'>
          <Sidebar.Item icon={HiUser}  as='div'>
            <p className='hidden lg:flex text-gray-200'>Profile</p>
          </Sidebar.Item>
        </Link>
        <Link to='/dashboard?tab=my-articles'>
          <Sidebar.Item icon={HiArrowSmRight} className='cursor-pointer text-gray-200 ' as='div'>
            <p className='hidden lg:flex'>My articles</p>
          </Sidebar.Item>
        </Link>
        <Link to='/dashboard?tab=create'>
          <Sidebar.Item icon={HiArrowSmRight} className='cursor-pointer' as='div'>
            <p className='hidden lg:flex text-gray-200'>Write New</p>
          </Sidebar.Item>
        </Link>
        <Link to='/dashboard?tab=out'>
          <Sidebar.Item icon={HiArrowSmRight} className='cursor-pointer' onClick={Logout} as='div'>
            <p className='hidden lg:flex text-gray-200'>SignOut</p>
          </Sidebar.Item>
        </Link>
      </Sidebar.ItemGroup>
    </Sidebar.Items>
  </Sidebar>
  
  );
}