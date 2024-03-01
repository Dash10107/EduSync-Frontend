import React from 'react';
import { FaBookmark } from "react-icons/fa";

function LatestNotice({notice, onClick }) {
  const firstSentence = notice?.content?.substring(0, notice?.content.indexOf('.') + 1) || notice?.content;
  return (
    <div className='flex space-x-1 md:space-x-2 font-medium font-serif text-[10px] sm:text-xs md:text-base bg-white rounded border-black shadow-sm shadow-gray-500 py-1 w-[95%] cursor-pointer'>
      

      {/* Notice data or content */}
      <div className='w-[70%] sm:w-[92%] border-black max-h-[25vh] overflow-hidden text-md 2xl:text-lg ml-3 mb-2'>
        <div className='w-full text-left font-bold text-lg md:text-base 2xl:text-2xl border-black my-1'>
          {notice.title}
        </div>
        <p className=''> 
       {firstSentence}
          <span onClick={onClick} className='text-blue-500 cursor-pointer mt-11 text-md 2xl:text-lg'> Read More...</span>
   
        </p>


      </div>


      {/* Date */}
      {/* <div className='w-[24%] md:w-[10%] text-center border-black overflow-hidden overflow-ellipsis whitespace-nowrap mt-12'>
        17 sept
      </div> */}


    </div>
  );
}

export default LatestNotice;
