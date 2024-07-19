import * as React from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { Button } from '@material-tailwind/react';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views-react-18-fix';
import { autoPlay } from 'react-swipeable-views-utils';
import { useNavigate } from 'react-router-dom';


///////////////////////////////////////////////////////////////

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const truncateContent = (htmlString, wordLimit) => {
    const div = document.createElement('div');
    div.innerHTML = htmlString;
    const text = div.textContent || div.innerText || '';
    const words = text.split(' ').slice(0, wordLimit).join(' ');
    return words+"...";
  };


  ///////////////////////////////////////////////////////////////


function RandomCard( {home}) {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const [articles, setArticles] = React.useState([]);
  const navigate= useNavigate()

  const maxSteps = articles.length;


  ///////////////////////////////////////////////////////////////

  useEffect(() => {
    const myarticles = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_ARTICLE_END}/retrieve?limit=8&ranDom=${true}`);
        if (res.status === 200) {
          setArticles(res.data.resData);
          // console.log(res.data.resData);
        }
      } catch (error) {
        // console.log(error);
      }
    };
    myarticles();
  }, []);


  ///////////////////////////////////////////////////////////////


  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  const showArticle=( artId )=>
    {
        
      navigate(`/article?unique=${artId}`)
    // window.location.href = `/article?unique=${artId}`;
  
    }


    ///////////////////////////////////////////////////////////////


  return (
    <Box className='lg:h-auto h-300px max-h-300px md:px-[80px] ' sx={{ width:'90vw', flexGrow: 1 ,  bgcolor: 'black'}}>
      <Paper  
        square
        elevation={0}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: 50,
          bgcolor:'black',
          marginBottom:5,         
          color:'white',
          fontSize:'30px',
          fontWeight:'semibold'
        }}
      >
        {articles.length > 0 && (
        home ? "Read Recents...." :"Similar Reads....."
        )}
      </Paper>
      <AutoPlaySwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {articles.map((art, index) => (
          <div key={art.artId}>
            {Math.abs(activeStep - index) <= 2 &&
             <div className='flex flex-col md:flex-row p-3  border-teal-700 justify-between items-center rounded-tl-3xl rounded-br-3xl text-center bg-gray-200 w-full md:max-h-[320px] md:h-[320px] md:min-h-[320px] h-[200px] min-h-[200px] max-h-[200px] '>



             <div className="lg:flex-1 gap-0  flex md:flex-col  justify-center items-center w-fit  mx-auto md:h-[250px] h-fit overflow-hidden">
                 <h2 className='md:text-2xl text-xl text-gray-900 font-semibold '>
                    {truncateContent(art.art_name, 3)}
                 </h2>
                <div  className=' text-gray-700 text-left p-3 md:block hidden lg:max-h-[50%]'
           dangerouslySetInnerHTML={{ __html: truncateContent(art.content, 20)}}>
                </div>
                 <Button variant='gradient' size='sm' className='text-white hidden md:block'
                 onClick={(e)=> {showArticle(art.artId)}}>
                    Visit page
                 </Button >
             </div>
             <div className="flex-1 flex flex-col  justify-center items-center   mx:auto max-h-[140px] md:max-h-[250px] md:h-[250px] gap-2   overflow-hidden md:w-fit  w-[90%]">
                 <img src={art.image}  className='rounded-[14px] md:max-h-none max-h-[80px] w-full h-full' />
                 <Button variant='gradient' size='sm' className='text-white md:hidden block'
                 onClick={(e)=> {showArticle(art.artId)}}>
                    Visit page
                 </Button >
             </div>
         </div>
            }
          </div>
        ))}

        
      </AutoPlaySwipeableViews>
      <MobileStepper 
      sx={{bgcolor:'#101110', color:'white', display:'flex', justifyContent:'center'}}
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        nextButton={
          <Button className='hidden lg:flex'
          size="sm" 
          
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
          >
            
            {theme.direction === 'rtl' ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button className='hidden lg:flex'  size="sm" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === 'rtl' ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            
          </Button>
        }
      />
    </Box>
  );
}

export default RandomCard;
