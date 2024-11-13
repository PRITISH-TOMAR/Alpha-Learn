import * as React from 'react';
import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import sign from '../Essantials/sign.jpg'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import toast from 'react-hot-toast'
// ////////////////////////
import Otp from "./OTP"
import Auth from '../Auth/Auth';
// ////////////////////////
import { MdOutlineVerified } from "react-icons/md";

import { useDispatch } from 'react-redux';
import { setUser } from '../Redux/UserSlice';


// import dotenv from 'dotenv'

// process.config(/)




function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link to="/" color="inherit" className='cursor-pointer'>
        AlphaLearn
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const defaultTheme = createTheme();

export default function Signup() {

  const [login, setLogin] = useState(true)
  const [loading, setLoading] = useState(false)
  const [fullName, setFullName] = useState("");
  const [showOtp, setShowOtp] = useState(false)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [forgot, setForgot] = useState(false)
  const [verified, setVerified] = useState(false);
  const navigate = useNavigate()
  const dispatch = useDispatch()

  function isValidEmail(email) {
    // Regular expression for basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function updateUrl() {
    // Get the current URL
    const currentUrl = window.location.href;

    // Retrieve the previous URL from the history stack
    window.history.back();

    // Get the updated URL after navigating back
    const updatedUrl = window.location.href;

    // Check if the previous URL is different from the current URL
    if (updatedUrl !== currentUrl) {
      window.location.replace(updatedUrl);
    } else {
      navigate("/")
    }
  }

  // Example usage:

  ///////////////////////////////////

  const loginHandler = async (e) => {
    e.preventDefault();
    // dispatch(setLoading(true));
    setLoading(true)

    if (login) {
      //login
      const user = { email, password };
      if ((!user.email || !user.password) || (user.email == ' ' || user.password == ' ')) {
        toast.error("Please fill the required fields");
        setLoading(false)
        return

      }
      try {

        const res = await axios.post(`${process.env.REACT_APP_API_END}/login`, user, {
          headers: {
            'Content-Type': 'application/json'
          },
          withCredentials: true

        });

        // console.log(user)

        if (res.data.success) {
          toast.success(res.data.message);
          // console.log(res.data)



          dispatch(setUser(res.data.user));
          // dispatch(setLoading(false));
          // navigate("/");
          updateUrl()

        }

      } catch (error) {
        toast.error(error.response.data.message);
        console.log(error);
      } finally {
        // dispatch(setLoading(false));
        setLoading(false)
      }
    } else {
      //register
      // dispatch(setLoading(true));
      setLoading(true)
      // console.log("SEttong")
      const user = { fullName, email, password };
      if (password != cpassword) {
        toast.error("Password and Confirm Password do not match.");
        setLoading(false)
        return
      }
      if ((!user.email || !user.password || !user.fullName) || (user.email == " " || user.password == " " || user.fullName == " ")) {
        toast.error("Please fill the required fields");
        setLoading(false)

        return

      }
      // console.log(user)
      try {
        const res = await axios.post(`${process.env.REACT_APP_API_END}/newuser`, user, {
          headers: {
            'Content-Type': 'application/json'
          },
          withCredentials: true
        });
        // console.log(user)
        // console.log(res)
        if (res.data.success) {
          toast.success(res.data.message);
        }
        setLogin(true);
      } catch (error) {
        toast.error(error.response.data.message);
        console.log(error);
      } finally {
        // dispatch(setLoading(false));
        setLoading(false)
      }
    }

    setFullName("")
    setEmail("")
    setPassword("")
    setCpassword("")

  }

  const sendMail = async () => {


    if (!isValidEmail(email)) {
      toast.error("Please enter a valid Email!")
      setEmail('')
      return;
    }

    try {

      
      const res = await axios.post(`${process.env.REACT_APP_EMAIL_END}send`, { email })
      if (res.status) {
        setShowOtp(true)
        toast.success("OTP sent successfully")
      }
      

    }
    catch {
      toast.error("Email Already Exists!")
    }
  }



  const changetype = () => {
    setLogin(!login)
  }

  const ResetAll = () => {
    setVerified(false)
    setEmail('')
    setPassword('')
    setCpassword('')
    setEmail('')
  }



  return (
    <ThemeProvider theme={defaultTheme}>

      <div className='relative z-23 '>

        <div className='flex items-center justify-center min-h-[100vh]  md:scale-[0.90] '>
          <div className={` ${showOtp ? 'absolute' : 'hidden'} t-0 l-0 `}>
            <Otp props={{ setShowOtp, showOtp, email, setVerified }} />
          </div>
          <Grid container component="main" className='lg:max-w-[95vw] flex justify-between  sm:justify-center '>

            <Grid item xs={12} sm={8} md={5} component={Paper} className={`${showOtp ? 'opacity-20' : ''}`} elevation={6} square sx={{
              // mx: 4,
              display: 'flex',
              justifySelf: 'center',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: 'black', // Set background color here
              color: 'text.primary', // Set text color
              padding: '15px',
              borderRadius: '8px',
              boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',


            }}>
              <Box sx={{
                // my: 1,
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                bgcolor: 'white',
                borderRadius: '20px',

              }} className='md:scale-[0.85]'>
                <Avatar sx={{ bgcolor: 'secondary.main' }}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h4" className='font-medium'>
                  {login ? "Sign In" : "Sign Up"}
                </Typography>
                <Box component="form" noValidate onSubmit={loginHandler} sx={{ mt: 1, width: '100%' }}>
                  {!login && <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="fullName"
                    label="Full Name"
                    name="fullName"
                    autoComplete="fullName"
                    autoFocus
                    variant='outlined'
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}

                  />
                  }
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    variant='outlined'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={verified && !login}

                  />
                  {!showOtp &&
                    !verified && email && !login &&

                    <Button onClick={() => sendMail()}> Verify</Button>


                  }

                  {!showOtp &&
                    verified && email && !login &&

                    <MdOutlineVerified />


                  }


                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    variant='outlined'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}

                  />
                  {!login &&
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      name="cpassword"
                      label="Confirm Password"
                      type="password"
                      id="cpassword"
                      autoComplete="current-password"
                      variant='outlined'
                      value={cpassword}
                      onChange={(e) => setCpassword(e.target.value)}
                    />
                  }
                  <div className='flex-col justify-between items-center'>
                    <div className='flex justify-between items-center mx-2'>
                      {
                        !login &&
                        <FormControlLabel
                          control={<Checkbox value="remember" color="primary" />}
                          label="Remember me"
                        />
                      }



                      <Button disabled={!verified && !login}
                        type="submit"

                        variant="contained"
                        sx={{
                          mt: 2, mb: 2, width: '40%',
                        }}
                      >

                        {loading ? "Loading.." :
                          (login ? "Sign In" : "Sign Up")}
                      </Button>

                      {
                        login && <Auth />
                      }

                    </div>

                    <Grid container>
                      <Grid item xs >
                        {login && <span variant="body2 " disabled={!email} className='text-[#1976D2] underline cursor-pointer'>
                          Forgot password?
                        </span>
                        }
                      </Grid>
                      <Grid item>
                        <span variant="body2 " className='text-[#1976D2] underline cursor-pointer'
                          onClick={() => { ResetAll(); changetype() }}
                        >

                          {login ?
                            "Don't have an account? Sign Up"

                            : " Already A Customer? SIgn In"

                          }
                        </span>



                      </Grid>

                    </Grid>
                  </div>
                  <Copyright sx={{ mt: 5 }} />
                </Box>
              </Box>
            </Grid>
            <Grid className='scale-[1.1]'
              item
              xs={false}
              sm={false}
              md={6}
              sx={{
                backgroundImage: `url(${sign})`,
                backgroundRepeat: 'no-repeat',


                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
          </Grid>


        </div>
      </div>

    </ThemeProvider>
  );
}
