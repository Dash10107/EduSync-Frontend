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

const People = ({clasroom,teacherName,studentNames}) => {
  return (
    <>
    <Box className='my-6 ' >
    {/* Teacher  */}
    <ListSubheader className='mb-5' sx={{ fontWeight: 'bold', fontSize: '1.3rem'}}>Teachers
    <Divider />
    </ListSubheader>

    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    <List sx={{ bgcolor: 'background.paper' }} className="w-[90%] h-[7%]  mt-4 ">
    <ListItem disablePadding className='mb-3'>
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
    <ListSubheader className='my-7 mb-5' sx={{ fontWeight: 'bold', fontSize: '1.3rem' }}>Students  <Divider /></ListSubheader>
     
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <List sx={{ bgcolor: 'background.paper' }} className="w-[90%] mt-4">
        {studentNames.map((name)=>{
          return (
            <ListItem className='my-1'>
            <ListItemButton>
              <ListItemAvatar>
                <Avatar />
              </ListItemAvatar>
              <ListItemText primary={name.name} />
            </ListItemButton>
          </ListItem>)
        })}
        </List>
      </Box>
    </Box>
    </>
  )
}

export default People