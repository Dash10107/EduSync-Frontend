import React, { useEffect } from 'react'
import AdminChapterComp from '../../Components/Admin/AdminChapterComp/AdminChapterComp'
import { useNavigate } from 'react-router-dom';

const AdminChapter = () => {
  const navigate = useNavigate();
  useEffect(() => {
    // Perform the GET request to check if the user is an admin
    fetch('https://edu-sync-backend.vercel.app/admin/checkAdmin', {
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
      <AdminChapterComp/>
    </div>
  )
}

export default AdminChapter
