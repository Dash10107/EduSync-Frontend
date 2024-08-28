import React, { useEffect } from 'react'
import SubAdminTestComp from '../../Components/SubAdmin/SubAdminTest/SubAdminTestComp'
import { useNavigate } from 'react-router-dom';

const SubAdminTest = () => {
  const navigate = useNavigate();

  useEffect(()=>{  
      // Perform the GET request to check if the user is an admin
      fetch('https://edu-sync-backend.vercel.app/subadmin/checkSubAdmin', {
        method: 'GET',
        headers: {
          'Authorization': localStorage.getItem('token'),
        },
      })
        .then((response) => {
          if (response.status === 200) {
            return response.json();
          } else {
            throw new Error('Not an Sub admin');
          }
        })
        .then((data) => {
          console.log(data);
          localStorage.setItem("SubAdmin",true);
        })
        .catch((error) => {
        console.log(error);
        localStorage.setItem("SubAdmin",false);
         navigate("/home");
        });
    },[]);
  return (
    <div>
   <SubAdminTestComp/>
    </div>
  )
}

export default SubAdminTest
