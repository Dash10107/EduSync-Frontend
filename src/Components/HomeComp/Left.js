import React from 'react';
import CardLayout from './CardLayout';
import PendingList from './PendingList';

function Left({modules}) {
  return (
    <>
    <div className='px-4 py-6 md:p-8 lg:p-10'>
      <span className='text-lg md:text-lg lg:text-xl xl:text-2xl font-medium'>Continue With Courses {'->'} </span>
    </div>
    <div className='grid md:grid-cols-2 xl:grid-cols-3 justify-center px-6 md:px-8 xl:px-12'>
    {modules.map(module=>(
      <CardLayout module={module} />

    ))}
   
    </div>
    <div className='px-4 py-6 md:p-8 lg:p-10'>
      <span className='text-lg md:text-lg lg:text-xl xl:text-2xl font-medium'>Pending Works {'->'} </span>
    </div>
    <div className='px-6 md:mx-12 lg:grid lg:grid-cols-2 md:px-8 xl:px-12'>
      <PendingList />
      <PendingList />
      <PendingList />
      <PendingList />
      <PendingList />
    </div>
    </>
  );
}

export default Left;
