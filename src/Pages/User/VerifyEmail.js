import axios from 'axios';
import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

const VerifyEmail = () => {
    const navigate = useNavigate();
    const { id, token } = useParams();
    console.log('Id',id,"Token",token);
    
    const verifyEmail = async()=>{
        try {
            await axios.get(`https://edu-sync-backend.vercel.app/users/${id}/verify/${token}`).then(response => {
              console.log("Response",response);
              
              if(response.status===200){
               return true;
        
              }else{console.log("Status Code",response.status);
              }
             
            })
          } catch (error) {
            console.log("error", error)
          }
    }

    useEffect(()=>{
      if(id!=="" && token !==""){
       const b = verifyEmail();
       b && navigate("/login");
      }
    },[]);

  return (
    <div>
     
      <button className='login-submit-btn' onClick={()=>{verifyEmail()}}>Verify Your  Email </button>
    </div>
  )
}

export default VerifyEmail
