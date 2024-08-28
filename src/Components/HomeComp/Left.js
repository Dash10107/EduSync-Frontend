import React from 'react';
import CardLayout from './CardLayout';
import PendingList from './PendingList';
import { Box, Skeleton } from '@mui/material';

function Left({modules,allLoading,loading,classrooms}) {
  console.log(allLoading);
  return (
    <>
    <div className='px-4 py-6 md:p-8 lg:p-10'>
      <span className='text-lg md:text-lg lg:text-xl xl:text-2xl font-medium'>Continue With Courses {'->'} </span>
    </div>
    <div className='grid md:grid-cols-2 xl:grid-cols-3 justify-center px-6 md:px-8 xl:px-12'>
    {
     
      allLoading?(
        [1, 2, 3].map((index) => (
          <Box key={index} sx={{ pt: 0.5, width: '100%', maxWidth: '400px',     margin: '0 auto 10px',
    height: { xs: '100px', sm: '150px', md: '200px' }, }}>
             <Skeleton height="100%" width={{ xs: '80%', sm: '70%', md: '60%' }} />
                <Skeleton width={{ xs: '80%', sm: '70%', md: '60%' }} />
              </Box>
            ))

      ):(
      modules?.map(module=>(
      <CardLayout key={module.id} module={module} />

    )))}
   
    </div>
    <div className='px-4 py-6 md:p-8 lg:p-10'>
      <span className='text-lg md:text-lg lg:text-xl xl:text-2xl font-medium'>Latest Updates {'->'} </span>
    </div>
    <div className='px-6 md:mx-12 lg:grid lg:grid-cols-2 md:px-8 xl:px-12'>
    {
      classrooms.map((classroom)=>{
        return ( <PendingList  classroom={classroom} />)
      })
    }
     
    </div>
    </>
  );
}

export default Left;
