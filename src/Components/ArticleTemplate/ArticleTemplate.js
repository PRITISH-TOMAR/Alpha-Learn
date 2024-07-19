
import { Button, Spinner } from 'flowbite-react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Highlight from '../Essantials/Highlight';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import RandomCard from './RandomCard';
import Comment from './Comment';
import { FaEdit, FaHeart } from "react-icons/fa";
import { Typography } from '@mui/material';


export default function ArticleTemplate() {

  const user = useSelector((state) => state.user.user);
  const [loading, setLoading] = useState(true);
  const location = useLocation()
  const [artId, setArtId] = useState('')
  const [formData, setFormData] = useState('')
  const [liked, setLiked] = useState(false)
  const navigate = useNavigate()



  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('unique');
    if (tabFromUrl)
      setArtId(tabFromUrl);

  }, [location.search]);

  useEffect(() => {
    {
      if (artId) {

        const fetchArticle = async () => {
          try {
            if (artId) {

              const res = await axios.get(`${process.env.REACT_APP_ARTICLE_END}/retrieve?artId=${artId}`);
              if (res.status === 200) {
                if (res.data.resData)

                  setFormData(res.data.resData[0]);
                setLoading(false)
              }
            }
          } catch (error) {
          }
        };
        fetchArticle();
      }
    }
  }, [artId, liked]);

  const UpdateArticle = (artId) => {
    navigate(`/dashboard?tab=update&uid=${artId}`)

  }

  ////////////////////////////////////////////////////////////////////////////////////////////

  const deleteArt = async (_id) => {

    try {
      const res = await axios.delete(`${process.env.REACT_APP_ARTICLE_END}/delete`, {
        data: { _id, userId: user && user._id } 
      });

      if (res.status === 200) {
        // setDeleted(true)
        navigate('/')
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error('Something went wrong!');
    }
  };



  /////////////////////////////////////////////////
  const handleLike = async (id) => {
    try {
      if (!user && !user._id) {
        navigate('/sign-in');
        return;
      }
      const res = await axios.put(`${process.env.REACT_APP_ARTICLE_END}like?id=${id}&user=${user.uniqueName}`);
      if (res.status) {
        setLiked(!liked)
      }
    } catch (error) {
    }
  };
  ///////////////////////////////////////////////////////////

  if (loading)
    return (
      <div className='flex justify-center items-center min-h-screen'>
        <Spinner size='xl' />
      </div>
    );
  return (
    <main className='p-3 flex flex-col max-w-6xl mx-auto w-full min-h-screen'>
      <h1 className='lg:text-4xl text-[28px] mt-10 p-3 w-fit text-gray-200 font-semibold  lg:text-4xl border-b '>
        <Highlight text={formData.art_name} />


      </h1>

      <div className='flex  items-center justify-between text-gray-400'>

        <span className='pl-2'>Last Updated at : {new Date(formData.updatedAt).toLocaleDateString()}</span>
        {

          (user && user._id == formData.userId) &&

          <FaEdit color='white' className='cursor-pointer' size={20} onClick={(e) => { UpdateArticle(formData.artId) }} />
        }
      </div>



      {/* <img
          src={ formData.image}
          alt={ formData.art_name}
          className='mt-10  max-h-[600px] self-center max-w-[700px] w-full h-full object-cover border-2 border-white rounded-[10px]'
        /> */}
      <div>
        <div className='flex justify-between px-3 py-2 mt-4 border-b  items-center border-slate-500 mx-auto w-full text-md text-gray-400'>

          <div

            className='self-center mt-5 flex justify-between gap-2 w-fit items-center'
          >
            <Link to={`/resources?category=${formData.category}`}>
              <Button className='bg-gray-600 font-normal lowercase text-gray-100 border-none' pill size='sm'>
                # {formData.category}
              </Button>
            </Link>
            <Button className='hidden md:block bg-gray-600 font-normal lowercase text-gray-100 border-none' pill size='sm'>
              {formData.artId}
            </Button>
          </div>

          <span className='italic text-md place-self-end'>
            {(formData.content.length / 1000).toFixed(0)} mins read
          </span>
        </div>
      </div>
      <div className='w-full max-w-5xl self-center'>


        <div
          className='p-3 max-w-5xl mx-auto w-full post-content flex flex-col    text-lg text-gray-300 '
          dangerouslySetInnerHTML={{ __html: formData.content }}
        ></div>

        <Typography className='text-md text-gray-500 flex justify-end items-center gap-2 pt-4 '>
          {user &&
            formData.likes.includes(user.uniqueName) ? "Thanks!"
            : "Loved it? Drop a like here!"
          }

          <button
            type='button'
            onClick={() => { user && user._id ? handleLike(formData._id) : navigate("/signup") }}
            className={`text-gray-400  ${user &&
              formData.likes.includes(user.uniqueName) &&
              'text-red-500'
              }`}
          >
            <FaHeart className='text-sm' />
          </button>


        </Typography>


      </div>


      <div className='mx-auto mt-8 w-fit gap-2 flex justify-center items-center  border-2 border-gray-900 flex-col max-w-[80vw] '>

        <RandomCard />
        <Comment artId={artId} />
      </div>


    </main>
  );
}