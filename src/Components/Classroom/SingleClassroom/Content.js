import React from 'react';
import { Typography, List, ListItem, ListItemText } from '@mui/material';
import 'tailwindcss/tailwind.css';
import SubNavbar from './SubNavbar';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import WorkIcon from '@mui/icons-material/Work';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import Box from '@mui/material/Box';



const Content = ({clasroom}) => {
    
  return (
    <>
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <List sx={{ bgcolor: 'background.paper' }} className="w-full lg:w-[90%]">
      {clasroom.posts?.map((post)=>{
        return (
            <ListItem className='border border-gray-300 rounded-lg my-6 cursor-pointer'>
            <ListItemAvatar>
            <Avatar>
                <ImageIcon />
            </Avatar>
            </ListItemAvatar>
            <ListItemText primary={post.title} secondary={post.content} />
        </ListItem>
        )
      })}
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
    </>
  )
}

export default Content;
