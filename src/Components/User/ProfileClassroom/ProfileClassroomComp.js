import React, { useEffect, useState } from 'react'
import Navbar from '../../../Layouts/Navbar/Navbar'
import FolderCopyIcon from '@mui/icons-material/FolderCopy';
import SchoolIcon from '@mui/icons-material/School';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import Chart from 'chart.js/auto';
const ProfileClassComp = () => {
    const navigate = useNavigate();
   
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [userDetails,setUserDetails] = useState({});
    const [formResults,setFormResults] = useState([]);
    const [testResults,setTestResults] = useState([]);

  

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
                setTestResults(response.data.userDetails.testResults)
                setFormResults(response.data.userDetails.formResults)

                 
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

          
          useEffect(() => {
            // Create the chart after the component has mounted
            createChart();
          }, [testResults]); // Recreate the chart when testResults change
        
          const createChart = () => {
            const chartCanvas = document.getElementById('myChart');
            if (!chartCanvas) return;

              // Check if a Chart instance already exists on the canvas
  const existingChart = chartCanvas.chart;
  
  // Destroy the existing Chart instance if it exists
  if (existingChart) {
    existingChart.destroy();
  }
        
            const testLabels = testResults.map((result) => result.testId);
            const testMarks = testResults.map((result) => result.marks);
        
            const ctx = chartCanvas.getContext('2d');
            new Chart(ctx, {
              type: 'bar',
              data: {
                labels: testLabels,
                datasets: [
                  {
                    label: 'Marks in Percentage',
                    data: testMarks,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                  },
                ],
              },
              options: {
                scales: {
                  y: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                      callback: (value) => `${value}%`,
                    },
                  },
                  x: {
                    title: {
                      display: true,
                      text: 'Test ID',
                    },
                  },
                },
                responsive: true,
                maintainAspectRatio: false,
              },
            });
          };

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

        <div className='w-[100%] h-[20%] flex justify-center items-center my-8'>
            <div className='w-[60%] text-center text-4xl font-semibold '>
            <h3 className='text-gray-800'>Classroom Performance Of Student</h3>
            </div>

        </div>
        <div className='w-[100%] h-[70%] flex justify-center items-center my-8'>
        <div className='w-[60%] text-center text-4xl font-semibold '>
        {/* <canvas id='myChart'></canvas> */}

    </div>
            </div>
        </div>
        </div>
    </>
  )
}

export default ProfileClassComp
