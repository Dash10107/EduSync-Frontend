import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import DynamicFeedOutlinedIcon from '@mui/icons-material/DynamicFeedOutlined';
import { useNavigate } from 'react-router-dom';

const PendingList = ({classroom}) => {
    
    const navigate = useNavigate();
    
  return (
    <>
    <div className='m-4 cursor-pointer' onClick={()=>{localStorage.setItem("classroomCode",classroom.code);localStorage.setItem("classroomName",classroom.name);navigate("/classrooms/single")}}>
        <List sx={{ width: '100%', maxWidth: 550}} className=''>
            <ListItem alignItems="flex-start">
                <ListItemAvatar>
                <Avatar>
               <DynamicFeedOutlinedIcon/>
               </Avatar>
                </ListItemAvatar>
                <ListItemText
                primary= {<p className='text-lg font-semibold'>{classroom?.name}</p>}
                secondary={
                    <React.Fragment>
                    <Typography
                        sx={{ display: 'inline' }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                    >
                      
                    </Typography>
                    <div className="mb-4 py-2">
  <p className="text-sm font-semibold whitespace-pre-line break-words">
    {classroom?.posts[0]?.content}
  </p>
  <span className="text-gray-600 whitespace-pre-line break-words">
    {classroom?.posts[0]?.fileUrl}
  </span>
</div>

                    </React.Fragment>
                }
                />
            </ListItem>
            <Divider variant="inset" component="li" />
        </List>
    </div>
    </>
  )
}

export default PendingList;
