import React from 'react'
import { Alert, FileInput, Select, TextInput } from 'flowbite-react';
import { Button } from '@material-tailwind/react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';

import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../Auth/Firebase';
import { useState } from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { MdOutlineFileUpload } from "react-icons/md";
import './Quell.css'


const categories = [
  'Algorithms for DS',
  'Data Structures',
  'Languages',
  'Machine Learning',
  'Web Development',
];



///////////////////////////////////////////////////////////////



const NewArticle = () => {

  const [file, setFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [done, setDone] = useState(false)
  const { user } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({ userId: user._id });

  const navigate = useNavigate();


///////////////////////////////////////////////////////////////


  const handleUpdloadImage = async () => {
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
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
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
    try {
      e.preventDefault();
      setDone(true)

      console.log(formData)

      const res = await axios.post(`${process.env.REACT_APP_ARTICLE_END}create`, formData, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true
      });


      // navigate("/");

      if (res.data.success) {
        // setPublishError(res.data.message);
        toast.success(res.data.message);
        navigate("/resources")

        return;
      }
      else {
        // setPublishError(res.data.message);
        toast.error(res.data.message);

      }



    } catch (error) {
      console.log(error)
      toast.error('Something went wrong');
    }
    finally {
      setDone(false)
    }
  }


  ///////////////////////////////////////////////////////////////



  return (
    <div className=" min-w-full  px-2  rounded-lg shadow-lg py-3 flex flex-col items-center  text-black gap-4">

      <form className='flex flex-col  lg:w-[80%] gap-4 w-full  mt-4 py-2 bg-gray-300  rounded-[10px] p-1' onSubmit={handleSubmit}>
        <div className='flex flex-col gap-4 sm:flex-row justify-between '>
          <input
            type='text'
            placeholder='Title'
            required
            id='title'
            className='flex-1 text-start px-5 rounded-[20px] py-1 outline-none'
            onChange={(e) =>
              setFormData({ ...formData, art_name: e.target.value })
            }

          />

          <select id="cars" className='text-md py-1 flex flex-1 rounded-[20px] outline-none'
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
        <div className='flex flex-row  items-center justify-between border-2 border-gray-700 rounded-[8px]  p-1    '>
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
            onClick={handleUpdloadImage}
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
            className='w-full h-72 object-cover border-2 rounded-[14px] border'
          />
        )}

        <ReactQuill
          theme='snow'
          placeholder='Write something...'
          className='h-72  mb-12 text-white '
          required
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
  )
}

export default NewArticle
