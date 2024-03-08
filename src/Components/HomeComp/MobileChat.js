import React, { useState } from 'react';
import { AiOutlineUser, AiOutlineRobot, AiOutlineSend } from 'react-icons/ai';
import chatbotIcon from '../../Assets/robot.jpg'; // Path to your round icon image
import { motion } from 'framer-motion';

function MobileChat(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [input,setInput] = useState("");

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const closeChat = () => {
    setIsOpen(false);
  };

  const {submitChat,setChatArray,chatArray,setPrompt} = props

  return (
    <>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.3, ease: 'easeInOut', delay: 0.3 }}
            className="fixed inset-0 bg-gray-800 bg-opacity-50"
            onClick={closeChat}
          ></motion.div>
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.3, ease: 'easeInOut', delay: 0.3 }} // Add a delay to the exit animation
            className='fixed bottom-0 right-0 w-[70%] md:[50%] lg:w-[50%] h-screen bg-gray-100 shadow-xl p-4 md:p-8 rounded-lg border-l-2'
          >
            <div className='p-2 md:p-6  bg-[#DCDEFC] text-black rounded-lg flex items-center justify-start text-sm md:text-lg'>
              <img src={chatbotIcon} alt='Chatbot Icon' className='w-8 h-8 mr-2 rounded-full' /> Chat with <span className='font-bold text-lg md:text-xl px-2'>CHATBOT</span>
            </div>
            <div className='flex-1 overflow-y-auto px-6 py-4 '>
            {chatArray.map((message, index) => {
       if(message.type === 'result'){ return<>
               {/* Left-aligned message */}
               <div key={index} className='my-4 flex justify-start items-center'>
          
        
          <AiOutlineRobot className='text-gray-400 mr-2 text-xl' />
          <div className='bg-blue-500 text-white py-2 w-[50%] px-3 rounded-lg inline-block'>
        {message.content}
      </div>
    

    </div>

       </>}
      else {return<>
        {/* Right-aligned message */}
        <div key={index} className='my-4 flex justify-end items-center'>
      
          <AiOutlineUser className='text-gray-400 ml-2 text-xl' />

          <div className='bg-blue-500 text-white py-2 w-[50%] px-3 rounded-lg inline-block'>
              {message.content}
          </div>
       

        </div>
      </>}    
      
      })}
            </div>
            <form className='absolute bottom-0 left-0 right-0 p-4 flex'>
              <input
                type='text'
                placeholder='Chat with AI'
                className='w-full p-2 border border-gray-300 rounded-l-lg focus:outline-none'
                value={input}
          onChange={(e)=>{setInput(e.target.value);}}
              />
              <button onClick={(e)=>{e.preventDefault();setPrompt(input);submitChat(input)}} className='px-4 py-3 bg-blue-500 text-white rounded-r-lg'>
                <AiOutlineSend className='text-xl' />
              </button>
            </form>
          </motion.div>
        </>
      )}
      {!isOpen && (
        <button onClick={toggleChat} className="fixed bottom-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-lg">Open Chat</button>
      )}
    </>
  );
}

export default MobileChat;
