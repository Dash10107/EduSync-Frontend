import React from 'react'
import SupriseTest from './SupriseTest'
import TestResults from './TestResults'

const Classwork = () => {
  return (
    <>
     <div className='h-[20%]'></div>
            <div className='lg:h-[35%]'>
            <SupriseTest />
            </div>
            <div className='lg:h-[35%]'>
            <TestResults />
     </div>
    </>
  )
}

export default Classwork