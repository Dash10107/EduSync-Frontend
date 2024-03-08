import React, { useEffect, useState } from 'react';
import { Typography, List, ListItem, ListItemText } from '@mui/material';
import 'tailwindcss/tailwind.css';
import SubNavbar from './SubNavbar';


const Main = ({clasroom,teacherName,studentNames,forms,results}) => {
  const [randomBackgroundImage, setRandomBackgroundImage] = useState('');

  const backgroundImages = [
    'https://img.freepik.com/free-photo/blank-papers-multicolor-pencils-grey_114579-28815.jpg?size=626&ext=jpg&ga=GA1.1.1546980028.1708905600&semt=ais',
    'https://www.gstatic.com/classroom/themes/Honors.jpg',
 'https://www.gstatic.com/classroom/themes/img_bookclub.jpg',
 'https://www.gstatic.com/classroom/themes/img_code.jpg',
'https://www.gstatic.com/classroom/themes/img_learnlanguage.jpg',
 'https://www.gstatic.com/classroom/themes/img_breakfast.jpg'
   
  ];

  // Set a random background image when the component mounts
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * backgroundImages.length);
    setRandomBackgroundImage(backgroundImages[randomIndex]);
  }, []);
  
  return (
    <div className="bg-gray-100 lg:p-4 w-[80%] pt-12">
      <div className="flex items-center justify-center mb-4 ">
        <div className="bg-cover bg-center h-[20vh] w-full" style={{ backgroundImage: `url(${randomBackgroundImage})` }}>
          <div className="text-white font-bold text-4xl p-6 ">
            {clasroom.name}
          </div>
        </div>
      </div>
      <div className="text-gray-600 mb-4 "><SubNavbar clasroom={clasroom} teacherName={teacherName} forms={forms} results={results} studentNames={studentNames}/></div>
    </div>
  );
};

export default Main;