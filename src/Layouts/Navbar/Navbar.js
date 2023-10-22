import React, { useEffect, useState } from "react"
import  "./Navbar.css"
import { Dropdown } from 'antd';
import { useNavigate } from "react-router-dom";
import logo from "../../Assets/logo.jpeg";
import axios from "axios";

const Navbar = (props) => {

  const {isLogin} = props;

  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [userDetailName,setUserName] = useState("");
  const [fullName,setFullName] = useState("");
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
        
        const words = response.data.userDetails.name.split(" "); // Split the string into words
        const initials = words.map(word => word.charAt(0).toUpperCase()).join(" "); // Get the first character (initial) of each word and capitalize it
      
        setFullName(response.data.userDetails.name);
        
        setUserName(initials);

    
         
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
  const takeToProfile = (e)=>{
    e.preventDefault();
    navigate("/profile");
    
  }

  const handleLogout = (e)=>{
    e.preventDefault();
    localStorage.setItem("token","")
    localStorage.setItem("allowRedirect",false);
    navigate("/login");
    
  }

  useEffect(()=>{fetchUser()},[]);


  const items = [
    {
      label: <button onClick={takeToProfile} >Profile</button>,
      key: '0',
    },
    {
      label:<button onClick={handleLogout}>Logout</button>,
      key: '1',
    },
    {
      type: 'divider',
    },
    {
      label: '3rd menu item',
      key: '3',
    },
  ];



  return (
    <div className="navbar-main  ">
      <div className="justify-start">
    <span className="underlining" onClick={()=>{navigate("/home")}}>Home </span>
    {/* <span className="underlining">{localStorage.getItem("SubjectName")}</span> */}
      </div>
<div className=" justify-center">
<img src={logo} className='h-[5vh] rounded remove-white-bg'   alt=" 1" />
</div>
{isLogin ? (<></>):
(<div>
<Dropdown menu={{ items }} trigger={['click']}>

<div className=" justify-end lastDiv">

  <div className="profile rounded-full bg-white mr-3 font-bold py-1  px-2 ">
    {userDetailName}
  </div>
  <div>
  {fullName}
  </div>
</div>
</Dropdown>
</div>)}

    </div>
  )
};

export default Navbar;
