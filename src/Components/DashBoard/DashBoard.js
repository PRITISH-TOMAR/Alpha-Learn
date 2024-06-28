import { React, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../Redux/UserSlice';








const DashBoard = () => {

  const [showModal, setShowModal] = useState(false)
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.user);

  const logoutHandler = async () => {
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


  const deleteUser = async () => {
    try {
     
      // console.log(user)
      // const duser = user._id

      const res = await axios.delete(`${process.env.REACT_APP_API_END}delete`, {
        data: { email: user.email },
      });     
        toast.success(res.data.message);
      
      dispatch(setUser(null));
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }



  return (
    <div className="min-h-screen flex flex-col items-center p-6 bg-black">
      <div className="md:w-[60vw]  w-full bg-black rounded-lg shadow-lg p-6 flex flex-col items-center border-2 text-white">

        {/* <div className="flex flex-col md:w-2/3 p-6 items-center  justify-center bg-gray-700"> */}
        <h2 className="text-xl font-semibold mb-4"> {user.fullName}</h2>

        <div className="md:w-1/3 flex flex-col items-center p-6">
          <img
            src="https://via.placeholder.com/150"
            alt="Profile"
            className="rounded-full w-48 h-48 mb-4"
          />
          {/* <h1 className="text-2xl font-bold">John Doe</h1> */}
          <p className="text-gray-600">{user.email}</p>
        </div>


        <p className="text-gray-700 mb-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
          lacinia odio vitae vestibulum vestibulum. Cras venenatis euismod
          malesuada. Etiam in ligula risus. Nulla facilisi. Sed convallis
          luctus quam, nec tincidunt libero venenatis nec.
        </p>



        <div className='text-red-500 flex justify-between mt-5 w-[60%]'>
          <span className='cursor-pointer' onClick={deleteUser}>
            Delete Account
          </span>
          <span className='cursor-pointer' onClick={logoutHandler}>
            Sign Out
          </span>
        </div>


        <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
        <div className="flex flex-col space-y-2">
          <p className="text-gray-700">
            <strong>Phone:</strong> (123) 456-7890
          </p>
          <p className="text-gray-700">
            <strong>Address:</strong> 123 Main St, Anytown, USA
          </p>
        </div>
      </div>
      {/* </div> */}

    </div>
  );
};

export default DashBoard;
