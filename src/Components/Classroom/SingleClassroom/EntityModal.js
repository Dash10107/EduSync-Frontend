import { Modal, Pagination, Spin } from 'antd'
import React, { useEffect, useState } from 'react'

import "./EntityModal.css"
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import axios from 'axios';
function EntityModal(props) {
    const {modalOpen,setModalOpen,test} = props;
    const [studentNames,setStudentNames] = useState([]);

  const studentIds = test?.testScores?.map(score => score.studentId);





    const fetchStudentDetail = async (userIds) => {
       
      try {
  
        await axios.post(`https://edusync-backend.onrender.com/users/user-details    `,{
          ids:userIds
        }, {
          headers: {
            Authorization: localStorage.getItem("token"),
          }
        }).then(response => {
          console.log("Response", response);
  
          if (response.status === 200) {
            setStudentNames(response.data.users)
              
          } else {
            console.log("Status Code", response.status);
          }
        });
      } catch (error) {
        console.log("error", error);
      }
    }
    useEffect(()=>{fetchStudentDetail(studentIds)},[studentIds])
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
          <TableRow>
          <TableCell>MarksId</TableCell>
            <TableCell>StudentID</TableCell>
            <TableCell >Student Name</TableCell>
            <TableCell >Marks</TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
          {test?.testScores?.map((row,index) => (
            <TableRow
              key={row._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row._id}
              </TableCell>
              <TableCell >{row.studentId}</TableCell>
              <TableCell >{studentNames[index].name}</TableCell>
              <TableCell >{row.marks}</TableCell>
            
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
