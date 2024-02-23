import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ProfileComp.css";
import profile from "../../../Assets/Profile.png";
import joining from "../../../Assets/icons8-date-50 1.png"
import Navbar from "../../../Layouts/Navbar/Navbar";
import { Progress } from "antd";
import { useNavigate } from "react-router-dom";
import Loader from "../../../Layouts/Loader/Loader";
import { FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material';
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import { styled } from '@mui/system';

const ProfileComp = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userDetails,setUserDetails] = useState({});
  const [progressPercentage,setProgressPercentage] = useState(0);
  const [chaptersStarted,setChapterStarted] = useState(0);
  const [modulesStarted,setModulesStarted] = useState(0);
  const [subchaptersStarted,setSubChapterStarted] = useState(0);

 

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

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = new Date(dateString).toLocaleDateString(undefined, options);
    return formattedDate;
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

 
  const [feedback, setFeedback] = useState('');



  const handleFeedbackChange = (event) => {
    
    setFeedback(event.target.value);
  };

  const [subadminUsers, setSubadminUsers] = useState([]);
  const [selectedName, setSelectedName] = useState('');
  const [selectedUserId, setSelectedUserId] = useState('');

  const handleSubmit = async () => {
    try {
      const subAdminId = selectedUserId
      const message = feedback
      console.log('SubAdminId',subAdminId);
      console.log('message',message);
      
      
      if(subAdminId === "" || message === "" ){
        console.log('Please fill the values');
        
        return
      }
      // Make a POST request to the server
      const response = await axios.post(
        'https://edusync-backend.onrender.com/feedandnotice/post-feedback',
        {
          subAdminId: subAdminId,
          message: message,
        },
        {
          headers: {
            Authorization: `${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
        }
      );
  
      const result = response.data; // response.data is used to get the data from the response
      console.warn('Result', result);
  
      if (result.message) {
        // Handle success, for example, clear the form
        setSelectedUserId('');
        setFeedback('');
        console.log('Feedback posted successfully');
      }
    } catch (error) {
      console.error('Error posting feedback:', error);
    }
  };
  
  const handleNameChange = (event) => {
    const selectedOption = event.target.value;
    const selectedSubadmin = subadminUsers.find(user => user.name === selectedOption);

    setSelectedName(selectedOption);
    setSelectedUserId(selectedSubadmin ? selectedSubadmin._id : '');
  };

  const fetchSubadminUsers = async () => {
    try {
      const response = await axios.get('https://edusync-backend.onrender.com/users/subadminUsers',{      headers: {
        Authorization: localStorage.getItem("token"),
      }});
      setSubadminUsers(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching subadmin users:', error);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchUser();
    fetchMainProgress();
    fetchSubadminUsers();
      }, []);




  return (
    <div >
    <Navbar/>
      {loading ? (
        <Loader/>
      ) : userData ? (
        <div className="main-profile-container">
        <div className="profile-details-container">
      <div className="profile-image">
        <img src={profile} alt="Profile" />
      </div>
      <div className="profile-text">
        <p> {userData.name}</p>
        <p> {userDetails.email}</p>
        <div className="joining-container">
  <div className="joining-image">
    <img src={joining} alt="" />
  </div>
  <div className="joining-text">
    <p>Date of Joining</p>
    <p>{formatDate(userDetails.date)}</p>
  </div>
</div>


      </div>
    </div>

        
    <div className="progress-card" onClick={()=>{navigate("/profile/modules")}}>
  <div className="progress-container" style={{paddingLeft:"3vw"}}>
    <Progress
      type="circle"
      percent={progressPercentage}
      strokeColor={{ '0%': '#108ee9', '100%': '#87d068' }} // Set the color to your desired col
      format={() => `${progressPercentage}%`}
      size={window.innerWidth <= 600 ? 100 : 180} 
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
      size={window.innerWidth <= 600 ? 100 : 180} 
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
      size={window.innerWidth <= 600 ? 100 : 180} 
      strokeWidth={8}
      trailColor={"#fff"} // Set the color of the empty progress bar
     
        
    />
  </div>
  <div className="text-container">
    <p>Subchapters Completed</p>
  </div>
</div>

<div className="feedback-form">
  <div className="input-group">
    <label htmlFor="name" className="label">
      Select Name:
    </label>
    <select id="name" value={selectedName} onChange={handleNameChange} className="select">
      <option value="">Select...</option>
      {subadminUsers?.map((user) => (
        <option key={user._id} value={user.name}>
          {user.name}
        </option>
      ))}
    </select>
  </div>

  <div className="input-group">
    <label htmlFor="feedback" className="label">
      Enter your feedback:
    </label>
    <textarea
      id="feedback"
      placeholder="Enter your feedback..."
      value={feedback}
      onChange={handleFeedbackChange}
      rows={5}
      className="textarea feedback-textarea"
    />
  </div>
<div className="submit_Div">
  <button className="submit-button" onClick={handleSubmit}>
    Submit
  </button>
  </div>
</div>




          {/* <ul>
            {userDetails.progress.map((progressItem, index) => (
              <li key={index}>
                Module ID: {progressItem.moduleId} &nbsp;
                Chapter ID: {progressItem.chapterId}&nbsp;
                Subchapter ID: {progressItem.subchapterId}<br />
                Correct Percentage: {progressItem.correctPercentage}%
                
              </li>
            ))}
            <br/>
          </ul> */}
          {/* Display other user properties as needed */}

        </div>
      ) : (
        <p>Access denied</p>
      )}
    </div>
  );
};

export default ProfileComp;
