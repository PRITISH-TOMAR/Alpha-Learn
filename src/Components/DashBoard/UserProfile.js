


import { useEffect, useState, React } from 'react';
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
import MyArticles from './MyArticles';


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

    ///////////////////////////////////////////////////////////////


    useEffect(() => {
        const url = new URLSearchParams(location.search)
        let urlUser = url.get('user')
        // const searchQuery = url.toString();
        // if(urlUser)setUser(currUser)
        // console.log(urlUser)
        if (!urlUser) urlUser = currUser.uniqueName



        const getUser = async () => {
            try {



                const res = await axios.get(`${process.env.REACT_APP_API_END}user?user=${urlUser}`)
                if (res.status) {
                    setUser(res.data.item);
                    // console.log(res.data.item)
                }
            }


            catch (e) {
                // console.log(e)
            }
        }
        getUser()
    }, [location])



    ///////////////////////////////////////////////////////////////


    useEffect(() => {


        const fetchArt = async () => {
            try {

                const res = await axios.get(`${process.env.REACT_APP_ARTICLE_END}retrieve?userId=${user._id}`)

                if (res.status) {
                    setTotalArticles(res.data.total)
                    setArticles(res.data.resData)
                    // console.log(res.data.resData)
                    setLastMonthArticles(res.data.lastMonth)
                }
            }
            catch (e) { console.log(e) }
        }

        const fetchCom = async () => {
            try {

                const res = await axios.get(`${process.env.REACT_APP_COMMENT_END}retrieve?userId=${user.uniqueName}`)

                if (res.status) {

                    setTotalComments(res.data.total)
                    setComments(res.data.comments)
                    setLastMonthComments(res.data.lastMonth)
                }
            }
            catch (e) { console.log(e) }
        }

        fetchArt()
        fetchCom()


    }, [user])

    ///////////////////////////////////////////////////////////////





    return (
        <>
            <div className='p-3   w-full   gap-6 flex flex-wrap flex-col overflow-hidden'>
                <div className=' mx-auto w-full  md:gap-2 mb-4 flex flex-row  justify-center  items-center flex-wrap h-fit '>
                    <div className='md:min-w-fit min-w-full  ' >
                    <UserDetails   user={user} />
                        
                    </div>
                    <div className='flex-wrap flex flex-col justify-start items-center border md:w-[80vw] w-full lg:w-[40vw] h-fit p-3 md:gap-2 gap-4 lg:h-full md:my-0 my-12 pb-6
            bg-gradient-to-r from-gray-200 via-purple-200 to-pink-200 rounded-[20px] min-h-[400px] '>
                        <h3 className='mt-7 mb-2 text-center font-semibold md:text-2xl lg:text-4xl text-3xl'>Recent Activites</h3>

                        <div className='flex flex-col border p-2 mx-auto dark:bg-slate-800   w-[98%] md:w-[90%] rounded-md shadow-md bg-teal-100 my-auto'>
                            <div className='flex justify-between '>
                                <div className=''>
                                    <h3 className='text-gray-500 md:text-2xl lg:text-3xl text-2xl  '>Total Articles</h3>
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
                                    <h3 className='text-gray-500 md:text-1.5xl  lg:text-3xl text-2xl '>Total Comments</h3>
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
                <Typography variant='h4' color={'white'} textAlign={'center'}>My Activities</Typography>
                <div className=' text-white w-full max-w-full flex flex-row justify-center items-center  flex-wrap h-fit  gap-8'>
                    <div className=' bg-white overflow-x-auto flex items-center h-fit w-fit bg-gradient-to-r from-gray-200 via-purple-200 to-pink-200 rounded-[20px]'>
                        <Chart articles={articles} />
                    </div>
                    <div className=' border overflow-x-auto flex items-center h-fit w-fit  
                bg-gradient-to-r from-gray-100 via-purple-100 to-pink-100 rounded-[20px]'>
                        <Bar articles={articles} comments={comments} />
                    </div>






                </div>


            </div>
        </>
    );
}

export default UserProfile