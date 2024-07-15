


import { useEffect, useState , React} from 'react';
import { useSelector } from 'react-redux';

import {
    HiAnnotation,
    HiArrowNarrowUp,
    HiDocumentText,
    HiOutlineUserGroup,
    

} from 'react-icons/hi';
import { MdMessage } from "react-icons/md";
import { Button } from 'flowbite-react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import UserDetails from './UserDetails';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';
import Chart from './Chart';
import { useLocation } from 'react-router-dom';
import Bar from './Bar';
import { getBytes } from 'firebase/storage';


const UserProfile = () => {
    //   const [users, setUsers] = useState([]);
    const [comments, setComments] = useState([]);
    const [articles, setArticles] = useState([]);
    //   const [totalUsers, setTotalUsers] = useState(0);
    //   const [articles, setarticles] = useState(0);
    const [totalComments, setTotalComments] = useState(0);
    const [totalArticles, setTotalArticles] = useState(0);
    //   const [lastMonthUsers, setLastMonthUsers] = useState(0);
    const [lastMonthArticles, setLastMonthArticles] = useState(0);
    const [lastMonthComments, setLastMonthComments] = useState(0);
    const currUser = useSelector((state) => state.user.user);
    const [user, setUser] = useState({})
    const navigate = useNavigate()
    const location = useLocation()
    
    const showArticle = (artId) => {
        navigate(`/article?unique=${artId}`)

    }

    useEffect(()=>
    {
        const  url =new URLSearchParams(location.search)
        const urlUser = url.get('user')
        // const searchQuery = url.toString();
        if(!urlUser)setUser(currUser)
        
       
            
        const getUser= async ()=>
        {
            try
            {
                if(urlUser)
                {

                    const res = await axios.get(`${process.env.REACT_APP_API_END}user?user=${urlUser}`)
                    if(res.status)
                        {
                            setUser(res.data.item);
                            console.log(res.data.item)
                        }
                    }
                    }
            catch(e)
            {
                console.log(e)
            }
        }
            getUser()
    }, [location])

    useEffect(()=>{
       

        const fetchArt= async () =>{
            try{

                const res =  await axios.get(`${process.env.REACT_APP_ARTICLE_END}retrieve?userId=${user._id}`)

                if(res.status) 
                    {
                        setTotalArticles(res.data.total)
                        setArticles(res.data.resData)
                        console.log(res.data.resData)
                        setLastMonthArticles(res.data.lastMonth)
                    }
            }
            catch(e)
            { console.log(e) }
        }

        const fetchCom= async () =>{
            try{

                const res =  await axios.get(`${process.env.REACT_APP_COMMENT_END}retrieve?userId=${user.uniqueName}`)

                if(res.status) 
                    {
                       
                        setTotalComments(res.data.total)
                        setComments(res.data.comments)
                        setLastMonthComments(res.data.lastMonth)
                    }
            }
            catch(e)
            { console.log(e) }
        }

        fetchArt()
        fetchCom()


    }, [user])




    return (
        <>
        <div className='p-3  max-w-full w-full   gap-6 flex flex-wrap flex-col '>
                <div className=' mx-auto w-full  mb-4 flex flex-row justify-between  items-center flex-wrap h-fit '>
            <UserDetails user={user}/>
            <div className='flex-wrap flex flex-col justify-start items-center border md:w-[35vw] w-full lg:w-[35vw]  md:h-full h-[400px] md:my-0 my-12 pb-6
            bg-gradient-to-r from-gray-200 via-purple-200 to-pink-200 rounded-[20px]'>
            <h3 className='mt-7 mb-2 text-center font-semibold md:text-4xl text-3xl'>Recent Activites</h3>

                <div className='flex flex-col border p-3 mx-auto dark:bg-slate-800   w-[98%] md:w-[90%] rounded-md shadow-md bg-teal-100 my-auto'>
                    <div className='flex justify-between '>
                        <div className=''>
                            <h3 className='text-gray-500 md:text-3xl text-2xl  '>Total Articles</h3>
                            <p className='md:text-4xl text-3xl '>{totalArticles}</p>
                        </div>
                        <Link to={`/dashboard?user=${user.uniqueName}&tab=my-articles`}>  
                        <HiDocumentText className='bg-gray-700 my-auto  text-white rounded-full text-6xl p-3 shadow-lg' />
                        </Link>
                    </div>
                    <div className='flex  gap-2 text-lg'>
                        <span className='text-green-500 flex items-center'>
                            <HiArrowNarrowUp />
                            {lastMonthArticles}
                        </span>
                        <div className='text-gray-500'>Last month</div>
                    </div>
                </div>

                <div className='flex flex-col border p-3 mx-auto dark:bg-slate-800  w-[98%] md:w-[90%]   rounded-md shadow-md bg-teal-100'>
                    <div className='flex justify-between'>
                        <div className=''>
                            <h3 className='text-gray-500 md:text-3xl text-2xl '>Total Comments</h3>
                            <p className='md:text-4xl text-3xl'>{totalComments}</p>
                        </div>
                        <Link to={`/dashboard?user=${user.uniqueName}&tab=my-articles`}>  
                        <MdMessage className='bg-gray-700 my-auto  text-white rounded-full text-6xl p-3 shadow-lg' />
                        </Link>
                    </div>
                    <div className='flex  gap-2 text-lg'>
                        <span className='text-green-500 flex items-center'>
                            <HiArrowNarrowUp />
                            {lastMonthComments}
                        </span>
                        <div className='text-gray-500'>Last month</div>
                    </div>
                </div>
                
            </div>
            </div>
                <Typography variant='h5' color={'white'} textAlign={'center'}>My Activities</Typography>
            <div className=' text-white w-full max-w-full flex flex-row justify-center items-center md:justify-between flex-wrap h-fit md:gap-1 gap-8'>
                <div className=' bg-white overflow-x-auto flex items-center h-fit w-fit bg-gradient-to-r from-gray-200 via-purple-200 to-pink-200 rounded-[20px]'>
            <Chart articles={articles}/>
                </div>
                <div className=' border overflow-x-auto flex items-center h-fit w-fit  
                bg-gradient-to-r from-gray-100 via-purple-100 to-pink-100 rounded-[20px]'>
            <Bar articles={articles} comments={comments}/>
                </div>
                
            
             
            
                

            </div>
           
        </div>
</>
    );
}

export default UserProfile