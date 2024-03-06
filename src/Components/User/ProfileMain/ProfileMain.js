import React, { useEffect, useState } from 'react'
import Navbar from '../../../Layouts/Navbar/Navbar'
import Dashboard from './Dashboard'
import FolderCopyIcon from '@mui/icons-material/FolderCopy';
import SchoolIcon from '@mui/icons-material/School';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loader from '../../../Layouts/Loader/Loader';

const ProfileMain = () => {
    const navigate=useNavigate();
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [userDetails,setUserDetails] = useState({});
    const handleLogout = (e)=>{
        e.preventDefault();
        localStorage.setItem("token","")
        localStorage.setItem("allowRedirect",false);
        navigate("/login");
        
      }

      const fetchUser= async()=>{
        setLoading(true);
            // Make a GET request to the protected route
         await   axios
            .get("https://edusync-backend.onrender.com/users/protected", {
              headers: {
                Authorization: localStorage.getItem("token"), // Include the token in the headers
              },
            })
            .then((response) => {
              if (response.status === 200) {
                console.log("Response",response);
                
                setUserData(response.data.user);
                setUserDetails(response.data.userDetails);
            
                 
              } else {
                console.log("Access denied");
              }
            })
            .catch((error) => {
              console.error("Error:", error);
            })
            .finally(() => {
              setLoading(false);
            });
      }

      useEffect(() => {
        fetchUser();
       
          }, []);

  return (
    <>
      <div>
        <Navbar isProfile={true} />   
      </div> 
      <div className='flex'>
        <div className='w-[15%] border-r-2 hidden lg:block'>
        <div>
  <button className="home-button" onClick={()=>{navigate("/profile")}}> <HomeRoundedIcon/> <p>User Details </p> </button>
    
    <button className="home-button" onClick={()=>{navigate("/content/profile")}}> <FolderCopyIcon/> <p>Content Progress </p> </button>
    
    <button className="home-button" onClick={()=>{navigate("/classroom/profile")}}> <SchoolIcon/> <p>Classrooms Performance</p> </button>
    
    <button className="home-button" onClick={()=>{navigate("/feedback")}}> <DynamicFeedIcon/> <p>Feedback</p> </button>
    <button className="home-button" onClick={handleLogout}> <LogoutIcon/> <p>Logout</p> </button>

</div>
        </div>
        <div className='w-[100%] lg:w-[85%]'>
        {loading ? <Loader/>:          <Dashboard userData={userData} userDetails={userDetails} />
 }
        </div>
      </div>
      
    </>
  )
}

export default ProfileMain
