
  import { Button, Spinner } from 'flowbite-react';
  import { useEffect, useState } from 'react';
  import axios from 'axios';
  import { Link, useParams } from 'react-router-dom';
//   import CallToAction from '../components/CallToAction';
//   import CommentSection from '../components/CommentSection';
//   import PostCard from '../components/PostCard';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Highlight from '../Essantials/Highlight';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FaDeleteLeft } from "react-icons/fa6";

import RandomCard from './RandomCard';
import Comment from './Comment';
import { FaEdit } from "react-icons/fa";

  
  export default function ArticleTemplate() {

    const { user } =  useSelector((state) => state.user || {});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [post, setPost] = useState(null);
    const [recentPosts, setRecentPosts] = useState(null);
    const location = useLocation()
    const [artId, setArtId]= useState('')
    const [formData, setFormData]= useState('')
    const navigate = useNavigate()
  
  

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const tabFromUrl = urlParams.get('unique');
        if(tabFromUrl)
          setArtId(tabFromUrl);
        
      }, [ location.search]);
    
      useEffect(() => {
         {
          if(artId)
          {
    
            const fetchArticle = async () => {
              try {
                if(artId)
                {

                  console.log(artId)
                  const res = await axios.get(`${process.env.REACT_APP_ARTICLE_END}/retrieve?artId=${artId}`);
                  if (res.status === 200) { 
                    if(res.data.resData)
                      
                      setFormData(res.data.resData[0]);
                      setLoading(false)
                      console.log(res.data.resData);
                    }
                  }
                  } catch (error) {
                    console.error('Error fetching article:', error);
                  }
                };
            fetchArticle();
          }
        }
      }, [artId]);

      const UpdateArticle=( artId )=>
        {
          navigate(`/dashboard?tab=update&uid=${artId}`)
      
        }

      const deleteArt = async (_id) => {
        // console.log(_id); // Ensure _id is logged correctly for debugging
      
        try {
          const res = await axios.delete(`${process.env.REACT_APP_ARTICLE_END}/delete`, {
            data: { _id, userId: user && user._id } // Ensure _id is correctly passed in the data object
          });
      
          if (res.status === 200) {
            // setDeleted(true)
            navigate('/')
            toast.success(res.data.message);
          } else {
            toast.error(res.data.message);
          }
        } catch (error) {
          console.error('Error deleting article:', error);
          toast.error('Something went wrong!');
        }
      };
      
    
    if (loading)
      return (
        <div className='flex justify-center items-center min-h-screen'>
          <Spinner size='xl' />
        </div>
      );
    return (
      <main className='p-3 flex flex-col max-w-6xl mx-auto w-full min-h-screen'>
        <h1 className='lg:text-4xl text-[28px] mt-10 p-3 w-fit text-gray-200 font-semibold  lg:text-4xl border-b '>
         <Highlight text={ formData.art_name} />


        </h1>

        <div className='flex  items-center justify-between text-gray-400'>
           
            <span className='pl-2'>Last Updated at : {new Date(formData.updatedAt).toLocaleDateString()}</span>
            {

(user &&  user._id == formData.userId) &&

<FaEdit color='white' className='cursor-pointer' size={20}  onClick={(e)=> {  UpdateArticle(formData.artId)}}/>
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
          <Link to={`/resources?category=${ formData.category}`}>
          <Button className='bg-gray-600 font-normal lowercase text-gray-100 border-none'   pill size='sm'>
          # { formData.category}
          </Button>
          </Link>
          <Button className='bg-gray-600 font-normal lowercase text-gray-100 border-none'   pill size='sm'>
          { formData.artId}
          </Button>
          </div>
     
          <span className='italic text-md place-self-end'>
            { (formData.content.length / 1000).toFixed(0)} mins read
          </span>
        </div>
        </div>
        <div>
        <style>{`
          .post-content h1, 
          .post-content h2, 
          .post-content h3, 
          .post-content h4, 
          .post-content h5, 
          .post-content h6 {
            font-weight: semi-bold;
            color:white
          }
            .post-content img{
             display: block;
  margin: 0 auto;
  border: 2px solid red;
            }

            
        `}</style>
        

        <div
          className='p-3 max-w-4xl mx-auto w-full post-content flex flex-col    text-lg text-gray-300'
          dangerouslySetInnerHTML={{ __html:  formData.content }}
        ></div>
        </div>
        <div className='mx-auto mt-8 w-fit gap-2 flex justify-center items-center  border-2 border-gray-900 flex-col max-w-[80vw] '>
       
              <RandomCard />
              <Comment artId= {artId} />
              </div>

        {/* <div className='max-w-4xl mx-auto w-full'>
          <CallToAction />
        </div>
        <CommentSection postId={post._id} />
  
        <div className='flex flex-col justify-center items-center mb-5'>
          <h1 className='text-xl mt-5'>Recent articles</h1>
          <div className='flex flex-wrap gap-5 mt-5 justify-center'>
            {recentPosts &&
              recentPosts.map((post) => <PostCard key={post._id} post={post} />)}
          </div>
        </div> */}


      </main>
    );
  }