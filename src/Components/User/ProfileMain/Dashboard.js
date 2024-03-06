import React from 'react'
import DashboardLeft from './DashboardLeft'
import DashboardRight from './DashboardRight'

const Dashboard = ({userData,userDetails}) => {
  return (
    <>
       <div className='lg:flex'>
          <div className='lg:w-[60%]'>
            <DashboardLeft userData={userData} userDetails={userDetails}  />
          </div>
          <div className='lg:w-[40%]'>
            <DashboardRight userData={userData} userDetails={userDetails}  />
          </div>
       </div>
    </>
  )
}

export default Dashboard
