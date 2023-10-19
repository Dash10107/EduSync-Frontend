import React from "react"
import  "./Navbar.css"
import { Dropdown } from 'antd';
import { useNavigate } from "react-router-dom";
import logo from "../../Assets/logo.jpeg";
const Navbar = (props) => {

  const navigate = useNavigate();

  const takeToProfile = (e)=>{
    e.preventDefault();
    navigate("/profile");
    
  }

  const handleLogout = (e)=>{
    e.preventDefault();
    localStorage.setItem("token","")
    navigate("/login");
    
  }

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
    c
      </div>
<div className=" justify-center">
<img src={logo} className='h-[5vh] rounded remove-white-bg'   alt=" 1" />
</div>
<div>
<Dropdown menu={{ items }} trigger={['click']}>

<div className=" justify-end">
  <div className="profile rounded-full bg-white mr-3 font-bold py-1  px-2 ">
    DJ
  </div>
</div>
</Dropdown>
</div>
    </div>
  )
};

export default Navbar;
