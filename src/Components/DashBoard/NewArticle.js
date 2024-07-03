import React from 'react'
import { Button } from '@material-tailwind/react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Alert, FileInput, Select, TextInput } from 'flowbite-react';

const NewArticle = () => {
  return (
    <div className="md:w-[60vw]  min-w-[80vw] bg-black rounded-lg shadow-lg m p-6 flex flex-col items-center border-2 text-black gap-4">    
     <p className='lg:text-[30px] font-bold text-[20px] text-white'> Write A New Article </p>
    
    <form className='flex flex-col lg:w-[60%]  gap-4 w-[100%] border-2 p-4 bg-[#170908]'>
        <div className='flex flex-col gap-4 sm:flex-row justify-between'>
          <input
            type='text'
            placeholder='Title'
            required
            id='title'
            className='flex-1 text-center rounded-[20px] outline-none'

          />
         
<select id="cars" className='text-lg  h-fit flex flex-1'>
  <option value="default" >Choose Category</option>
  <option value="volvo" >Volvo</option>
  <option value="saab "  >Saab</option>
  <option value="opel"  >Opel</option>
  <option value="audi"  >Audi</option>
</select>
  
        </div>
        <div className=' md:flex-row lg:flex-row flex flex-col gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-1    '>
          <FileInput 
            type='file'
            accept='image/*'
           />
          <Button
            type='button'
            color='black'
            size='sm'
            outline

            
            
          >
           Upload
          </Button>
        </div>
      
          <img
            // src={formData.image}
            alt='upload'
            className='w-full auto object-cover'
          />
    
        <ReactQuill
          theme='snow'
          placeholder='Write something...'
          className='h-72  mb-12 text-white'
          required
         
        />
        <Button type='submit' color='green'>
          Publish
        </Button>
      </form>      
    </div>
  )
}

export default NewArticle
