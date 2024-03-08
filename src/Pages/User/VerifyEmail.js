import axios from 'axios';
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom';

const VerifyEmail = () => {
    const navigate = useNavigate();
    const { id, token } = useParams();
    console.log('Id',id,"Token",token);
    
    const verifyEmail = async()=>{
        try {
            await axios.get(`https://edusync-backend.onrender.com/users/${id}/verify/${token}`).then(response => {
              console.log("Response",response);
              
              if(response.status===200){
        
               if(response.data.success === true ){
                navigate("/login")
               }else{

               }
        
              }else{console.log("Status Code",response.status);
              }
             
            })
          } catch (error) {
            console.log("error", error)
          }
    }

    if(id!=="" && token !==""){
      verifyEmail()
    }
  return (
    <div>
     
      <button className='login-submit-btn' onClick={()=>{verifyEmail()}}>Verify Your  Email </button>
    </div>
  )
}

export default VerifyEmail
