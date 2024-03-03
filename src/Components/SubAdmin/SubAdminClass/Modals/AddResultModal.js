import { Modal, Pagination, Spin } from 'antd'
import React, { useEffect, useState } from 'react'
import { Box, Input, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import axios from 'axios';
function AddResultModal(props) {
    const {modalOpen,setModalOpen,clasroom,fetchClassroom} = props;
    const [studentNames,setStudentNames] = useState([]);
    const [title,setTitle] = useState("");
    const code = localStorage.getItem("classroomCode");
  
  const studentIds = clasroom?.students

const [result,setResult] = useState([]);

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

const handleSubmit = async () => {
  console.log(result);
  try {
    const response = await axios.put(
      `http://localhost:5000/subadmin/classrooms/${code}/update-test-results`,
      {
        testName:title,
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
      setTitle("");
      setModalOpen(false);
      fetchClassroom();
    } else {
      console.log("Status Code", response.status);
    }
  } catch (error) {
    console.error("Error adding questions:", error);
  }
};



    const fetchStudentDetail = async (userIds) => {
       
      try {
  
        await axios.post(`http://localhost:5000/users/user-details    `,{
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
  <div className='titleforEntity'> 
     Put Up Test Results     </div>
  </div>
  <div>
  Test Title :   &nbsp;&nbsp;&nbsp;&nbsp;
  <Input className='modal-inputNew'
  style={{margin:0}}
    type="text"
     disableUnderline={true}
      value={title}
      placeholder='Title'
     onChange={(e)=>{setTitle(e.target.value)}}
         ></Input>
         </div>
  <Box sx={{ width: '100%' }}>
  <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>StudentID</TableCell>
            <TableCell >Student Name</TableCell>
            <TableCell >Marks</TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
          {/* {test?.testScores?.map((row,index) => (
            <TableRow
              key={row._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell >{row.studentId}</TableCell>
              <TableCell >{studentNames[index]}</TableCell>
              <TableCell >{row.marks}</TableCell>
            
            </TableRow>
          ))} */}
          {
            studentNames.map((name,index)=>{
              return(
                <TableRow
              key={studentIds[index]}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell >{name.id}</TableCell>
              <TableCell >{name.name}</TableCell>
              <TableCell >
              <Input type='text'    
              value={result.find(obj => obj.studentId === name.id)?.marks || ''}
              onChange={(e) => { handleChange(name.id, e.target.value) }}/> 
            
            </TableCell>
            </TableRow>
              )

            })
          }
        </TableBody>
      </Table>
    </TableContainer>
        </Box>
        <div className="subMitDiv">
<button className="submit-button" onClick={handleSubmit}>Upload The Result </button>
</div>
</div>
  </Modal>
  )
}

export default AddResultModal
