import React from "react"
import  "./Navbar.css"
import { Dropdown } from 'antd';
import { useNavigate } from "react-router-dom";
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
    <div className="navbar-main">
      <div>
    c
      </div>
<div>
    logo
</div>
<div>
<Dropdown menu={{ items }} trigger={['click']}>
<div>Profile Image</div>
</Dropdown>
</div>
    </div>
  )
};

export default Navbar;
