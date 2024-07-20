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


  



  return (
    <div className="min-h-screen flex lg:flex-row flex-col  items-between justify-between bg-black max-w-full  justify-center ">

      <div >
        <Side />
      </div>
      <div className='flex  lg:w-[85vw] justify-center items-center  md:pt-0 pt-8'>


      {tab === 'profile' && <UserProfile /> }
      {tab === 'create' &&  <NewArticle/> }
      {tab === 'my-articles' &&  <MyArticles/> }
      {tab === 'update' &&  <UpdateArticle/> }

      </div>



    </div>



  );
};

export default DashBoard;
