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

const People = ({clasroom}) => {
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
              <ListItemText primary="Megha Kapse" />
            </ListItemButton>
          </ListItem>
    </List>
    </Box>

    {/* Student Section */}
    <ListSubheader sx={{ fontWeight: 'bold', fontSize: '1.3rem' }}>Students</ListSubheader>
      <Divider />
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <List sx={{ bgcolor: 'background.paper' }} className="w-[90%] mt-4">
          <ListItem className='my-1'>
            <ListItemButton>
              <ListItemAvatar>
                <Avatar />
              </ListItemAvatar>
              <ListItemText primary="Vinay Vora" />
            </ListItemButton>
          </ListItem>

          <ListItem className='my-1'>
            <ListItemButton>
              <ListItemAvatar>
                <Avatar />
              </ListItemAvatar>
              <ListItemText primary="Vinay Vora" />
            </ListItemButton>
          </ListItem>
          
          <ListItem className='my-1'>
            <ListItemButton>
              <ListItemAvatar>
                <Avatar />
              </ListItemAvatar>
              <ListItemText primary="Vinay Vora" />
            </ListItemButton>
          </ListItem>
          
          <ListItem className='my-1'>
            <ListItemButton>
              <ListItemAvatar>
                <Avatar />
              </ListItemAvatar>
              <ListItemText primary="Vinay Vora" />
            </ListItemButton>
          </ListItem>
          
          <ListItem className='my-1'>
            <ListItemButton>
              <ListItemAvatar>
                <Avatar />
              </ListItemAvatar>
              <ListItemText primary="Vinay Vora" />
            </ListItemButton>
          </ListItem>
          
          <ListItem className='my-1'>
            <ListItemButton>
              <ListItemAvatar>
                <Avatar />
              </ListItemAvatar>
              <ListItemText primary="Vinay Vora" />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Box>
    </>
  )
}

export default People