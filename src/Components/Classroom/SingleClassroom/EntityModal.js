import { Modal, Pagination, Spin } from 'antd'
import React, { useEffect, useState } from 'react'

import "./EntityModal.css"
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import axios from 'axios';
function EntityModal(props) {
    const {modalOpen,setModalOpen,test} = props;
    const [studentNames,setStudentNames] = useState([]);
    const [waiting ,setWaiting] = useState(false);

  const studentIds = test?.testScores?.map(score => score.studentId);
  console.log(studentIds);

  




    const fetchStudentDetail = async (userIds) => {

       setWaiting(true);
      try {
  
        await axios.post(`https://edusync-backend.onrender.com/users/user-details`,{
          ids:userIds
        }, {
          headers: {
            Authorization: localStorage.getItem("token"),
          }
        }).then(response => {
          console.log("Response", response);
  
          if (response.status === 200) {
            setStudentNames(response.data.users)
            setWaiting(false);
              
          } else {
            console.log("Status Code", response.status);
          }
        });
      } catch (error) {
        console.log("error", error);
      }
    }
    useEffect(()=>{  fetchStudentDetail(studentIds)},[])
  return (

    <Modal    centered
    
    open={modalOpen}
  footer={null}
  title={null}
  width={"auto"}
  onCancel={()=>{setModalOpen(false)}}
  >
  <div className='fullmodal'>
  <div className='headerEntity'>  
  <div className='titleforEntity'>{test?.testName}</div>
  </div>
  <Box sx={{ width: '100%' }}>
  <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow className="bg-blue-400 text-white">
          <TableCell   className=' border-r'><span className='text-white text-lg bold'>MarksId </span></TableCell>
            <TableCell className=' border-r'><span className='text-white text-lg bold'>StudentID</span></TableCell>
            <TableCell className=' border-r'><span className='text-white text-lg bold'>Student Name</span></TableCell>
            <TableCell className=' border-r'><span className='text-white text-lg bold'>Marks</span></TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
          {test?.testScores?.map((row,index) => (
            <TableRow
              key={row._id}
              // sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell  className='text-white border-r' component="th" scope="row">
                {row._id}
              </TableCell>
              <TableCell className='text-white border-r'>{row.studentId}</TableCell>
              <TableCell className='text-white border-r'>{ !waiting  &&  studentNames[index]?.name}</TableCell>
              <TableCell className='text-white border-r'>{row.marks}</TableCell>
            
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
        </Box>
</div>
  </Modal>
  )
}

export default EntityModal
