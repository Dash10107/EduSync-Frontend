import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardActions } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function CardLayout({clasroom}) {
  const navigate = useNavigate();
  const backgroundImages = [
    'https://dfstudio-d420.kxcdn.com/wordpress/wp-content/uploads/2019/06/digital_camera_photo-1080x675.jpg',
    // Add more image URLs as needed
  ];

  // Randomly pick an image URL
  const randomBackgroundImage = backgroundImages[Math.floor(Math.random() * backgroundImages.length)];
  
  return (
    <Card sx={{ maxWidth: 450}} className='m-8 mb-10 ' onClick={()=>{console.log(clasroom);localStorage.setItem("classroomCode",clasroom.code);localStorage.setItem("classroomName",clasroom.name);navigate("/classrooms/single")}}>
      <CardActionArea>
        <CardMedia
          component="img"
          
          image={randomBackgroundImage}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {clasroom.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
          Classroom Code :  {clasroom.code}
          </Typography>
          
          
          <CardActions sx={{justifyContent:"end"}}>
        <p>Student Count :   {clasroom.students.length}</p>        
      </CardActions>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default CardLayout;
