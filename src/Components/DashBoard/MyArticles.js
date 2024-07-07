import { React, useState, useEffect } from 'react';
import { Button } from '@material-tailwind/react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { FaDeleteLeft } from "react-icons/fa6";
import { Popover, PopoverHandler, PopoverContent } from '@material-tailwind/react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';
import Highlight from '../Essantials/Highlight';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import UpdateArticle from './UpdateArticle';


const MyArticles = () => {
  const { user } = useSelector((state) => state.user);
  const [articles, setArticles] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [todelete, setTodelete] = useState(null); // Track the index of the row to be deleted
  const [deleted, setDeleted] = useState(false); // Track the index of the row to be deleted
  const navigate = useNavigate()
  useEffect(() => {
    const myarticles = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_ARTICLE_END}retrieve?userId=${user._id}`);
        if (res.status) {
          setArticles(res.data.resData);
          if (res.data.resData.length < 9) setShowMore(false);
        }
      } catch (error) {
        console.log(error);
      }
    };
    myarticles();
  }, [user._id, deleted]);

  
  const handleModal = (index) => {
    setTodelete(index);
    setShowModal(!showModal);
  };

  const UpdateArticle=( artId )=>
  {
    navigate(`/dashboard?tab=update&uid=${artId}`)

  }

  const deleteArt = async (_id) => {
    // console.log(_id); // Ensure _id is logged correctly for debugging
  
    try {
      const res = await axios.delete(`${process.env.REACT_APP_ARTICLE_END}/delete`, {
        data: { _id, userId: user._id } // Ensure _id is correctly passed in the data object
      });
  
      if (res.status === 200) {
        setDeleted(true)
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error('Error deleting article:', error);
      toast.error('Something went wrong!');
    }
  };
  

  const handleShowMore = async () => {
    const startIndex = articles.length;
    try {
      const res = await axios.get(`${process.env.REACT_APP_ARTICLE_END}retrieve?userId=${user._id}&startIndex=${startIndex}`);
      if (res.status) {
        setArticles((prev) => [...prev, ...res.data.resData]);
        if (res.data.resData.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <div className="w-full bg-black rounded-lg shadow-lg p-4 flex flex-col items-center text-white">
        <span className='text-[35px] mb-8'>
          <Highlight text={"My Articles.."} />
        </span>
        {!articles.length ? (
          <Link to="/dashboard?tab=create">
            <Button variant="gradient" size="md">
              Write New
            </Button>
          </Link>
        ) : (
          
          <TableContainer component={Paper} >
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow className='bg-gray-200'>
                  <TableCell align="left" sx={{ color: 'black', fontSize: 17, fontWeight: 'bold' }}>Date Updated</TableCell>
                  <TableCell align="left" sx={{ color: 'black', fontSize: 17, fontWeight: 'bold' }}>Image</TableCell>
                  <TableCell align="left" sx={{ color: 'black', fontSize: 17, fontWeight: 'bold' }}>Title</TableCell>
                  <TableCell align="left" sx={{ color: 'black', fontSize: 17, fontWeight: 'bold' }}>Category</TableCell>
                  <TableCell align="left" sx={{ color: 'black', fontSize: 17, fontWeight: 'bold' }}>Delete</TableCell>
                  <TableCell align="left" sx={{ color: 'black', fontSize: 17, fontWeight: 'bold' }}>Edit</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {articles.map((art, index) => (
                  <TableRow key={art._id} sx={{ '&:last-child td, &:last-child th': { border: 0 }, bgcolor: '#6C7073' }}>
                    <TableCell align="left" sx={{ color: 'white', fontSize: 16, fontWeight: 'semibold' }}>{new Date(art.updatedAt).toLocaleDateString()}</TableCell>
                    <TableCell align="left" sx={{ color: 'white', fontSize: 16, fontWeight: 'semibold' }}>
                      <img src={art.image} alt={art.name} className='w-20 h-10 object-cover bg-gray-500' />
                    </TableCell>
                    <TableCell align="left" sx={{ color: 'white', fontSize: 16, fontWeight: 'semibold' }}>{art.art_name}</TableCell>
                    <TableCell align="left" sx={{ color: 'white', fontSize: 16, fontWeight: 'semibold' }}>{art.category}</TableCell>
                    <TableCell align="left">
                      <Popover open={showModal && todelete === index} handler={() => handleModal(index)}>
                        <PopoverHandler>
                          <Button className='p-2' onClick={(e) => { e.stopPropagation(); handleModal(index); }}>
                            <FaDeleteLeft color='white' size={20} />
                          </Button>
                        </PopoverHandler>
                        <PopoverContent className="sm:w-[500px] sm:scale-1 scale-[0.75] sm:border-2 border-[red]">
                          <Typography variant="h6" color="blue-gray" className=''>
                            Are you sure you want to delete this article?
                          </Typography>
                          <Button variant="gradient" className="flex-shrink-0" onClick={(e) => { e.stopPropagation(); deleteArt(art._id); handleModal(index); }}>
                            Delete
                          </Button>
                        </PopoverContent>
                      </Popover>
                    </TableCell>
                    <TableCell align="left">  <Button onClick={(e)=> { e.stopPropagation(); UpdateArticle(art.artId)}} >Edit</Button> </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
        {showMore && (
          <button onClick={handleShowMore} className='w-full text-teal-500 self-center text-sm py-7'>
            Show more
          </button>
        )}
      </div>
    </>
  );
};

export default MyArticles;
