import { Modal, Pagination, Spin } from 'antd'
import React, { useEffect, useState } from 'react'

import "./EntityModal.css"
import { Box, Input, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import axios from 'axios';
function EntityModal(props) {
    const {modalOpen,setModalOpen,test,fetchClassroom} = props;
    const [studentNames,setStudentNames] = useState([]);

  const studentIds = test?.testScores?.map(score => score.studentId);

  const [result,setResult] = useState([]);
  const code = localStorage.getItem("classroomCode");

const handleChange = async (id, marks) => {
  const intMarks = parseInt(marks);
  // Check if an object with the same id already exists in the array
  const existingIndex = result.findIndex(obj => obj.studentId === id);

  if (existingIndex !== -1) {
    // If exists, update the marks property
    setResult(prevResult => {
      const updatedResult = [...prevResult];
      updatedResult[existingIndex] = { studentId:id, marks: intMarks };
      return updatedResult;
    });
  } else {
    // If not, add a new object to the array
    setResult(prevResult => [...prevResult, { studentId:id, marks: intMarks }]);
  }

  // You can now use the updated result state as needed
  // ...
};

    const fetchStudentDetail = async (userIds) => {
       
      try {
  
        await axios.post(`https://edu-sync-backend.vercel.app/users/user-details    `,{
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

    const handleSubmit = async () => {
      console.log(result);
      if(result.length ===0){
        return;
      }
      try {
        const response = await axios.put(
          `https://edu-sync-backend.vercel.app/subadmin/classrooms/${code}/update-existing-test/${test._id}`,
          {
            results: result,
          },
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        );
    
        if (response.status === 200) {
          console.log("Result added successfully");
          setResult([]);
          setModalOpen(false);
          fetchClassroom();
        } else {
          console.log("Status Code", response.status);
        }
      } catch (error) {
        console.error("Error adding questions:", error);
      }
    };
    useEffect(()=>{fetchStudentDetail(studentIds)},[])
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
              <TableCell >{studentNames[index]?.name}</TableCell>
              <TableCell >
              <Input type='number'    
               value={result.find(obj => obj.studentId === row.studentId)?.marks || row.marks}
              onChange={(e) => { const previousResult = test?.testScores?.map(({ _id, ...rest }) => ({ studentId: rest.studentId, marks: rest.marks }));
  setResult(previousResult);
  ;handleChange(row.studentId, e.target.value) }}/> 
            
            </TableCell>
            
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
        </Box>
        {result.length !== 0 &&
          <div className="subMitDiv">
<button className="submit-button" onClick={handleSubmit}>Upload The Result </button>
</div>}

</div>
  </Modal>
  )
}

export default EntityModal
