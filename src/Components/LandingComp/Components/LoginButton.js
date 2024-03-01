import React, { useState } from 'react';
import { IoMdLogIn } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

function LoginButton() {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
    onClick={()=>{navigate("/login")}}
      className={`relative flex space-x-1 overflow-hidden rounded py-1 px-4 sm:px-6 2xl:px-8 focus:outline-none focus:ring focus:border-blue-300 transform transition hover:scale-105 ${
        isHovered ? 'bg-blue-900 text-white' : 'bg-white text-black'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span
        className={`absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-200 to-blue-950 transition-transform transform ${
          isHovered ? 'translate-x-0' : '-translate-x-full'
        }`}
      ></span>
      <span className="relative z-10 text-sm sm:text-base 2xl:text-xl font-semibold">LOGIN</span>
      <span className="relative z-10 text-2xl 2xl:text-3xl">
        <IoMdLogIn />
      </span>
    </button>
  );
}

export default LoginButton;
