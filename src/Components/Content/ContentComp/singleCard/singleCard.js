import React, { useEffect, useState } from "react"
import  "./singleCard.css"
import { useNavigate } from "react-router-dom";
import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';

const SingleCard = (props) => {
    const {module,style,tiltedColor} = props;



    const [randomBackgroundImage, setRandomBackgroundImage] = useState('');

    // Array of image URLs
    const backgroundImages = [
        'https://www.zilliondesigns.com/blog/wp-content/uploads/purple-and-yellow-logos.png',

    'https://img.freepik.com/free-vector/abstract-design-background_23-2148476930.jpg?w=1380&t=st=1709569826~exp=1709570426~hmac=3e754682a635b29903f5164f5fc0192b9a95d068b37acae0078b4d44bb529e00',
        
    'https://img.freepik.com/free-vector/gradient-geometric-wallpaper_23-2148818785.jpg?w=1380&t=st=1709569933~exp=1709570533~hmac=851b359dcaf183e18173aa9f395e9ea91873d421be28edd6356c1503fc59993d',
    
    'https://i.pinimg.com/originals/84/52/da/8452da14928e52125115013069257045.jpg',
    
    'https://i.pinimg.com/564x/35/cd/30/35cd3061769a10921f56ff74f78f0d15.jpg'
      // Add more image URLs as needed
    ];
  
    // Set a random background image when the component mounts
    useEffect(() => {
      const randomIndex = Math.floor(Math.random() * backgroundImages.length);
      setRandomBackgroundImage(backgroundImages[randomIndex]);
    }, []);
    
  const navigate = useNavigate();
    
  const handleButtonClick = () => {
    localStorage.setItem("moduleId", module.id);
    localStorage.setItem("SubjectName", module.name);
    navigate("/chapters");
  };
  
  const firstSentence = module?.description?.substring(0, module?.description.indexOf('.') + 1) || module?.description;
  return (
    <Card sx={{ maxWidth: 505 }} className='m-8'
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

};

export default SingleCard;
