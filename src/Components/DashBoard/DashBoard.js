import { React, useState , useEffect} from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../Redux/UserSlice';
import MyArticles from './MyArticles';
import NewArticle from './NewArticle'
import Side from './Side';
import UserProfile from './UserProfile';
import { useLocation } from 'react-router-dom';
import UpdateArticle from './UpdateArticle';


import { Route, BrowserRouter, Routes } from 'react-router-dom'









const DashBoard = () => {
  const location = useLocation()
  const [tab, setTab] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const  user  = useSelector((state) => state.user.user);

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


  useEffect(() => {

    if(!user._id)
    {
      navigate("/")
    }
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
 
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);


  return (
    <div className="min-h-screen flex flex-row  items-between justify-between bg-black max-w-full  justify-center ">

      <div>
        <Side />
      </div>
      <div className='flex  md:w-[85vw] w-full md:pt-0 pt-8'>


      {tab === 'profile' && <UserProfile /> }
      {tab === 'create' &&  <NewArticle/> }
      {tab === 'my-articles' &&  <MyArticles/> }
      {tab === 'update' &&  <UpdateArticle/> }

      </div>



    </div>



  );
};

export default DashBoard;
