import React, { useState } from 'react';
import { Typography, List, ListItem, ListItemText } from '@mui/material';
import 'tailwindcss/tailwind.css';
import SubNavbar from './SubNavbar';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import WorkIcon from '@mui/icons-material/Work';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import AddPostModalComp from './Modals/AddPostModal';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';


const Content = ({clasroom,fetchClassroom}) => {
  const navigate = useNavigate();
  const [modalOpen,setModalOpen] = useState(false);
  const code = localStorage.getItem("classroomCode");

  const handleSubmit = async (e,name,content,file) => {
    e.preventDefault();      
      try {
        const formData = new FormData();
        formData.append('title', name);
        formData.append('content', content);
        formData.append('file', file);

        const response = await  (`https://edu-sync-backend.vercel.app/subadmin/classrooms/${code}/addposts`, {
          method: 'POST',
          headers: {
            // Add your custom headers here
            'Authorization': localStorage.getItem("token"),
            // Add any other headers as needed
          },
          body: formData,
        });

      const result =   await response.json();
      if(result.success===true){
        fetchClassroom(); 
        alert('Successfully Posted');
         
      }else{
        alert(result.message)
      }

       
      } catch (err) {
        alert(err);
      } 
    
  };

  const handleDeleteClick = async(e,id)=>{
    e.stopPropagation();
    e.preventDefault();
    try {
    
      await axios.delete(`https://edu-sync-backend.vercel.app/subadmin/classrooms/${code}/posts/${id}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        }
      }).then(response => {
        console.log("Response", response);

        if (response.status === 200) {

          console.log(response?.message);
          fetchClassroom();
          
        } else {
          console.log("Status Code", response.status);
        }
      });
    } catch (error) {
      console.log("error", error);
    }
  }
    
  return (
    <>
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <List sx={{ bgcolor: 'background.paper' }} className="w-full lg:w-[90%]">
      {clasroom.posts?.map((post)=>{
        return (
            <ListItem key={post._id} className='border border-gray-300 rounded-lg my-6 cursor-pointer' onClick={()=>{ localStorage.setItem("postId",post._id); navigate("/classrooms/single/post")}}>
            <ListItemAvatar>
            <Avatar>
                <ImageIcon />
            </Avatar>
            </ListItemAvatar>
            <ListItemText primary={post.title} secondary={post.content} />
            <DeleteIcon onClick={(e) => handleDeleteClick(e, post._id)} />
        </ListItem>
        )
      })}
      <ListItem className='border border-gray-300 rounded-lg my-6 cursor-pointer' onClick={()=>{console.log(modalOpen) ;setModalOpen(true)}}>
            <ListItemAvatar>
            <Avatar>
                <WorkIcon />
            </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Add New Post"  />
            <AddIcon />

        </ListItem>
        {/* <ListItem className='border border-gray-300 rounded-lg my-6 cursor-pointer'>
            <ListItemAvatar>
            <Avatar>
                <WorkIcon />
            </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Work" secondary="Jan 7, 2014" />
        </ListItem>
        <ListItem className='border border-gray-300 rounded-lg my-6 cursor-pointer'>
            <ListItemAvatar>
            <Avatar>
                <BeachAccessIcon />
            </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Vacation" secondary="July 20, 2014" />
        </ListItem> */}
        </List>
    </Box>
    <AddPostModalComp
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
           handleSubmit={handleSubmit}
         />
    </>
  )
}

export default Content;
