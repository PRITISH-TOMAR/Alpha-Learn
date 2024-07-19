import React from 'react';
import { Avatar, Button, Dropdown, Navbar, TextInput } from 'flowbite-react';
import { Person } from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { setUser } from '../Redux/UserSlice';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';


///////////////////////////////////////////////////////////////



const Profile = () => {
    const  user = useSelector((state) => state.user.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = async () => {
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
    }


    ///////////////////////////////////////////////////////////////

    return (
        <div className="relative z-40">
            <Dropdown
                className="mt-2 z-30"
                arrowIcon={true}
                inline
                label={<img src={user.profilePicture} className='w-[40px] h-[40px] rounded-[100%] overflow-hidden '></img>}
            >
                <Dropdown.Header className="z-30 transition-transform duration-200 ">
                    <span className="block text-sm">{user.fullName}</span>
                    <span className="block text-sm font-medium">
                        {user.email}
                    </span>
                </Dropdown.Header>
                <Link to={'/dashboard?tab=profile'}>
                    <Dropdown.Item>Profile</Dropdown.Item>
                </Link>
                <Dropdown.Divider />
                <Dropdown.Item onClick={logoutHandler}>Sign out</Dropdown.Item>
            </Dropdown>
        </div>
    );
};

export default Profile;
