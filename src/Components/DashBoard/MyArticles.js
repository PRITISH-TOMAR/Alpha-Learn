import { React, useState, useEffect } from 'react';
import { Button } from '@material-tailwind/react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { FaDeleteLeft } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
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
import { FaCaretDown } from "react-icons/fa";
import { FaCaretUp } from "react-icons/fa";
import { Modal, Spinner } from 'flowbite-react';
///////////////////////////////////////////////////////////////


function DateForm(dateString) {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}


///////////////////////////////////////////////////////////////

const MyArticles = () => {
  const currUser = useSelector((state) => state.user.user);
  const [articles, setArticles] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [todelete, setTodelete] = useState(null); // Track the index of the row to be deleted
  const [deleted, setDeleted] = useState(false); // Track the index of the row to be deleted
  const [loading, setLoading] = useState(true); // Track the index of the row to be deleted
  const [order, setOrder] = useState('asc');
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState({});



  ///////////////////////////////////////////////////////////////


  useEffect(() => {
    const url = new URLSearchParams(location.search);
    let urlUser = url.get('user');
    if (!urlUser) urlUser = currUser.uniqueName;

    const getUser = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_END}user?user=${urlUser}`);
        if (res.status) {
          setUser(res.data.item);
          // console.log(res.data.item);
        }
      } catch (e) {
        console.log(e);
      }
    };
    getUser();
  }, [location]);



  ///////////////////////////////////////////////////////////////


  useEffect(() => {
    const myarticles = async () => {
      try {
        // console.log("clciked")
        const res = await axios.get(`${process.env.REACT_APP_ARTICLE_END}retrieve?userId=${user._id}&order=${order}`);
        if (res.status) {
          setArticles(res.data.resData);
          if (res.data.resData.length < 9) setShowMore(false);
        }
      } catch (error) {
        console.log(error);
      }
    };
    myarticles();
  }, [user, deleted, order]);



  ///////////////////////////////////////////////////////////////

  const handleModal = (index) => {
    setTodelete(index);
    setShowModal(!showModal);
  };

  const UpdateArticle = (artId) => {
    navigate(`/dashboard?tab=update&uid=${artId}`);
  };

  const showArticle = (artId) => {
    navigate(`/article?unique=${artId}`);
  };


  ///////////////////////////////////////////////////////////////

  const deleteArt = async (_id) => {
    try {
      const res = await axios.delete(`${process.env.REACT_APP_ARTICLE_END}/delete`, {
        data: { _id, userId: user._id },
      });

      if (res.status === 200) {
        setDeleted(true);
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error('Error deleting article:', error);
      toast.error('Something went wrong!');
    }
  };


  ///////////////////////////////////////////////////////////////

  const handleShowMore = async () => {
    const startIndex = articles.length;
    try {
      const res = await axios.get(`${process.env.REACT_APP_ARTICLE_END}retrieve?userId=${user._id}&startIndex=${startIndex}&order=${order}`);
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

  const changeOrder = () => {
    if (order == 'asc') setOrder('desc');
    else setOrder('asc');
  };


  useEffect(()=>
  {
    setTimeout(() => {
      setLoading(false)
    }, 3000);
  }, [])


  ///////////////////////////////////////////////////////////////
if(loading) 
  return (
    <div className='flex justify-center items-center min-w-full min-h-screen'>
      <Spinner size='xl' />
    </div>
  );

  return (
    <>
      <div className="w-full bg-black rounded-lg shadow-lg p-4 flex flex-col items-center text-white">
        {!articles.length ? (
          <div className="min-w-full min-h-full gap-6 flex flex-col justify-center items-center">
            <Typography variant="h4">Seems like you have no articles!</Typography>
            <Link to="/dashboard?tab=create">
              <Button variant="gradient" size="md">
                Write New
              </Button>
            </Link>
          </div>
        ) : (
          <TableContainer component={Paper} className="mt-8 border border-teal-200">
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow className="bg-gray-200">
                  <TableCell align="left" sx={{ color: 'black', fontSize: 17, fontWeight: 'bold', display: 'flex' }}>
                    Date Created
                    <span className="cursor-pointer" onClick={changeOrder}>
                      {order == 'asc' ? <FaCaretDown /> : <FaCaretUp />}
                    </span>
                  </TableCell>
                  <TableCell align="left" sx={{ color: 'black', fontSize: 17, fontWeight: 'bold' }}>Image</TableCell>
                  <TableCell align="left" sx={{ color: 'black', fontSize: 17, fontWeight: 'bold' }}>Title</TableCell>
                  <TableCell align="left" sx={{ color: 'black', fontSize: 17, fontWeight: 'bold' }}>Category</TableCell>
                  {user._id === currUser._id && (
                    <>
                      <TableCell align="left" sx={{ color: 'black', fontSize: 17, fontWeight: 'bold' }}>Delete</TableCell>
                      <TableCell align="left" sx={{ color: 'black', fontSize: 17, fontWeight: 'bold' }}>Edit</TableCell>
                    </>
                  )}
                </TableRow>
              </TableHead>
              <TableBody>
                {articles.map((art, index) => (
                  <TableRow
                    key={art._id}
                    className={index % 2 === 0 ? 'table-row-even' : 'table-row-odd'}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell align="left" sx={{ color: 'white', fontSize: 16, fontWeight: 'semibold' }}>
                      {DateForm(new Date(art.createdAt).toLocaleDateString())}
                    </TableCell>
                    <TableCell align="left" sx={{ color: 'white', fontSize: 16, fontWeight: 'semibold' }}>
                      <img src={art.image} alt={art.name} onClick={(e) => { e.stopPropagation(); showArticle(art.artId); }} className="w-20 h-10 object-cover bg-gray-500 cursor-pointer" />
                    </TableCell>
                    <TableCell align="left" onClick={(e) => { e.stopPropagation(); showArticle(art.artId); }} sx={{ color: 'white', fontSize: 16, fontWeight: 'semibold', cursor: 'pointer' }}>
                      {art.art_name}
                    </TableCell>
                    <TableCell align="left" sx={{ color: 'white', fontSize: 16, fontWeight: 'semibold' }}>
                      {art.category}
                    </TableCell>
                    {user._id === currUser._id && (
                      <>
                        <TableCell align="left">
                          <Button className="p-2" onClick={(e) => { e.stopPropagation(); handleModal(index); }}>
                            <FaDeleteLeft color="white" size={15} />
                          </Button>
                          <Modal
                            className="relative z-[240] bg-[#ffffff45] md:pt-[40vh] pt-[20vh]"
                            show={showModal && todelete === index}
                            onClose={() => setShowModal(false)}
                            popup
                            size="md"
                          >
                            <Modal.Header className="hidden"></Modal.Header>
                            <Modal.Body className="border-2 border-black">
                              <div className="text-center">
                                <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
                                  Are you sure you want to delete this article?
                                </h3>
                                <div className="flex justify-center gap-4 mt-4">
                                  <Button color="red" size="sm" onClick={(e) => { e.stopPropagation(); deleteArt(art._id); handleModal(index); }}>
                                    Delete
                                  </Button>
                                  <Button color="gray" size="sm" onClick={() => setShowModal(false)}>
                                    Cancel
                                  </Button>
                                </div>
                              </div>
                            </Modal.Body>
                          </Modal>
                        </TableCell>
                        <TableCell align="left">
                          <Button className="p-2" onClick={(e) => { e.stopPropagation(); UpdateArticle(art.artId); }}>
                            <FaEdit color="white" size={15} />
                          </Button>
                        </TableCell>
                      </>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
        {articles.length && showMore && (
          <>
            <button onClick={handleShowMore} className="w-full text-teal-500 self-center text-sm py-7">
              Show more
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default MyArticles;
