import { Alert, Button, Modal, ModalBody, TextInput } from 'flowbite-react';
import { useEffect, useRef, useState } from 'react';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../Auth/Firebase';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Person } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
import { setUser } from '../Redux/UserSlice';
import { MdDeleteForever } from "react-icons/md";
import { FaSignOutAlt } from "react-icons/fa";
import { FaUserEdit } from "react-icons/fa";
import { FaUserCheck } from 'react-icons/fa6';

export default function UserDetails({user}) {
  const currUser = useSelector((state) => state.user.user);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const [imageFileUploading, setImageFileUploading] = useState(false);
  const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
  const [updateUserError, setUpdateUserError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ _id:currUser._id});
  const [updating, setUpdating] = useState(true)
  const [toDelete, setToDelete] = useState('')
  const [edit, setEdit]  = useState(false)
  const filePickerRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };
  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);

  const uploadImage = async () => {
    setImageFileUploading(true);
    setImageFileUploadError(null);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + imageFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

        setImageFileUploadProgress(progress.toFixed(0));
      },
      (error) => {
        setImageFileUploadError(
          'Could not upload image (File must be less than 2MB)'
        );
        setImageFileUploadProgress(null);
        setImageFile(null);
        setImageFileUrl(null);
        setImageFileUploading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileUrl(downloadURL);
          setFormData({ ...formData, profilePicture: downloadURL });
          setEdit(true)
          setImageFileUploading(false);
          setUpdating(false)
        });
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    setUpdating(false)
  };

 
    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_END}/logout`);
            if (res.data.success) {
                toast.success(res.data.message);
            }
            dispatch(setUser({}));
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    }

    const updateUser = async () => {
        try {
            if(!edit)
                {
                return  ; 
                } 
            if(updating) 
            {
                // setUpdateUserSuccess("No changes to comiit!")
                toast.error("No changes to commit!")
                // setUpdating(false)

                return;
            }
           console.log(formData)
            
            const res = await axios.put(`${process.env.REACT_APP_API_END}update`, formData);
            if (res.status) {
                // toast.success(res.data.message);
                toast.success(res.data.message)
                  console.log(res.data.message)
                dispatch(setUser(res.data.updatedUser));
            }
            // navigate("/");
        } catch (error) {
            console.log(error);
        }
    }






    const deleteUser = async () => {
        try {


            // const duser = user._id
            if(toDelete !== user.email) 
            {
              toast.error("Incorrect Email!")
              setShowModal(false)
              return;
            }

            const res = await axios.delete(`${process.env.REACT_APP_API_END}delete`, {
                data: { email: user.email },
            });
            if(res.status)
            {
              
              toast.success(res.data.message)
              dispatch(setUser({}));
              navigate("/");
            }
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <div className='m px-12 lg:w-fit pb-3 w-full border h-fit md:min-h-[400px] lg:min-w-[40vw] md:min-w-[80vw] 
     bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 rounded-[20px] '>
      <h3 className='my-7 text-center font-semibold text-4xl'>Profile</h3>
      <form onSubmit={updateUser} className='flex flex-col gap-4'>
        <input
          type='file'
          accept='image/*'
          onChange={handleImageChange}
          ref={filePickerRef}
          hidden
          disabled={!edit || user._id!==currUser._id}
        />
        <div
          className='relative w-32 h-32 self-center  cursor-pointer shadow-md overflow-hidden rounded-full'
          onClick={() => filePickerRef.current.click()}
        >
          {imageFileUploading && (
            <CircularProgressbar
              value={imageFileUploadProgress || 0}
              text={`${imageFileUploadProgress}%`}
              strokeWidth={5}
              styles={{
                root: {
                  width: '100%',
                  height: '100%',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                },
                path: {
                  stroke: `rgba(62, 152, 199, ${
                    imageFileUploadProgress / 100
                  })`,
                },
              }}
            />
          )}
          <img 
            src={ formData.profilePicture||user.profilePicture || <Person/>}
            alt='userpic'
            className={`rounded-full w-full h-full object-cover border-8 ${
              imageFileUploadProgress &&
              imageFileUploadProgress < 100 &&
              'opacity-60'
           
            }    ${ edit ?  'border-gray-200' : ' border-teal-100'}`}
            
          />
        </div>
        {imageFileUploadError && (
          <Alert color='failure'>{imageFileUploadError}</Alert>
        )}
        <TextInput
          type='text'
          id='fullName'
          placeholder='username'
          defaultValue={user.fullName}
          onChange={handleChange}
          disabled={!edit || user._id!==currUser._id}
        />
         <TextInput 
          type='email'
          id='email'
          placeholder='email'
          defaultValue={user.email}
          onChange={handleChange}
          disabled={true}
        />
  
        
      
      </form>
      {
          currUser._id ===user._id &&
      <div className='text-red-500 flex justify-between mt-5'>
         <MdDeleteForever className='cursor-pointer' size={25} color='red' onClick={() => setShowModal(true)} />
        <FaSignOutAlt className='cursor-pointer' size={25} color='orange' onClick={logoutHandler}/>   
         

        
         {edit? <FaUserCheck className='cursor-pointer' size={25} color='blue' onClick={()=>{updateUser(); setEdit(!edit)}}/> :<FaUserEdit className='cursor-pointer' size={25} color='green' onClick={()=>{updateUser(); setEdit(!edit)}}/> }
      
      </div>
      }
      
       <Modal className='relative z-[240] bg-[#ffffff45] pt-[20vh] '
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size='md'
      >
        <Modal.Header className='hidden'></Modal.Header>
        
        <Modal.Body className='bg-black rounded-[20px] '>
          <div className='text-center'>
            <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 my-auto mx-auto' />
            <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
             Enter your email to proceed!
            </h3>
            <input 
          type='email'
          className='rounded-[10px] max-w-3xl w-full'
          id='mail'
          placeholder=''
          onChange={(e)=>setToDelete(e.target.value)}
          value={toDelete}
          // defaultValue={user.email}
          // onChange={handleChange}
          // disabled={!edit || user._id!==currUser._id}
        />

            <div className='flex justify-center gap-4 mt-4'>
              <Button color='gray' size={'sm'} onClick={deleteUser}>
                Delete
              </Button>
              <Button color='gray' size={'sm'} onClick={() => setShowModal(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}