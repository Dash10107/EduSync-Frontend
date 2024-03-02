import React, { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Content from './Content';
import People from './People';
import Classwork from './Classwork';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const SubNavbar = ({ clasroom,teacherName,studentNames,forms,results,fetchClassroom }) => {
  const theme = useTheme();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const windowWidth = window.innerWidth;
  const bool =   windowWidth>=1024 ? true : false;

  return (
    <>
      <Box>
        <div className='lg:flex items-center'>
          <div className='lg:w-[50%] my-4'>
            <span className='lg:text-medium text-sm md:text-md'>Class Code : <span className='font-semibold lg:text-xl text-md  md:text-lg'>{clasroom.code}</span></span>
          </div>
          <div className='lg:w-[50%]'>
            <AppBar position="static">
              <Tabs
                value={value}
                onChange={handleChange}
                variant="fullWidth"
                className='bg-gray-100 text-gray-900'
              >
                {/* Show three tabs on mobile */}
                <Tab label="Stream" {...a11yProps(0)} />
             
               {!bool  && <Tab className='lg:hidden ' label="Classwork" {...a11yProps(1)} /> } 
              
                <Tab label="People" {...a11yProps(2)} />
              </Tabs>
            </AppBar>
          </div>
        </div>
        <TabPanel value={value} index={0} dir={theme.direction}>
          <Content clasroom={clasroom} fetchClassroom={fetchClassroom} />
        </TabPanel>

        <TabPanel value={value} index={1} dir={theme.direction}>
          <Classwork forms={forms} results={results} />
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          <People teacherName={teacherName} fetchClassroom={fetchClassroom} studentNames={studentNames} />
        </TabPanel>
      </Box>
    </>
  );
}

export default SubNavbar;
