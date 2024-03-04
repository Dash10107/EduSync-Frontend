import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import WorkIcon from '@mui/icons-material/Work';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import Divider from '@mui/material/Divider';
import ListSubheader from '@mui/material/ListSubheader';
import { useNavigate } from 'react-router-dom';
import { ListItemButton } from '@mui/material';

const SupriseTest = ({clasroom,forms}) => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-center my-6">
      <div className='lg:w-[80%] w-full'>
        <List sx={{ width: '100%' , bgcolor: 'background.paper'}} className=''>
          <ListSubheader sx={{ fontWeight: 'bold', fontSize: '1.3rem' }}>Surprise Tests</ListSubheader>
          <Divider />
        {forms?.map((form)=>{return(<>
          <ListItem sx={{alignItems: 'center' }} key={form._id} onClick={()=>{localStorage.setItem("formId",form._id);navigate("/classrooms/test")}}>
          <ListItemButton>
            <ListItemAvatar>
              <Avatar>
                <ImageIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={form?.title} />
            </ListItemButton>
          </ListItem>
          <Divider className=''/>
        </>)})}
        
        </List>
      </div>
    </div>
  );
};

export default SupriseTest;