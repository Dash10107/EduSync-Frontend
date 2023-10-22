import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ProfileComp.css";
import profile from "../../Assets/Profile.png";
import joining from "../../Assets/icons8-date-50 1.png"
import Navbar from "../../Layouts/Navbar/Navbar";
import { Progress } from "antd";
import { useNavigate } from "react-router-dom";

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
        // Make a GET request to the protected route
     await   axios
        .get("http://localhost:5000/users/protected", {
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
      await axios.get('http://localhost:5000/progress/',{
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

  useEffect(() => {
    fetchUser();
    fetchMainProgress();
      }, []);

  return (
    <div >
    <Navbar/>
      {loading ? (
        <p>Loading...</p>
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
  <div className="progress-container">
    <Progress
      type="circle"
      percent={progressPercentage}
      strokeColor="#e92061" // Set the color to your desired col
      format={() => `${progressPercentage}%`}
      size={150}
      strokeWidth={8}
      trailColor="#5f3d9b" // Set the color of the empty progress bar
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
      strokeColor="#e92061" // Set the color to your desired col
      format={() => `${chaptersStarted}%`}
      size={150}
      strokeWidth={8}
      trailColor="#5f3d9b" // Set the color of the empty progress bar
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
      strokeColor="#e92061" // Set the color to your desired col
      format={() => `${subchaptersStarted}%`}
      size={150}
      strokeWidth={8}
      trailColor="#5f3d9b" // Set the color of the empty progress bar
    />
  </div>
  <div className="text-container">
    <p>Subchapters Completed</p>
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
