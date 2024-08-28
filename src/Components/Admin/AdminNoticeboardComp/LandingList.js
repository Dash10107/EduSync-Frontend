import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';

import { alpha } from '@mui/material/styles';
import EmailIcon from '@mui/icons-material/Email';
import ModalLandingList from './ModalLandingList';
import axios from 'axios';
const LandingList = ({notice,fetchNotices}) => {
  const firstSentence = notice?.content?.substring(0, notice?.content.indexOf('.') + 1) || notice?.content;
  
  const dateObject = new Date(notice?.date) || notice?.date;
  const formattedDate = dateObject.toLocaleDateString('en-US', { timeZone: 'UTC' });
  
  const [modalOpen,setModalOpen] = React.useState(false);
  const feedbackId = notice?._id;
  const deleteNotice = async()=>{
      try {
  
          await axios.delete(`https://edu-sync-backend.vercel.app/feedandnotice/delete-notice/${feedbackId}`, {
            headers: {
              Authorization: localStorage.getItem("token"),
            }
          }).then(response => {
            console.log("Response", response);
    
            if (response.status === 200) {

              console.log(response?.message);
              fetchNotices();
              
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
      <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
      <ListItem alignItems="flex-start" className='cursor-pointer' onClick={()=>{setModalOpen(true)}}>
        <ListItemAvatar>
          <EmailIcon />
        </ListItemAvatar>
        <ListItemText
          primary=<p className='text-md lg:text-xl font-semibold'>{notice?.title}</p>
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                <p className='my-1'> {firstSentence}… </p>
              </Typography>
            
              {<p className='flex justify-end text-black font-semibold'> Published on {formattedDate} </p>}
            </React.Fragment>
          }
        />
          <DeleteIcon onClick={(e)=>{e.stopPropagation();e.preventDefault(); deleteNotice()}}  />
      </ListItem>
      <Divider component="li" />
      
    </List>
    <ModalLandingList 
      modalOpen={modalOpen}
      setModalOpen={setModalOpen}
      notice={notice}
    />
    </>
  )
}

export default LandingList;
