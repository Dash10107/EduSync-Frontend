import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ProfileComp.css";
import profile from "../../../Assets/Profile.png";
import joining from "../../../Assets/icons8-date-50 1.png"
import FolderCopyIcon from '@mui/icons-material/FolderCopy';
import SchoolIcon from '@mui/icons-material/School';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import Navbar from "../../../Layouts/Navbar/Navbar";
import { Progress } from "antd";
import { useNavigate } from "react-router-dom";
import Loader from "../../../Layouts/Loader/Loader";
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Ticks,
} from 'chart.js'

const ProfileComp = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userDetails,setUserDetails] = useState({});
  const [progressPercentage,setProgressPercentage] = useState(0);
  const [chaptersStarted,setChapterStarted] = useState(0);
  const [modulesStarted,setModulesStarted] = useState(0);
  const [subchaptersStarted,setSubChapterStarted] = useState(0);
  const [moduleProgressData, setModuleProgressData] = useState([]);
 
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  )

 

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

 const fetchModulesProgress = async () => {
    try {
      const response = await axios.get("https://edusync-backend.onrender.com/progress/modules", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      console.log("Response",response);


      if (response.status === 200) {
        setModuleProgressData(response.data?.allModulesProgress);
      } else {
        console.log("Status Code", response.status);
      }
    } catch (error) {
      console.error("error", error);
    }
  };

  const fetchMainProgress = async()=>{
    try {
      await axios.get('https://edusync-backend.onrender.com/progress/',{
        headers: {
          Authorization: localStorage.getItem("token"),
        }
       }).then(response => {
        console.log("Response",response);
        
        if(response.status===200){
          console.log("Response for Progress", response);
setProgressPercentage(Number(response.data.progressPercentage).toFixed(2));   

// Initialize counters
let chaptersStarted = 0;
let subchaptersCompleted = 0;
let modulesStarted = 0;

// Create a Set to keep track of unique chapters and modules
const uniqueChapters = new Set();
const uniqueModules = new Set();

const progressData = response.data.progressData;
// Iterate through the progressData
progressData.forEach((item) => {
  // Count unique chapters and modules
  uniqueChapters.add(item.chapterId);
  uniqueModules.add(item.moduleId);

  // Check if subchapter is completed (assuming correctPercentage >= 80 indicates completion)
  if (item.correctPercentage >= 80) {
    subchaptersCompleted++;
  }
});

// Count the total number of chapters and modules started
chaptersStarted = uniqueChapters.size;
modulesStarted = uniqueModules.size;

console.log('Total Chapters Started:', chaptersStarted);
console.log('Total Subchapters Completed:', subchaptersCompleted);
console.log('Total Modules Started:', modulesStarted);

setChapterStarted(chaptersStarted)
setSubChapterStarted(subchaptersCompleted)
setModulesStarted(modulesStarted);

        }else{console.log("Status Code",response.status);
        }
       
      })
    } catch (error) {
      console.log("error", error)
    }
  }

 
 
  
  const handleLogout = (e)=>{
    e.preventDefault();
    localStorage.setItem("token","")
    localStorage.setItem("allowRedirect",false);
    navigate("/login");
    
  }
   // Bar chart data
   const barChartData = {
    labels: moduleProgressData.map((module) => module.moduleName),
    datasets: [
      {
        label: 'Module Progress',
        data: moduleProgressData.map((module) => module.moduleProgressPercentage),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };


  useEffect(() => {
    fetchUser();
    fetchMainProgress();
    fetchModulesProgress();
  
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
        <div className='w-[100%] lg:w-[85%] mb-4'>

<div className='w-[100%] h-[20%] flex justify-center items-center my-8 '>
    <div className='w-[60%] text-center text-4xl font-semibold '>
    <h3 className='text-gray-800'>Content Progress</h3>
    </div>
    </div>  
    <div className="flex flex-col justify-center items-center  ">
    <div className="progress-card" onClick={()=>{navigate("/profile/modules")}}>
  <div className="progress-container" >
    <Progress
      type="circle"
      percent={progressPercentage}
      strokeColor={{ '0%': '#108ee9', '100%': '#87d068' }} // Set the color to your desired col
      format={() => `${progressPercentage}%`}
      size={window.innerWidth <= 600 ? 80 : 180} 
      strokeWidth={8}
      trailColor="#fff" // Set the color of the empty progress bar
    />
  </div>
  <div className="text-container">
    <p>Complete Progress</p>
  </div>
</div>
 
  <div className="progress-card" onClick={()=>{navigate("/profile/modules")}}>
  <div className="progress-container">
    <Progress
      type="circle"
      percent={chaptersStarted}
      strokeColor={{ '0%': '#108ee9', '100%': '#87d068' }}// Set the color to your desired col
      format={() => `${chaptersStarted}%`}
      size={window.innerWidth <= 600 ? 80 : 180} 
      strokeWidth={8}
      trailColor="#fff" // Set the color of the empty progress bar
    />
  </div>
  <div className="text-container">
    <p>Chapters Started</p>
  </div>
</div>
  <div className="progress-card" onClick={()=>{navigate("/profile/modules")}}>
  <div className="progress-container">
    <Progress
      type="circle"
      percent={subchaptersStarted}
      strokeColor={{ '0%': '#108ee9', '100%': '#87d068' }}
      format={() => `${subchaptersStarted}%`}
      size={window.innerWidth <= 600 ? 80 : 180} 
      strokeWidth={8}
      trailColor={"#fff"} // Set the color of the empty progress bar
     
        
    />
  </div>
  <div className="text-container">
    <p>Subchapters Completed</p>
  </div>
</div>

<div className="w-[80%] mt-4">
          <Bar
            data={barChartData}
            options={{
              scales: {
                y: {
                  beginAtZero: true,
                  max: 100,
                },
              },
              plugins: {
                legend: {
                  display: false,
                },
              },
            }}
          />
        </div>

    </div>

        </div>
        </div>

       

    

        

   
    </>
  );
};

export default ProfileComp;
