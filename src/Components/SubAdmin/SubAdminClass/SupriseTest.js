import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
// import WorkIcon from '@mui/icons-material/Work';
// import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import Divider from '@mui/material/Divider';
import ListSubheader from '@mui/material/ListSubheader';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';

const SupriseTest = ({clasroom,forms,fetchClassroom}) => {
  const navigate = useNavigate();
  const code = localStorage.getItem("classroomCode");

  const handleDeleteClick = async(e,id)=>{

    e.stopPropagation();  
    e.preventDefault();
    try {
    
      await axios.delete(`https://edusync-backend.onrender.com/subadmin/classrooms/${code}/forms/${id}`, {
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
    <div className="flex justify-center my-6">
      <div className='lg:w-[80%] w-full'>
        <List sx={{ width: '100%' }} className=''>
          <ListSubheader sx={{ fontWeight: 'bold', fontSize: '1.3rem' }}>Surprise Tests</ListSubheader>
          <Divider />
        {forms?.map((form)=>{return(<>
          <ListItem sx={{alignItems: 'center' }} key={form._id} onClick={()=>{localStorage.setItem("formId",form._id);navigate("/classrooms/test")}}>
            <ListItemAvatar>
              <Avatar>
                <ImageIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={form?.title} />
            <DeleteIcon onClick={(e) => handleDeleteClick(e,form._id)} />
          </ListItem>
          <Divider className=''/>
        </>)})}
        <ListItem sx={{alignItems: 'center' }}  className='cursor-pointer ' onClick={()=>{navigate("/subadmin/classrooms/createTest")}}>
            <ListItemAvatar>
              <Avatar>
                <ImageIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Add New Test" />
            <AddIcon />
          </ListItem>
        
        </List>
      </div>
    </div>
  );
};

export default SupriseTest;