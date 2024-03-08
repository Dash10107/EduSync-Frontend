import React, { useState } from "react"
import "./LoginComp.css"
// import { Button } from "@mui/material";
// import axios from "axios"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Alert, Snackbar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Navbar from "../../../Layouts/Navbar/Navbar";
import loginIcon from "../../../Assets/Login-removebg-preview.png";
import MailRoundedIcon from '@mui/icons-material/MailRounded';
import LockResetRoundedIcon from '@mui/icons-material/LockResetRounded';
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
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" >
        EduSync
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
  
}
const defaultTheme = createTheme();
const LoginComp = (props) => {

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [severity,setSeverity] = useState("error");
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [toastOpen, setToastOpen] = useState(false);
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };
  const eye = passwordShown ? <FontAwesomeIcon icon={faEye} /> : <FontAwesomeIcon icon={faEyeSlash} />

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      setToastOpen(false);
      return;
    }
  }

  const checkSubAdmin = async() => {
    // Perform the GET request to check if the user is an admin
   await fetch('https://edusync-backend.onrender.com/subadmin/checkSubAdmin', {
      method: 'GET',
      headers: {
        'Authorization': localStorage.getItem('token'),
      },
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw new Error('Not an Sub admin');
        }
      })
      .then((data) => {
        console.log(data);
        localStorage.setItem("SubAdmin",true);
        navigate("/subadmin/home");
      })
      .catch((error) => {
      console.log(error);
      localStorage.setItem("SubAdmin",false);
       navigate("/home");
      });
  }

  const checkAdmin = async() => {
    // Perform the GET request to check if the user is an admin
   await fetch('https://edusync-backend.onrender.com/admin/checkAdmin', {
      method: 'GET',
      headers: {
        'Authorization': localStorage.getItem('token'),
      },
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw new Error('Not an admin');
        }
      })
      .then((data) => {
        console.log(data);
        localStorage.setItem("Admin",true);
        navigate("/admin/home");
      })
      .catch((error) => {
      console.log(error);
      localStorage.setItem("Admin",false);
       checkSubAdmin();
      });
  }



  const onSubmit = async (e) => {
    e.preventDefault();
    
   

    if(userName==="" || password===""){
      setSeverity("warning");
      setErrors({error:"Please fill in the required fields"})
      setToastOpen(true);
      setUserName("");
      setPassword("");
      setSeverity("error")
      return
    }
    
    let loginInfo = {
      email: userName,
      password: password
    }
    console.log(loginInfo);
    try {
      const response = await fetch('https://edusync-backend.onrender.com/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginInfo)

      });

      const result = await response.json();
      console.warn("Result", result);

      if(result.message==="An Email sent to your account please verify"){
        
        navigate("/verifyemail");
     
      }else{
        console.log("Message",result.message)
      }

      if (result.success) {
        if (result.token) {
          localStorage.setItem("token", result.token);
          
          checkAdmin();
          setUserName("");
          setPassword("");
          
        } else {
          console.log(result.token);
        }
      } else {
        console.log(result);

        setErrors({error:result.message});

        setToastOpen(true);
      }
     

    } catch (error) {
      console.error(error);
      setErrors(error);
     
      setToastOpen(true);
    }

  }


  return (
 <>
 
<ThemeProvider theme={defaultTheme}>

      <Grid container component="main" sx={{ height: '100vh' }}>
     
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://researchleap.com/wp-content/uploads/2020/03/ed-tech1553237040995.jpg)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square className='flex flex-col items-center'>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <div className='flex items-center'>
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5" className='p-4'>
              Login
            </Typography>
            </div>
            <Box component="form" noValidate onSubmit={onSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                name="name"
                placeholder="Enter Your Email"
                value={userName}
                onChange={(e) => { setUserName(e.target.value) }}
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type={passwordShown ? "text" : "password"}
                placeholder="Enter Password"
                value={password}
                onChange={(e) => { setPassword(e.target.value) }}
               
                autoComplete="current-password"
                InputProps={{
        endAdornment: (
          <IconButton
            edge="end"
            aria-label="toggle password visibility"
            onClick={togglePasswordVisiblity}
            className="eyeIcon"
          >
            {passwordShown ? <VisibilityIcon /> : <VisibilityOffIcon />}
          </IconButton>
        ),
      }}
              >
                  
  
              </TextField>
             
            

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Login 
              </Button>
              <Grid container>
                <Grid item>
                  <Link onClick={(e)=>{e.preventDefault(); navigate("/signup")}} variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
    <Snackbar open={toastOpen} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
          <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
            
              
              <p>There is an error with credentials </p> 
              
            
          </Alert>
        </Snackbar>
    </>

  )
};

export default LoginComp;
