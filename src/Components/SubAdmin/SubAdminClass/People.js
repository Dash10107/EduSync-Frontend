import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import ListSubheader from '@mui/material/ListSubheader';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';

const People = ({clasroom,teacherName,studentNames,fetchClassroom}) => {
  const code = localStorage.getItem("classroomCode");

  const handleDeleteClick = async(e,id)=>{

    e.stopPropagation();  
    e.preventDefault();
    try {
    
      await axios.delete(`https://edu-sync-backend.vercel.app/subadmin/classrooms/${code}/removestudent/${id}`, {
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
    <Box className='my-6'>
    {/* Teacher  */}
    <ListSubheader sx={{ fontWeight: 'bold', fontSize: '1.3rem' }}>Teachers</ListSubheader>
    <Divider />
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    <List sx={{ bgcolor: 'background.paper' }} className="w-[90%] mb-20 mt-4">
    <ListItem disablePadding>
            <ListItemButton>
              <ListItemAvatar>
                <Avatar />
              </ListItemAvatar>
              <ListItemText primary={teacherName} />
            </ListItemButton>
          </ListItem>
    </List>
    </Box>

    {/* Student Section */}
    <ListSubheader sx={{ fontWeight: 'bold', fontSize: '1.3rem' }}>Students</ListSubheader>
      <Divider />
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <List sx={{ bgcolor: 'background.paper' }} className="w-[90%] mt-4">
        {studentNames.map((name)=>{
          console.log(name)
          return (
            <ListItem className='my-1'>
            <ListItemButton>
              <ListItemAvatar>
                <Avatar />
              </ListItemAvatar>
              <ListItemText primary={name.name} />
            </ListItemButton>
            <DeleteIcon onClick={(e) => handleDeleteClick(e,name.id)} />
          </ListItem>)
        })}
        </List>
      </Box>
    </Box>
    </>
  )
}

export default People