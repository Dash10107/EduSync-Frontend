import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';


const PendingList = () => {
  return (
    <>
    <div className='m-4'>
        <List sx={{ width: '100%', maxWidth: 550}} className=''>
            <ListItem alignItems="flex-start">
                <ListItemAvatar>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                </ListItemAvatar>
                <ListItemText
                primary="Brunch this weekend?"
                secondary={
                    <React.Fragment>
                    <Typography
                        sx={{ display: 'inline' }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                    >
                        Ali Connors
                    </Typography>
                    {" — I'll be in your neighborhood doing errands this… ihaefb iwef oiwbrybf rbbfryb yubgsyrbgyugbeyurgyeusb geyur rgurgb"}
                    </React.Fragment>
                }
                />
            <IconButton edge="end" aria-label="delete">
                      <DeleteIcon />
                    </IconButton>
            </ListItem>
            <Divider variant="inset" component="li" />
        </List>
    </div>
    </>
  )
}

export default PendingList;
