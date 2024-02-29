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

const SupriseTest = ({clasroom,forms}) => {
  return (
    <div className="flex justify-center my-6">
      <div className='lg:w-[80%] w-full'>
        <List sx={{ width: '100%' }} className=''>
          <ListSubheader sx={{ fontWeight: 'bold', fontSize: '1.3rem' }}>Surprise Tests</ListSubheader>
          <Divider />
        {forms?.map((form)=>{return(<>
          <ListItem sx={{alignItems: 'center' }}>
            <ListItemAvatar>
              <Avatar>
                <ImageIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={form?.title} />
          </ListItem>
          <Divider className=''/>
        </>)})}
        
        </List>
      </div>
    </div>
  );
};

export default SupriseTest;