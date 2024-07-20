import React from 'react'
import { Select, TextInput, Spinner } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ResCard from './ResCard';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Tooltip,
  IconButton,
} from "@material-tailwind/react";
import not from "../Essantials/Images/notFound.png"
import { MdFilterList } from "react-icons/md";
import { IoIosCloseCircle } from "react-icons/io";
///////////////
import {  Dialog, DialogBackdrop, DialogPanel,} from '@headlessui/react'
///////////////

const truncateContent = (htmlString, wordLimit) => {
  const div = document.createElement('div');
  div.innerHTML = htmlString;
  const text = div.textContent || div.innerText || '';
  const words = text.split(' ').slice(0, wordLimit).join(' ');
  return words + "...";
};


const categories = [
  'Algorithms for DS',
  'Data Structures',
  'Languages',
  'Machine Learning',
  'Web Development',
];

///////////////////////////////////////////////////////////////




const Resources = () => {

  const [sidebarData, setSidebarData] = useState({
    search: '',
    order: 'asc',
    category: '',
  });
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  // console.log(sidebarData);
  // const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showMore, setShowMore] = useState(true);
  const [result, setResult] = useState([]);

  const location = useLocation();

  const navigate = useNavigate();



  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 2000);
  }, [])


///////////////////////////////////////////////////////////////


  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const search = urlParams.get('search');
    const order = urlParams.get('order');
    const category = urlParams.get('category');


    setSidebarData({
      ...sidebarData,
      search: search,
      order: order,
      category: category,
    });
///////////////////////////////////////////////////////////////


    const fetchRsult = async () => {
      try {
        const searchQuery = urlParams.toString();

        const res = await axios.get(`${process.env.REACT_APP_ARTICLE_END}retrieve?${searchQuery}`);

        if (res.status) {
          setResult(res.data.resData)
          // console.log(res.data.resData)
          if (res.data.resData.length < 9) setShowMore(false);
          else setShowMore(true)
          setLoading(false)
        }
      } catch (error) {
        // console.log(error.message);
      }
    }


    fetchRsult();



  }, [location])
  

  ///////////////////////////////////////////////////////////////

  const handleShowMore = async () => {

    const urlParams = new URLSearchParams(location.search);

    const startIndex = result.length;
    try {
      const searchQuery = urlParams.toString();

      const res = await axios.get(`${process.env.REACT_APP_ARTICLE_END}retrieve?${searchQuery}&startIndex=${startIndex}`);
      if (res.status) {
        setResult((prev) => [...prev, ...res.data.resData]);
        if (res.data.resData.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      // console.log(error.message);
    }
  };

///////////////////////////////////////////////////////////////

  const handleChange = (e) => {
    if (e.target.id === 'search') {
      setSidebarData({ ...sidebarData, search: e.target.value });
    }
    if (e.target.id === 'order') {
      const order = e.target.value;
      setSidebarData({ ...sidebarData, order: order });
    }
    if (e.target.id === 'category') {
      const category = e.target.value;
      setSidebarData({ ...sidebarData, category });
    }
  };


  ///////////////////////////////////////////////////////////////

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(sidebarData)

    const urlParams = new URLSearchParams(location.search);
    console.log(urlParams)
    const { search, order, category } = sidebarData
    if (search) urlParams.set('search', search);
    else urlParams.delete('search');
    if (order) urlParams.set('order', order);
    else urlParams.delete('order');
    if (category) urlParams.set('category', category);
    else urlParams.delete('category');

    const searchQuery = urlParams.toString();
    navigate(`?${searchQuery}`)





  }
  
  ///////////////////////////////////////////////////////////////

  const resetAll = () => {
    
    sidebarData.category = ""
    sidebarData.search = ""
    sidebarData.order = ""
    navigate(`/resources`)
    
    
  }
  
  ///////////////////////////////////////////////////////////////

  
  return (
    <>
  
     <div className=' z-40 relative lg:hidden'>

     
        <Dialog open={mobileFiltersOpen} onClose={setMobileFiltersOpen} className=" z-40  relative lg:hidden">
          <DialogBackdrop
            transition
            className="fixed inset-0  transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
          />

          <div className="fixed inset-0 z-40 flex">
            <DialogPanel
              transition
              className="relative ml-auto mt-[58px] rounded-r px-2 rounded-[18px] border-l flex h-full w-full max-w-xs transform flex-col overflow-y-auto bg-gray-900  py-4 pb-12 shadow-xl transition duration-300 ease-in-out data-[closed]:translate-x-full"
            >
              <div className="flex items-center justify-between px-4 mb-12">
                <h2 className="text-lg font-medium text-gray-200">Filters</h2>
                <button
                  
                >

                  <IoIosCloseCircle 
                  onClick={() => setMobileFiltersOpen(false)}
                  size={30}
                  className="   text-gray-400"  />
                </button>
              </div>

              {/* Filters */}
              <form className='flex flex-col gap-8 text-sm text-gray-200 flex-wrap w-full' onSubmit={handleSubmit}>
          <div className='flex  items-center gap-2'>
            <label className='whitespace-nowrap font-semibold'>
              Search:
            </label>
            <TextInput
              placeholder='Search...'
              id='search'
              type='text'
              value={sidebarData.search}
              onChange={handleChange}
            />
          </div>
          <div className='flex items-center gap-2'>
            <label className='font-semibold'>Sort:</label>
            <Select onChange={handleChange} value={sidebarData.order} id='order'>
              <option default value='asc'>Oldest</option>
              <option value='desc' >Latest</option>
              <option value='like'>Popularity</option>
            </Select>
          </div>
          <div className='flex items-center gap-2'>
            <label className='font-semibold'>Category:</label>
            <Select className='min-h-fit'
              onChange={handleChange}
              value={sidebarData.category}
              id='category'
            >
              <option value={''} default >Uncategorized</option>
              {categories.map((category) => (
        <option key={category} value={category}>
          {category}
        </option>
      ))}
            </Select>
          </div>
          <Button type='submit'  className='w-[80%] mx-auto mt-4' color='white' variant='gradient' onClick={()=>setMobileFiltersOpen(false)}>
            Apply Filters
          </Button>

          <Button onClick={resetAll} className='w-[80%] mx-auto'  color='white' variant='gradient'>
            Reset Filters
          </Button>
        </form>
            </DialogPanel>
          </div>
        </Dialog>
        </div>
        {/* /////////////////////////////////// */}
  
   
  
  
    {/* ///////////////////////////////////////////////////////// */}
    <div className='flex  lg:flex-row flex-col '>
           {/* ///////////////////////////////////////////////////////// */}
    <button
                type="button"
                onClick={() => setMobileFiltersOpen(true)}
                className= " w-full flex justify-end p-3  text-gray-400 hover:text-gray-200  lg:hidden"
              >
               
                <MdFilterList aria-hidden="true" size={26} />
              </button>
     {/* /////////////////////////////////// */}
    
     
      
      <div className='p-7 border-b md:border-r lg:min-h-screen border-gray-500 lg:block hidden'>


        <form className='lg:flex flex-col hidden gap-8 text-sm text-gray-200 flex-wrap w-full' onSubmit={handleSubmit}>
          <div className='flex  items-center gap-2'>
            <label className='whitespace-nowrap font-semibold'>
              Search:
            </label>
            <TextInput
              placeholder='Search...'
              id='search'
              type='text'
              value={sidebarData.search}
              onChange={handleChange}
            />
          </div>
          <div className='flex items-center gap-2'>
            <label className='font-semibold'>Sort:</label>
            <Select onChange={handleChange} value={sidebarData.order} id='order'>
              <option default value='asc'>Oldest</option>
              <option value='desc' >Latest</option>
              <option value='like'>Popularity</option>
            </Select>
          </div>
          <div className='flex items-center gap-2'>
            <label className='font-semibold'>Category:</label>
            <Select className='min-h-fit'
              onChange={handleChange}
              value={sidebarData.category}
              id='category'
              >
              <option value={''} default >Uncategorized</option>
              {categories.map((category) => (
                <option key={category} value={category}>
          {category}
        </option>
      ))}
            </Select>
          </div>
          <Button type='submit' color='gray' variant='gradient' >
            Apply Filters
          </Button>

          <Button onClick={resetAll}  color='gray' variant='gradient'>
            Reset Filters
          </Button>
        </form>
      </div>


      {loading ?
        <div className='flex justify-center items-center min-w-[80%] min-h-screen'>
        <Spinner size='xl' />
      </div>
  :
<>

{
  result.length ?
  <>
  
  <ResCard result={result} showMore={showMore} handleShowMore={handleShowMore} />
  </>
  :
  <div className='flex w-full justify-center items-center flex-col'>
    <img className='invert' src={not} alt="" />
    <h1 className='sm:text-4xl text-2xl text-center font-semibold text-red-300'>Oops, No results found !</h1>
  </div>
}

     
</>
}




    </div>
  </>
  )
}

export default Resources
