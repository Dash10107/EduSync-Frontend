import React, { useEffect, useState } from "react"
import  "./Navbar.css"
import { Drawer, Dropdown } from 'antd';
import { useNavigate } from "react-router-dom";
import logo from "../../Assets/logo.png";
import axios from "axios";
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';

import Sidebar from "../SideBar/Sidebar";
const Navbar = (props) => {

  const {isLogin} = props;

  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [userDetailName,setUserName] = useState("");
  const [fullName,setFullName] = useState("");
const isAdmin = localStorage.getItem("Admin");
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  
  const fetchUser= async()=>{
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
      type: 'divider',
    },
    {
      label:<button onClick={()=>{navigate("/home")}}>Home</button>,
      key: '1',
    },
    {
      type: 'divider',
    },{
      label:<button onClick={handleLogout}>Logout</button>,
      key: '2',
    },

  ];



  return (
    <div className="navbar-main  ">
      <div className=" hamburger justify-start">
   {isLogin? (<span></span>):(<span className="" > 
   
   <MenuRoundedIcon onClick={showDrawer} fontSize={window.innerWidth <= 600 ? "large" :"larger"}/></span>)} 
    {/* <span className="underlining">{localStorage.getItem("SubjectName")}</span> */}
      </div>
<div className=" justify-center">
<img src={logo} className='logoImg rounded ' onClick={()=>{navigate("/home")}}   alt=" 1" />
</div>
{isLogin ? (<div className=" justify-end lastDiv"></div>):
(<div>
<Dropdown menu={{ items }} trigger={['click']}>

<div className=" justify-end lastDiv">


  <span className='cirlceuser'> <span className='circletext'> 
   {userDetailName}
   </span> </span>

  <div>
  {fullName}
  </div>
</div>
</Dropdown>
</div>)}
 <Drawer
        title={<p></p>}
        placement={"left"}
        
        onClose={onClose}
        open={open}
      >
<Sidebar onClose={onClose} open={open}/>
      </Drawer>
    </div>
  )
};

export default Navbar;
