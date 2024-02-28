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

const TestResults = () => {
  return (
    <div className="flex justify-center my-6">
      <div className='w-full lg:w-[80%]'>
        <List sx={{ width: '100%' }} className='w-70'>
          <ListSubheader sx={{ fontWeight: 'bold', fontSize: '1.1rem' }}>Test Results</ListSubheader>
          <Divider />
          <ListItem sx={{alignItems: 'center' }}>
            <ListItemAvatar>
              <Avatar>
                <ImageIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Photos" secondary="Jan 9, 2014" />
          </ListItem>
          <Divider />
          <ListItem sx={{alignItems: 'center' }}>
            <ListItemAvatar>
              <Avatar>
                <WorkIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Photos" secondary="Jan 9, 2014" />
          </ListItem>
          <Divider />
          <ListItem sx={{alignItems: 'center' }}>
            <ListItemAvatar>
              <Avatar>
                <BeachAccessIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Photos" secondary="Jan 9, 2014" />
          </ListItem>
          <Divider />
        </List>
      </div>
    </div>
  );
};

export default TestResults;