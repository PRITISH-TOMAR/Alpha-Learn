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



import { Route, BrowserRouter, Routes } from 'react-router-dom'









const DashBoard = () => {
  const location = useLocation()
  const [tab, setTab] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.user);

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


  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  return (
    <div className="min-h-screen flex flex-row  items-between justify-between bg-black max-w-[95vw] w-[95vw] mt-8">

      <div className=' max-w-[12vw] flex  '>
        <Side />
      </div>
      <div className='max-w-[82vw] flex min-w-[82vw] w-[82vw] '>


      {tab === 'profile' && <UserProfile /> }
      {tab === 'create' &&  <NewArticle/> }
      {tab === 'my-articles' &&  <MyArticles/> }

      </div>



    </div>



  );
};

export default DashBoard;
