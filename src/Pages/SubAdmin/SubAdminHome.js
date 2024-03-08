import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import SubAdminComp from '../../Components/SubAdmin/SubAdminHome/SubAdminComp';

const SubAdminHome = () => {
    const navigate = useNavigate();

    useEffect(()=>{  
        // Perform the GET request to check if the user is an admin
        fetch('https://edusync-backend.onrender.com/subadmin/checkSubAdmin', {
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
<SubAdminComp/> 
    </div>
  )
}

export default SubAdminHome
