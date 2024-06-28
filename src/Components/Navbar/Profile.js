import React from 'react'
import { Avatar, Button, Dropdown, Navbar, TextInput } from 'flowbite-react';
import { Person } from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { setUser } from '../Redux/UserSlice';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
const Profile = () => {
    const { user } = useSelector((state) => state.user);
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_END}/logout`);
            if(res.data.success){
                toast.success(res.data.message);
            }
            dispatch(setUser(null));
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <div>
         <Dropdown className='mt-2'
            arrowIcon={false}
            inline
            label={
              <Person />
            }
          >
            <Dropdown.Header >
              <span className='block text-sm'>{user.fullName}</span>
              <span className='block text-sm font-medium truncate'>
                {user.email}
              </span>
            </Dropdown.Header>
            <Link to={'/dashboard?tab=profile'}>
              <Dropdown.Item>Profile</Dropdown.Item>
            </Link>
            <Dropdown.Divider />
            <Dropdown.Item onClick={ logoutHandler}>Sign out</Dropdown.Item>
          </Dropdown>
    </div>
  )
}

export default Profile
