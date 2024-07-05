import {React, useState, useEffect} from 'react'
import { Button } from '@material-tailwind/react'
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Modal, Table } from 'flowbite-react';
import { useSelector } from 'react-redux';
import { HiOutlineExclamationCircle } from 'react-icons/hi';

import Highlight from '../Essantials/Highlight'

// import { set } from 'mongoose';


const MyArticles = () => {

  const { user } = useSelector((state) => state.user);
  const [articles, setArticles] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [todelete, setTodelete] = useState('');


  useEffect(() => {
   

    const myarticles = async () => {
      try {
          const res = await axios.get(`${process.env.REACT_APP_ARTICLE_END}retrieve?userId=${user._id}`);
          // console.log(res.data.resData)
          
          if(res.status)
          {

            setArticles(res.data.resData)
            if (res.data.resData.length < 9) 
              setShowMore(false);
            console.log(articles)
         
          }
         
         
      } catch (error) {
          console.log(error);
      }
    }
      
    
    myarticles();
    
  }, [user._id]);
    
  const handleShowMore = async () => {
    const startIndex = articles.length;
    try {
      const res = await axios.get(`${process.env.REACT_APP_ARTICLE_END}retrieve?userId=${user._id}&startIndex=${startIndex}`);
      // console.log(res.data.resData)
      
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
     <div className="w-full  bg-black rounded-lg shadow-lg p-4  flex flex-col items-center  text-white"> 

      <span className='text-[35px] mb-8'>
        
      <Highlight text={"My Articles.."} />
      </span>


   { !articles.length &&
  <Link to ="/dashboard?tab=create">
    <Button variant="gradient" size="md" >
                      Write New
                    </Button>
    </Link>
    }



<div className=' max-w-[80vw]  md:w-[99%]  table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 '>
     
        
          <Table hoverable className='shadow-md bg-red'>
            <Table.Head className='text-gray-500 text-md'>
              <Table.HeadCell>Date updated</Table.HeadCell>
              <Table.HeadCell>Article image</Table.HeadCell>
              <Table.HeadCell>Article title</Table.HeadCell>
              <Table.HeadCell>Category</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
              <Table.HeadCell>
                <span>Edit</span>
              </Table.HeadCell>
            </Table.Head>
            {articles.map((art) => (
              <Table.Body className='divide-y'>
                <Table.Row className='bg-gray-600 text-gray-100'>
                  <Table.Cell>
                    {new Date(art.updatedAt).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>
         {/* <Link to={`/post/${post.slug}`}> */}
                      <img
                        src={art.image}
                        alt={art.art_name}
                        className='w-20 h-10 object-cover bg-gray-500'
                      />
                    {/* </Link>  */}
                  </Table.Cell>
                  <Table.Cell>
                    {/* <Link
                      className='font-medium text-gray-900 dark:text-white'
                      to={`/post/${post.slug}`}
                    > */}
                      {art.art_name}
                    {/* </Link> */}
                  </Table.Cell>
                  <Table.Cell>{art.category}</Table.Cell>
                  <Table.Cell>
                    <span
                      onClick={() => {
                        setShowModal(true);
                        setTodelete(art._id);
                      }}
                      className='font-medium text-red-500 hover:underline cursor-pointer'
                    >
                      Delete
                    </span>
                  </Table.Cell>
                  <Table.Cell>
                    {/* <Link
                      className='text-teal-500 hover:underline'
                      to={`/update-post/${post._id}`}
                    > */}
                      <span>Edit</span>
                    {/* // </Link> */}
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            ))}
          </Table>



          
          </div>


          {showMore && (
            <button
              onClick={handleShowMore}
              className='w-full text-teal-500 self-center text-sm py-7'
            >
              Show more
            </button>
          )}
    </div>
    </>
  )
}

export default MyArticles
