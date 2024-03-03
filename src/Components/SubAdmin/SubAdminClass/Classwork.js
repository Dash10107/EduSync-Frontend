import React from 'react'
import SupriseTest from './SupriseTest'
import TestResults from './TestResults'

const Classwork = ({forms,results,clasroom,fetchClassroom}) => {
  return (
    <>
     <div className='h-[20%]'></div>
            <div className='lg:h-[35%]'>
            <SupriseTest  forms={forms}  fetchClassroom={fetchClassroom}  />
            </div>
            <div className='lg:h-[35%]'>
            <TestResults results={results} clasroom={clasroom} fetchClassroom={fetchClassroom} />
     </div>
    </>
  )
}

export default Classwork