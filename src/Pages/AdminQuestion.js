import React, { useEffect } from 'react'
import AdminQuestionComp from '../Components/AdminQuestionComp/AdminQuestionComp'
import { useNavigate } from 'react-router-dom';

const AdminQuestion = () => {
  const navigate = useNavigate();
  useEffect(() => {
    // Perform the GET request to check if the user is an admin
    fetch('https://edusync-backend.onrender.com/admin/checkAdmin', {
      method: 'GET',
      headers: {
        'Authorization': localStorage.getItem('token'),
      },
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw new Error('Not an admin');
        }
      })
      .then((data) => {
        console.log(data);
        localStorage.setItem("Admin",true);
      })
      .catch((error) => {
      console.log(error);
      localStorage.setItem("Admin",false);
       navigate("/home");
      });
  }, []); 
  return (
    <div>
      <AdminQuestionComp/>
    </div>
  )
}

export default AdminQuestion
