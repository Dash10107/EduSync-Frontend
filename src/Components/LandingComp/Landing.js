import React, { useEffect, useState } from 'react'
import LandingList from './LandingList'
import Divider from '@mui/material/Divider'
import ModalLandingList from './ModalLandingList'
import Navbar from '../../Layouts/Navbar/Navbar'
import axios from 'axios'
import Footer from '../../Layouts/Footer/Footer'


const LandingComp = () => {
  const [selectedNotice, setSelectedNotice] = useState(null);
    const [notices,setNotices] = useState([]);
    const [searchInput, setSearchInput] = useState(""); 
    const [searchModules,setSearchModules] = useState([]);
    const currentPath = window.location.pathname;
    const isNoticeBoard = currentPath.startsWith("/noticeboard");

    const fetchNotices = async()=>{
      try {
          await axios.get('https://edusync-backend.onrender.com/feedandnotice/get-notices').then(response => {
            console.log("Response",response);
            
            if(response.status===200){
      
            setNotices(response.data.allNotices)
            
            
            }else{console.log("Status Code",response.status);
            }
           
          })
        } catch (error) {
          console.log("error", error)
        }
        }
    
        useEffect(()=>{fetchNotices()},[])
    
          // Event handler for updating the search input value
          const handleSearchInputChange = (event) => {
            setSearchInput(event.target.value);
          };
        
            // Filter modules based on search input
            useEffect(() => {
              // Filter modules based on the search input value
              const searchedModulesData = notices.filter((module) =>
                module.title.toLowerCase().includes(searchInput.toLowerCase()) || module.content.toLowerCase().includes(searchInput.toLowerCase())
              );
              setSearchModules(searchedModulesData)
            }, [searchInput,notices]);

  return (<>
   <Navbar isLogin={!isNoticeBoard}  />
    <div className="flex ">
    
      <div> 
       
      </div>
      <div className="flex-1 flex flex-col overflow-y-hidden mt-14 ">
        <div className='py-8 lg:px-12 px-4 xl:px-20 md:px-8 h-[90vh] ' style={{overflowY: 'scroll', '-ms-overflow-style': 'none', 'scrollbar-width': 'none' }}>
          <div className='flex justify-between items-center lg:px-10 px-4 lg:text-3xl text-2xl py-4 font-semibold bg-gradient-to-r rounded-lg my-2'>
            <div className=''>Notices</div>
            <div className="relative w-[60%] max-w-xl ">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
              </div>
              <input type="text" id="search-navbar" className="block w-full p-3 pl-10 text-sm font-semibold text-gray-900 border border-blue-300 rounded-lg bg-blue-50 focus:ring-blue-200 focus:border-blue-200 dark:bg-[#271D76] dark:border-gray-600 dark:placeholder-gray-200 dark:text-white dark:focus:ring-blue-200 dark:focus:border-blue-200" placeholder="Search..." 
              value={searchInput}
          onChange={handleSearchInputChange}
          />
            </div>
          </div>
          {
                          searchInput !== "" ? (
        searchModules.map((notice) => {
          return (
          <LandingList notice={notice} />
          )
        }) 
                          ):(
                          notices?.map((notice)=>{
                          return (
          <LandingList notice={notice} />
          )
                        }))}
        </div>
      </div>
      <div className='w-[40%] hidden md:block'>
        <div className='h-screen flex items-center'>
          <img src="https://img.freepik.com/free-vector/internet-addiction-abstract-concept-vector-illustration-real-life-substitution-living-online-disorder-web-addiction-digital-addictive-behavior-internet-overuse-social-media-abstract-metaphor_335657-2266.jpg?w=740&t=st=1709365826~exp=1709366426~hmac=4d1d87dae7e862bd6ac2d6d5cd37a75d44d21733abd1025f44bd101252654a0c" alt="" />
        </div>
      </div>
      {isNoticeBoard && <Footer/>}
    </div>
   

    </>
  )
}

export default LandingComp