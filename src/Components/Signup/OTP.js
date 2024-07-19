import React, { useState, useRef, useEffect } from 'react';
import otpimg from "../Essantials/Images/otp.png";
import { Button } from '@material-tailwind/react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { ContactPageSharp } from '@mui/icons-material';

const Otp = ({props}) => {
    const {setShowOtp, showOtp, email, setVerified} = props;
  const [otp, setOtp] = useState(new Array(4).fill(''));
  const otpRef = useRef(null);
  const [clicked, setClicked] = useState(false)

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;
    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    // Focus next input
    if (element.nextSibling) {
      element.nextSibling.focus();
    }
  };

  const handleClickOutside = (event) => {
    if (otpRef.current && !otpRef.current.contains(event.target)) {
      setOtp(new Array(4).fill(''));
      setShowOtp(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


    const verifyHandler= async ()=>
    {
        const otpByUser = otp.toString().split(',').join('');
            if(!otpByUser)
            {
                toast.error("Please fill in the required fields!")
                return;
            }

            setClicked(true)
    
            try
            {
                const data = {email:email, otp :otpByUser}
                // console.log(data)
                    const res = await axios.get(`${process.env.REACT_APP_EMAIL_END}verify?otp=${otpByUser}&email=${email}`)

                    if(res.status)
                    {
                        toast.success(res.data.message)
                        setVerified(true)
                        setShowOtp(false)
                    }
         
        }
        catch(e)
        {
            toast.error("Wrong OTP entered")
            setOtp(new Array(4).fill(''));
            setClicked(false)


        }
    }
  return (
    showOtp && (
      <div ref={otpRef} className="relative h-fit md:w-[60vw] w-full z-30 bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 rounded-[20px] py-2">
        <div className="flex flex-col h-full justify-center items-center gap-4 space-x-2 my-auto">
          <h1 className='text-gray-800 font-semibold md:text-2xl'>Please enter the OTP sent to your email id:</h1>
          <img src={otpimg} alt="OTP" className='h-[150px]' />
          <div>
            {otp.map((data, index) => (
              <input
                key={index}
                type="text"
                name="otp"
                maxLength="1"
                className="w-12 h-12 text-center border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                value={data}
                onChange={(e) => handleChange(e.target, index)}
                onFocus={(e) => e.target.select()}
              />
            ))}
          </div>
          <Button onClick={()=>verifyHandler()} disabled={clicked} >Verify</Button>
        </div>
      </div>
    )
  );
};

export default Otp;
