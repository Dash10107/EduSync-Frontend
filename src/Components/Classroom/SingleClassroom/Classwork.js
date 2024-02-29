import React from 'react'
import SupriseTest from './SupriseTest'
import TestResults from './TestResults'

const Classwork = ({forms,results}) => {
  return (
    <>
     <div className='h-[20%]'></div>
            <div className='lg:h-[35%]'>
            <SupriseTest  forms={forms}   />
            </div>
            <div className='lg:h-[35%]'>
            <TestResults results={results} />
     </div>
    </>
  )
}

export default Classwork