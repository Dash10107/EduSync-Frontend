import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function CardLayout({module}) {
  const navigate = useNavigate();

  const backgroundImages = [
    'https://dfstudio-d420.kxcdn.com/wordpress/wp-content/uploads/2019/06/digital_camera_photo-1080x675.jpg',
    // Add more image URLs as needed
  ];

  // Randomly pick an image URL
  const randomBackgroundImage = backgroundImages[Math.floor(Math.random() * backgroundImages.length)];
  const firstSentence = module?.description?.substring(0, module?.description.indexOf('.') + 1) || module?.description;
  return (
    <Card sx={{ maxWidth: 345 }} className='m-8'
            onClick={()=>{
        localStorage.setItem("moduleId",module.id);
        localStorage.setItem("SubjectName",module.name);
        navigate("/chapters")
        }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="40"
          image={randomBackgroundImage}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {module.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
          {firstSentence}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default CardLayout;
