import React, { useState } from "react"
import  "./Dashboard.css"
import Navbar from "../../../Layouts/Navbar/Navbar";
import axios from "axios";

const Dashboard = (props) => {
  const [classrooms, setClassrooms] = useState([]);
  const [loading,setLoading] = useState(false);

  const fetchClassrooms = async () => {
    setLoading(true);
    try {

      await axios.get('http://localhost:5000/subadmin/classrooms/student', {
        headers: {
          Authorization: localStorage.getItem("token"),
        }
      }).then(response => {
        console.log("Response", response);

        if (response.status === 200) {
          const classroomsArray = response?.data?.classrooms;
          setClassrooms(classroomsArray);
          console.log(classroomsArray);
        } else {
          console.log("Status Code", response.status);
        }
      });
    } catch (error) {
      console.log("error", error);
    }finally{
      setLoading(false);
    }
  }

  return (
    <div>
          <Navbar />

 <div className="subbar">

 </div>
 <div className="all-classrooms">

 </div>
    </div>
  )
};

export default Dashboard;
