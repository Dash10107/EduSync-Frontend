import React, { useEffect, useState } from 'react'

import Divider from '@mui/material/Divider';
import Files from './Files';
import Navbar from '../../../Layouts/Navbar/Navbar';
import Footer from '../../../Layouts/Footer/Footer';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const SinglePostComp = () => {
    const code = localStorage.getItem("classroomCode");
    const postId = localStorage.getItem("postId");
    const classroomName = localStorage.getItem("classroomName");
    const [loading,setLoading] = useState(false);
    const navigate = useNavigate();
    const [post,setPost] = useState({});


    const fetchSinglePost = async () => {
        setLoading(true);
        try {
    
          await axios.get(`http://localhost:5000/subadmin/classrooms/${code}/posts/${postId}`, {
            headers: {
              Authorization: localStorage.getItem("token"),
            }
          }).then(response => {
            console.log("Response", response);
    
            if (response.status === 200) {
              const post = response?.data?.post;
              setPost(post);
              
    
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
useEffect(()=>{fetchSinglePost()},[])
  return (
    <>
      <div>
        <Navbar />
      </div>
      <div className='flex justify-center'>
      <div className="w-[80%] pt-12">
      <div className="flex items-center justify-center mb-4 ">
        <div onClick={()=>{navigate("/classrooms/single")}} className="bg-cover bg-center h-[20vh] w-full rounded-lg cursor-pointer" style={{ backgroundImage: `url('https://img.freepik.com/free-photo/blank-papers-multicolor-pencils-grey_114579-28815.jpg?size=626&ext=jpg&ga=GA1.1.1546980028.1708905600&semt=ais')` }}>
          <div className="text-white font-bold text-4xl p-6 ">
            {classroomName}
          </div>
        </div>
      </div>

      <div className='flex justify-center'>
      <div className='lg:w-[80%] '>
      <div className="my-4 font-semibold lg:text-3xl text-2xl">{post?.title}</div>
      {/* <div className="my-4 font-medium lg:text-lg text-md text-gray-600">Niti patel <span>• 2nd october 2024</span></div> */}
      <Divider />
      <div className='grid lg:grid-cols-2 mt-8'>
      <Files  postUrl = {post?.fileUrl}   />
      </div>
      <div className='p-4 px-8'>
        <p>{post?.content}</p>
      </div>
      </div>
      </div>


      </div> 
      </div>  
      <div>
        <Footer />
      </div>
    </>
  )
}

export default SinglePostComp