import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { alpha } from '@mui/material/styles';
import EmailIcon from '@mui/icons-material/Email';
import ModalLandingList from './ModalLandingList';
const LandingList = ({notice}) => {
  const firstSentence = notice?.content?.substring(0, notice?.content.indexOf('.') + 1) || notice?.content;
  
  const dateObject = new Date(notice?.date) || notice.date;
  const formattedDate = dateObject.toLocaleDateString('en-US', { timeZone: 'UTC' });
  
  const [modalOpen,setModalOpen] = React.useState(false);
  return (
    <>
      <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
      <ListItem alignItems="flex-start" className='cursor-pointer' onClick={()=>{setModalOpen(true)}}>
        <ListItemAvatar>
          <EmailIcon />
        </ListItemAvatar>
        <ListItemText
          primary=<p className='text-md lg:text-xl font-semibold'>{notice.title}</p>
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                <p className='my-1'> {firstSentence}…— </p>
              </Typography>
              {<p className='flex justify-end text-black font-semibold'> Published on {formattedDate} </p>}
            </React.Fragment>
          }
        />
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
