import React, { useEffect, useState } from 'react'
import Navbar from '../../../Layouts/Navbar/Navbar'
import FolderCopyIcon from '@mui/icons-material/FolderCopy';
import SchoolIcon from '@mui/icons-material/School';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart, Pie,
} from 'recharts';

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

          const renderDoughnutCharts = () => {
            return testResults.map((test, index) => (
              <div className='m-8 items-center'>
              <div key={index}>
                <h4 className='text-lg font-semibold text-gray-800 mb-2'>{test.testName}</h4>
                <ResponsiveContainer width='100%' height={140}>
                  <PieChart className='w-24' height={240}>
                    <Pie    
                      className='h-20 w-20'
                      dataKey='marks'
                      data={[{ marks: test.marks }, { marks: 100 - test.marks,empty: true }]}
                      innerRadius='60%'
                      outerRadius='80%'
                      fill='#8884d8'
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              </div>
            ));
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

        <div className='w-[100%] h-[40%] flex justify-center items-center my-8'>
            <div className='w-[60%] text-center text-4xl font-semibold '>
            <h3 className='text-gray-800'>Classroom Performance Of Student</h3>
            </div>

        </div>
        <div className='w-full h-screen flex flex-col items-center justify-center'>
  <div className='w-3/4 h-full text-center'>
    <ResponsiveContainer width='100%' height='80%'>
      <BarChart data={testResults} width={250} height={80} >
        <XAxis dataKey='testName' />
        <YAxis type='number' domain={[0, 100]} tickFormatter={(value) => `${value}%`} />
        <Tooltip formatter={(value) => `${value}%`} />
        <Legend />
        <Bar dataKey='marks' name='Marks' fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  </div>
  <div className='m-8 grid grid-cols-3 w-[100%]'>{renderDoughnutCharts()}</div>
</div>

        </div>
        </div>
    </>
  )
}

export default ProfileClassComp
