import React from 'react'
import EmailImg from '../../Assets/email.jpeg';
import { useNavigate } from 'react-router-dom';
const BeforeVerify = () => {
  const message = "A confirmation email has been dispatched to the provided email address";
  const buttonText = "Continue to login";
  const navigate = useNavigate();
  const handleContinue = () => {
    navigate("/login");
  };

        return (
            <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-md w-[50%] h-[60vh] sm:h-[65vh] overflow-y-auto'>
    
                <div className='flex flex-col items-center justify-center h-full p-6 space-y-2 md:space-y-5'>
                    {/* email img  */}
                    <img src={EmailImg} alt="" className='h-[30%] w-[75%] md:h-[25%] md:w-[35%] xl:h-[35%] xl:w-[40%] ' />
                    {/* Text to be displayed */}
                    <h2 className='text-sm md:text-md lg:text-lg xl:text-xl 2xl:text-3xl font-medium text-center mb-4 '>{message}</h2>
                    {/* continue to login button */}
                    <button onClick={handleContinue} className='text-xs md:text-md lg:text-base xl:text-lg 2xl:text-2xl custom-button bg-blue-500 text-white md:px-6 py-3 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue active:bg-blue-800 w-full sm:w-[70%] whitespace-nowrap text-center'>
                        {buttonText}
                    </button>
    
                </div>
            </div>
        );
    
}

export default BeforeVerify
