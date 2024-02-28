import React, { useState, useEffect } from 'react';
import { AiOutlineUser, AiOutlineRobot, AiOutlineSend } from 'react-icons/ai';
import chatbotIcon from '../../Assets/robot.jpg'; // Path to your round icon image
import "./HomeComp.css"
import { CSSTransition, TransitionGroup } from 'react-transition-group';
function Chat(props) {

  const {submitChat,setChatArray,chatLoading,chatArray} = props

  const [input,setInput] = useState("");
  useEffect(() => {
    // Scroll to the bottom of the chat when a new message is added
    const chatContainer = document.getElementById("chatContainer");
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }, [chatArray]);



  return (
    <div className='fixed top-[10vh] bottom-0 w-[30%] flex flex-col bg-gray-100 shadow-xl p-8 rounded-lg border-l-2'>
      <div className='p-4 bg-[#DCDEFC] text-black rounded-lg flex items-center justify-start'>
        <img src={chatbotIcon} alt='Chatbot Icon' className='w-8 h-8 mr-2 rounded-full' /> Chat with <span className='font-bold text-xl px-2'>CHATBOT</span>
      </div>
      <div id="chatContainer" className='flex-1 overflow-y-auto px-6 py-4'>
      {chatArray.map((message, index) => {
       if(message.type === 'result'){ 
         return<>
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
      <form className='flex items-center p-4'>
        <input
          type='text'
          placeholder='Chat with AI'
          className='flex-1 p-2 border border-gray-300 rounded-l-lg focus:outline-none'
          value={input}
          onChange={(e)=>{setInput(e.target.value);}}
        />
        <button  className='px-4 py-3 bg-blue-500 text-white rounded-r-lg' onClick={(e)=>{
          e.preventDefault(); console.log(input)
           submitChat(input)
        
                }}>
          <AiOutlineSend className='text-xl' />
        </button>
      </form>
    </div>
  );
}

export default Chat;


 //<div id="chatContainer" className='flex-1 overflow-y-auto px-6 py-4'>
    //   {chatArray.map((message, index) => {
    //     const messageClass = message.type === 'result' ? 'message-bot' : 'message-user';
    //    if(message.type === 'result'){ 
    //     return<>
    //            {/* Left-aligned message */}
    //            <div key={index} className='my-4 flex justify-start items-center'>
          
        
    //       <AiOutlineRobot className='text-gray-400 mr-2 text-xl' />
    //       <div className='bg-blue-500 text-white py-2 w-[50%] px-3 rounded-lg inline-block'>
    //     {message.content}
    //   </div>
    

    // </div>

    //    </>}
    //   else {return<>
    //     {/* Right-aligned message */}
    //     <div key={index} className='my-4 flex justify-end items-center'>
      
    //       <AiOutlineUser className='text-gray-400 ml-2 text-xl' />

    //       <div className='bg-blue-500 text-white py-2 w-[50%] px-3 rounded-lg inline-block'>
    //           {message.content}
    //       </div>
       

    //     </div>
    //   </>}    
      
    //   })}
    // </div>