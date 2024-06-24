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

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const defaultTheme = createTheme();

export default function Signup() {

      const [login, setLogin] = useState(true)
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  const changetype = ()=>{
    setLogin (!login)
  }


  return (
    <ThemeProvider theme={defaultTheme}>
      <div className='flex items-center justify-center min-h-[100vh]  md:scale-[0.90]'>
        <Grid container component="main" className='lg:max-w-[95vw] flex justify-between  sm:justify-center '>
          
          <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square sx={{
            // mx: 4,
            display: 'flex',
            justifySelf:'center',
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
              p:2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              bgcolor:'white',
              borderRadius:'20px',
              
            }} className='md:scale-[0.85]'>
              <Avatar sx={{ bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h4" className='font-medium'>
               {login? "Sign In": "Sign Up"} 
              </Typography>
              <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}>
               { !login && <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="fullName"
                  label="Full Name"
                  name="fullName"
                  autoComplete="fullName"
                  autoFocus
                  variant='outlined'
                 
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
                
                />
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
                  
                />
                { !login&&
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Confirm Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  variant='outlined'
                 />
                }
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                    {login? "Sign In": "Sign Up"} 
                </Button>
                <Grid container>
                  <Grid item xs>
                 { login && <span  variant="body2 " className='text-[#1976D2] underline cursor-pointer'>
                      Forgot password?
                    </span>
}
                  </Grid>
                  <Grid item>
                    <span  variant="body2 " className='text-[#1976D2] underline cursor-pointer' onClick={changetype}>

                    { login ? 
                      "Don't have an account? Sign Up"

                    : " Already A Customer? SIgn In"

                  }
                    </span>

                    
                  
                  </Grid>
                </Grid>
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
    </ThemeProvider>
  );
}
