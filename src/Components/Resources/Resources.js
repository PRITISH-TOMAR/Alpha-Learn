import React from 'react'
import { Select, TextInput } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ResCard from './ResCard';
import {  Spinner } from 'flowbite-react';
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





const Resources = () => {

  const [sidebarData, setSidebarData] = useState({
    search: '',
    order: 'asc',
    category: '',
  });

  // console.log(sidebarData);
  // const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showMore, setShowMore] = useState(true);
  const [result, setResult] = useState([]);

  const location = useLocation();

  const navigate = useNavigate();


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
        console.log(error.message);
      }
    }


    fetchRsult();



  }, [location])
  
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
      console.log(error.message);
    }
  };


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


  const resetAll = () => {

    sidebarData.category = ""
    sidebarData.search = ""
    sidebarData.order = ""
    navigate(`/resources`)


  }
  
  return (
    <div className='flex flex-col   lg:flex-row'>

      
      <div className='p-7 border-b md:border-r lg:min-h-screen border-gray-500 border'>
        <form className='flex lg:flex-col gap-8 text-sm text-gray-200 flex-wrap w-full' onSubmit={handleSubmit}>
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
              <option value='desc' >Latest</option>
              <option default value='asc'>Oldest</option>
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
      <div className='flex w-full h-full justify-center items-center'>
        <Spinner size='2xl' />
      </div>
  :
<>
      <ResCard result={result} showMore={showMore} handleShowMore={handleShowMore} />

     
</>
}




    </div>
  )
}

export default Resources
