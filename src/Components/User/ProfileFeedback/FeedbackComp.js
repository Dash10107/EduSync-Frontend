import React, { useEffect, useState } from 'react'
import Navbar from '../../../Layouts/Navbar/Navbar'
import FolderCopyIcon from '@mui/icons-material/FolderCopy';
import SchoolIcon from '@mui/icons-material/School';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FormControl, InputLabel, Select, MenuItem, Button, TextField } from '@mui/material';
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import { styled } from '@mui/system';
const FeedbackComp = () => {
    const navigate = useNavigate();
    const [subadminUsers, setSubadminUsers] = useState([]);
    const [selectedName, setSelectedName] = useState('');
    const [selectedUserId, setSelectedUserId] = useState('');
    const [feedback, setFeedback] = useState('');
    const [loading, setLoading] = useState(true);


    const handleLogout = (e)=>{
        e.preventDefault();
        localStorage.setItem("token","")
        localStorage.setItem("allowRedirect",false);
        navigate("/login");
        
      }
      const handleNameChange = (event) => {
        const selectedOption = event.target.value;
        const selectedSubadmin = subadminUsers.find(user => user.name === selectedOption);
    
        setSelectedName(selectedOption);
        setSelectedUserId(selectedSubadmin ? selectedSubadmin._id : '');
      };
      const handleFeedbackChange = (event) => {
    
        setFeedback(event.target.value);
      };
    
      const fetchSubadminUsers = async () => {
        try {
          const response = await axios.get('https://edu-sync-backend.vercel.app/users/subadminUsers',{      headers: {
            Authorization: localStorage.getItem("token"),
          }});
          setSubadminUsers(response.data);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching subadmin users:', error);
          setLoading(false);
        }
      };

      const handleSubmit = async () => {
        try {
          const subAdminId = selectedUserId
          const message = feedback
          console.log('SubAdminId',subAdminId);
          console.log('message',message);
          
          
          if(subAdminId === "" || message === "" ){
            console.log('Please fill the values');
            
            return
          }
          // Make a POST request to the server
          const response = await axios.post(
            'https://edu-sync-backend.vercel.app/feedandnotice/post-feedback',
            {
              subAdminId: subAdminId,
              message: message,
            },
            {
              headers: {
                Authorization: `${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
              },
            }
          );
      
          const result = response.data; // response.data is used to get the data from the response
          console.warn('Result', result);
      
          if (result.message) {
            // Handle success, for example, clear the form
            setSelectedUserId('');
            setFeedback('');
            console.log('Feedback posted successfully');
          }
        } catch (error) {
          console.error('Error posting feedback:', error);
        }
      };

      useEffect(()=>{fetchSubadminUsers()},[])
  return (
    <>
    <div>
      <Navbar isProfile={true} />   
    </div> 
    <div className='flex'>
        <div className='w-[15%] border-r-2 hidden lg:block'>
        <div>
  <button className="home-button" onClick={()=>{navigate("/profile")}}> <HomeRoundedIcon/> <p>User Details </p> </button>
    
    <button className="home-button" onClick={()=>{navigate("/content/profile")}}> <FolderCopyIcon/> <p>Content Progress </p> </button>
    
    <button className="home-button" onClick={()=>{navigate("/classroom/profile")}}> <SchoolIcon/> <p>Classrooms Performance</p> </button>
    
    <button className="home-button" onClick={()=>{navigate("/feedback")}}> <DynamicFeedIcon/> <p>Feedback</p> </button>
    <button className="home-button" onClick={handleLogout}> <LogoutIcon/> <p>Logout</p> </button>

</div>
        </div>
        <div className='w-[100%] lg:w-[85%]'>

        <div className='w-[100%] h-[20%] flex justify-center items-center my-8'>
            <div className='w-[60%] text-center text-4xl font-semibold '>
            <h3 className='text-gray-800'>Give Feedback</h3>
            </div>
        </div>

        <div className="feedback-form">

  <div className='w-[100%] h-[20%] flex justify-center items-center my-8' >
  <FormControl className='w-[60%]' >
  <InputLabel id="demo-simple-select-label">Teacher</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="name"
    label="Name"
    value={selectedName} onChange={handleNameChange}
  >
   {subadminUsers?.map((user) => (
        <MenuItem key={user._id} value={user.name}> {user.name}</MenuItem>
      ))}

  </Select>
</FormControl>
</div>

<div className='w-[100%] h-[20%] flex justify-center items-center my-8' >
  <FormControl className='w-[60%]' >
  <TextField
          id="outlined-multiline-flexible"
          label="Feedback"
          placeholder="Enter your feedback..."
          rows={6}
          value={feedback}
      onChange={handleFeedbackChange}
      multiline
        />
</FormControl>
</div>

<div className='w-[100%] h-[20%] flex justify-center items-center my-8'>
            <div className='w-[60%] text-center  font-semibold '>
            <button className="submit-button" style={{width:"40%"}} onClick={handleSubmit}>
    Submit
  </button>
            </div>
        </div>
</div>
        </div>
        </div>
    </>
  )
}

export default FeedbackComp
