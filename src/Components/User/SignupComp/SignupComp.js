import React, { useState } from "react";
import "./SignupComp.css";

import axios from "axios";
import Navbar from "../../../Layouts/Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Alert, Snackbar } from "@mui/material";
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
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

const SignupComp = (props) => {
  // Create state variables to store user input
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = formData;

  const navigate = useNavigate();
  const [severity,setSeverity] = useState("error")
  const [errors, setErrors] = useState({});
  const [toastOpen, setToastOpen] = useState(false);
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };
  const eye = passwordShown ? <FontAwesomeIcon icon={faEye} /> : <FontAwesomeIcon icon={faEyeSlash} />

  const [passwordShown2, setPasswordShown2] = useState(false);
  const togglePasswordVisiblity2 = () => {
    setPasswordShown2(passwordShown2 ? false : true);
  };
  const eye2 = passwordShown2 ? <FontAwesomeIcon icon={faEye} /> : <FontAwesomeIcon icon={faEyeSlash} />
  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitted");
    
    if(email==="" || name==="" || password === "" || password2===""){
     setSeverity("warning");
      setErrors({ error: "Please fill in all the details" });
      setToastOpen(true);
      return;
    }
    if(password!==password2){
      setSeverity("error")
      setErrors({error:"Please enter same passwords in both the fields"});
      setToastOpen(true);
      return;
    }

   
    try {
      // Send a POST request to the server
      const response = await axios.post(
        "https://edusync-backend.onrender.com/users/register",
        formData
      );
  


  // Access the response data directly
  const result = response.data;
  console.warn("Result", result);   
  
      if (response.status === 201) {
        // If the registration is successful, you can handle the response here

        
        setFormData({
          name: "",
          email: "",
          password: "",
          password2: "",
        });

    
        navigate("/verifyemail");

      } else { console.log(response.status) }

    } catch (error) {
      // If there's an error, handle it here
      console.error("Registration error", error);
      setErrors({error:error.message});
      setToastOpen(true);

    }
  };

  // Function to handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      setToastOpen(false);
      return;
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
              Sign up
            </Typography>
            </div>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                name="name"
                placeholder="Enter Your Name "
                value={name}
                onChange={handleChange}
                autoComplete="name"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                placeholder="Enter Your Email"
                value={email}
                onChange={handleChange}
                autoComplete="email"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type={passwordShown ? "text" : "password"}
                value={password}
                onChange={handleChange}
                id="password"
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
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password2"
                label="Confirm Password"
                value={password2}
                onChange={handleChange}
                type={passwordShown2 ? "text" : "password"}
                id="password2"
                autoComplete="current-password"
                InputProps={{
        endAdornment: (
          <IconButton
            edge="end"
            aria-label="toggle password visibility"
            onClick={togglePasswordVisiblity2}
            className="eyeIcon"
          >
            {passwordShown2 ? <VisibilityIcon /> : <VisibilityOffIcon />}
          </IconButton>
        ),
      }}
              />
             
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign up
              </Button>
              <Grid container>
                <Grid item>
                  <Link  variant="body2" onClick={(e)=>{e.preventDefault(); navigate("/login")}}>
                    {"Already have an account ? Log in"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  </>
  );
};

export default SignupComp;
