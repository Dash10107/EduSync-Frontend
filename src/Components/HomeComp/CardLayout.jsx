import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

function CardLayout({module}) {
  return (
    <Card sx={{ maxWidth: 345 }} className='m-8'>
      <CardActionArea>
        <CardMedia
          component="img"
          height="40"
          image="https://dfstudio-d420.kxcdn.com/wordpress/wp-content/uploads/2019/06/digital_camera_photo-1080x675.jpg"
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {module.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
          {module.description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default CardLayout;
