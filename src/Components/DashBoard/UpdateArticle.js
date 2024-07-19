import React, { useEffect, useState } from 'react';
import { Alert, FileInput, Select, TextInput } from 'flowbite-react';
import { Button } from '@material-tailwind/react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../Auth/Firebase';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useNavigate, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
import { MdOutlineFileUpload } from 'react-icons/md';
import { useSelector } from 'react-redux';
import Highlight from '../Essantials/Highlight';

const categories = [
  'Algorithms for DS',
  'Data Structures',
  'Languages',
  'Machine Learning',
  'Web Development',
];

const UpdateArticle = () => {
  const [file, setFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [done, setDone] = useState(false);
  const [formData, setFormData] = useState({
    art_name:'',
    artId:'',
    category:"", 
    image:''
  });
  const [artId, setArtId] = useState('');
  const user = useSelector((state) => state.user.user);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {


      const fetchArticle = async () => {
        try {
        
          const urlParams = new URLSearchParams(location.search)
            const uid = urlParams.get('uid');

            console.log(uid)
            if(uid)
            {

              const res = await axios.get(`${process.env.REACT_APP_ARTICLE_END}retrieve?userId=${user._id}&artId=${uid}`);
              if (res.status === 200 ) {
                const article = res.data.resData[0];
                setFormData(article);
                
              }
            }
            
        } catch (error) {
          // console.error('Error fetching article:', error);
        }
      };
      fetchArticle();
    
    }, [location.search])


    ///////////////////////////////////////////////////////////////

  const handleUploadImage = async () => {
    try {
      if (!file) {
        setImageUploadError('Please select an image');
        return;
      }
      setImageUploadError(null);
      const storage = getStorage(app);
      const fileName = new Date().getTime() + '-' + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageUploadProgress(progress.toFixed(0));
        },
        (error) => {
          setImageUploadError('Image upload failed');
          setImageUploadProgress(null);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageUploadProgress(null);
            setImageUploadError(null);
            setFormData({ ...formData, image: downloadURL });
          });
        }
      );
    } catch (error) {
      setImageUploadError('Image upload failed');
      setImageUploadProgress(null);
      console.log(error);
    }
  };


  ///////////////////////////////////////////////////////////////

  const handleSubmit = async (e) => {
    e.preventDefault();
    setDone(true);
    try {
      console.log(formData)
      const res = await axios.put(`${process.env.REACT_APP_ARTICLE_END}update`, formData);
      if (res.status === 200) {
        toast.success(res.data.message);
        navigate('/resources');
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    } finally {
      setDone(false);
    }
  };


  ///////////////////////////////////////////////////////////////


  return (
    <div className="md:w-[60vw] min-w-[80vw] bg-black rounded-lg shadow-lg p-6 flex flex-col items-center  text-black gap-4">
      <span className='text-[35px] mb-8'>
        <Highlight text={"Update Article.."} />
      </span>
      <form className='flex flex-col  lg:w-[80%] gap-4 w-full  mt-4 py-2 bg-gray-300  rounded-[10px] p-1' onSubmit={handleSubmit}>
        <div className='flex flex-col gap-4 sm:flex-row justify-between '>
          <input
            type='text'
            placeholder='Title'
            required
            id='title'
            value={formData.art_name}
            className='flex-1 text-start px-5 rounded-[20px] py-1 outline-none'
            onChange={(e) =>
              setFormData({ ...formData, art_name: e.target.value })
            }

          />

          <select id="cars" className='text-md py-1 flex flex-1 rounded-[20px] outline-none'
          value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })}>

            <option default >Choose Category</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

        </div>
        <div className='flex flex-row h-fit items-center justify-between border-2 border-gray-700 rounded-[8px]  p-1    '>
          <FileInput
            type='file'
            required
            accept='image/*'
            className='bg-white border border-gray-500 rounded-[7px]'
            onChange={(e) => setFile(e.target.files[0])}

          />
          <Button
            type='button'
            color='black'
            outline
            onClick={handleUploadImage}
            disabled={imageUploadProgress}
            className={`${imageUploadProgress && 'p-1'}  md:text-[12px] text-[8px] `}



          >
            {imageUploadProgress ? (
              <div className='w-8 h-8  '>
                <CircularProgressbar
                  value={imageUploadProgress}
                  text={`${imageUploadProgress || 0}%`}
                />
              </div>
            ) : <MdOutlineFileUpload size={17} />}
          </Button>

        </div>

        {imageUploadError && <Alert color='failure'>{imageUploadError}</Alert>}
        {formData.image && (
          <img
            src={formData.image}
            alt='upload'
            className='w-full h-72 object-cover border-2 rounded-[14px] border '
          />
        )}

        <ReactQuill
          theme='snow'
          placeholder='Write something...'
          className='h-72  mb-12 text-white sm:min-h-fit min-h-[500px]'
          required
          value={formData.content}
          onChange={(value) => {
            setFormData({ ...formData, content: value });
          }}

        />
        <Button type='submit' color='green' disabled={done} className='md:mt-0 mt-7  self-center w-[300px] max-w-full '>
          Publish
        </Button>
        {/* {publishError && (
          <Alert className='mt-5' color='failure'>
            {publishError}
          </Alert>
        )} */}

      </form>
    </div>
  );
};

export default UpdateArticle;
