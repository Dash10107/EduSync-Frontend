import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ProfileComp.css";
const ProfileComp = () => {

  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userDetails,setUserDetails] = useState({});

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
  useEffect(() => {
fetchUser();
  }, []);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = new Date(dateString).toLocaleDateString(undefined, options);
    return formattedDate;
  };

  return (
    <div>
      <h2>Profile Details</h2>
      {loading ? (
        <p>Loading...</p>
      ) : userData ? (
        <div>
          <p>Access granted!</p>
          <p>User ID: {userData.id}</p>
          <p>User Name: {userData.name}</p>
          <p>Email : {userDetails.email}</p>
          <p>Date Joined: {formatDate(userDetails.date)}</p>
          <h3>Progress Details:</h3>
          <ul>
            {userDetails.progress.map((progressItem, index) => (
              <li key={index}>
                Module ID: {progressItem.moduleId} &nbsp;
                Chapter ID: {progressItem.chapterId}&nbsp;
                Subchapter ID: {progressItem.subchapterId}<br />
                Correct Percentage: {progressItem.correctPercentage}%
                
              </li>
            ))}
            <br/>
          </ul>
          {/* Display other user properties as needed */}
        </div>
      ) : (
        <p>Access denied</p>
      )}
    </div>
  );
};

export default ProfileComp;
