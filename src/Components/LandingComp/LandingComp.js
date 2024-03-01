

import React, { useEffect, useState } from 'react';

import './Components/CloseModalButton.css';
import Heading from './Components/Heading';
import LatestNotice from './Components/LatestNotice';
import SingleNotice from './Components/SingleNotice';
import axios from 'axios';
import Navbar from '../../Layouts/Navbar/Navbar';
import Footer from '../../Layouts/Footer/Footer';


// Placeholder for NoticeModal component
const NoticeModal = ({ isOpen, closeModal, noticeData }) => {
    // Placeholder content, replace with your actual modal content
    return (
        <div className={`fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 ${isOpen ? '' : 'hidden'}`}>
            <div className=' absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-md w-[60%] h-[60vh] sm:h-[65vh] overflow-y-auto  border-black'>

                <div className='flex border-2 rounded p-2 m-1 border-black'>
                    <h2 className='sm:text-xl font-bold sm:w-[70%] w-[60%] text-sm'>{noticeData?.title || ''}</h2>
                    <p className='font-bold text-xs md:text-sm w-[40%] sm:w-[30%] text-center'>{noticeData?.date || ''}</p>
                    <p className='font-semibold text-xs md:text-sm w-[20%] text-center hidden sm:block'>{noticeData?.time || ''}</p>
                </div>

                <p className='mb-4 text-xs sm:text-base p-2'>{noticeData?.description || ''}</p>
                <button onClick={closeModal} className='custom-button w-[40%] sm:w-[20%] mx-2 mb-2 '>Close</button>
            </div>
        </div>
    );
};
// ... (Previous code)

function NoticeBoard() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedNotice, setSelectedNotice] = useState(null);
    const [notices,setNotices] = useState([]);
    const [latestNotices,setLatestNotices] = useState([]);
    const [searchInput, setSearchInput] = useState(""); 
    const [searchModules,setSearchModules] = useState([]);
    const currentPath = window.location.pathname;
    const isNoticeBoard = currentPath.startsWith("/noticeboard");
    const openModal = (noticeData) => {
        setSelectedNotice(noticeData);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedNotice(null);
        setIsModalOpen(false);
    };

    const fetchNotices = async()=>{
  try {
      await axios.get('https://edusync-backend.onrender.com/feedandnotice/get-notices').then(response => {
        console.log("Response",response);
        
        if(response.status===200){
  
        setNotices(response.data.allNotices)
        setLatestNotices(response.data.latestThreeNotices);
        
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
    return (
        <>
        {!isNoticeBoard?(          <Heading searchInput={searchInput} setSearchInput={setSearchInput} handleSearchInputChange={handleSearchInputChange} />) : (<Navbar/>) }
  
            <div className='flex'>

                {/* Container with three notices in the 1st part */}
                <div className='w-[35%] lg:w-[25%] py-4 px-2 lg:p-4 bg-gray-200 overflow-y-auto space-y-4 mx-2 mt-2 h-[92vh] rounded hidden sm:block'>
                    <h2 className="text-xl font-bold text-center 2xl:text-4xl ">Latest Notices</h2>
                    {
                      latestNotices.map((notice)=>{
                        const dateObject = new Date(notice?.date) || notice.date;
  const formattedDate = dateObject.toLocaleDateString('en-US', { timeZone: 'UTC' });
                        return (
                        
               <LatestNotice key={notice._id} notice={notice} onClick={() => openModal({ title: notice.title, description: notice.content, date:formattedDate })} />
               
                      )})
                    }
                    
                    {/* Add more SingleNotice components as needed */}
                </div>

                {/* Notices Section in the last 3 parts */}
                <div className='lg:w-[95%] mx-auto sm:w-[75%] bg-white h-[86vh] sm:h-[86vh] lg:h-[92vh] overflow-y-auto mt-2 rounded mr-2 '>
                    <div className='flex flex-col items-center justify-center space-y-7 p-4 '>
                        <h2 className="text-xl font-bold text-left text-black 2xl:text-4xl">Important Notices !!</h2>
                        {
                          searchInput !== "" ? (
        searchModules.map((notice) => {
          return (
                  <SingleNotice key={notice._id} notice={notice} onClick={() => openModal({ title: notice.title, description: notice.content, date: notice.date})} />
                  
                          )
        }) 
                          ):(
                          notices?.map((notice)=>{
                          return (
                  <SingleNotice key={notice._id} notice={notice} onClick={() => openModal({ title: notice.title, description: notice.content, date: notice.date})} />
                  
                          )
                        }))}
                        {/* Add more SingleNotice components as needed */}
                    </div>
                </div>
            </div>

            {/* Modal */}
            <NoticeModal isOpen={isModalOpen} closeModal={closeModal} noticeData={selectedNotice} />
            {isNoticeBoard && <Footer/>}
        </>
    );
}

export default NoticeBoard;
