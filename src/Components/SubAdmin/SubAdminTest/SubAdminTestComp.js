import React, { useEffect, useState } from "react";
import "./SubAdminTest.css";
import QuestionDisplay from "./QuestionDisplay/QuestionDisplay";
import AddQuestion from "./AddQuestionModal/AddQuestionModal";
import Navbar from "../../../Layouts/Navbar/Navbar";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Alert, Input, Snackbar } from "@mui/material";

const SubAdminTestComp = (props) => {
    const navigate=useNavigate();
    const [addQuestionOpen,setAddQuestionOpen] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [title,setTitle] = useState("");
  const [errors, setErrors] = useState({});
  const [toastOpen, setToastOpen] = useState(false);
  const code = localStorage.getItem("classroomCode");
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      setToastOpen(false);
      return;
    }
  }

  const handleAddQuestion = (newQuestion) => {
    setQuestions([...questions, newQuestion]);
  };


  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        `http://localhost:5000/subadmin/classrooms/${code}/addforms`,
        {
          title:title,
          questions: questions,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
  
      if (response.status === 200) {
        console.log("Questions added successfully");
        // Clear the questions array after submission if needed
        setErrors({error:'Added questions successfully.'});
        setToastOpen(true);
        setQuestions([]);
        setTitle("");
        navigate(-1);
      } else {
        console.log("Status Code", response.status);
      }
    } catch (error) {
      console.error("Error adding questions:", error);
      setErrors({error:'Error adding  questions.'});
      setToastOpen(true);
    }
  };
  

  return (
    <>
    <div className="adminQuestionComp">
    <Navbar  isSubAdmin={true} />
    <div className="subchapter-heading">
          <h3 className="subject-heading-text"> 

          
          <div className="goBack">
    <p className="back-icon" onClick={()=>{navigate("/subadmin/classroom")}}><ArrowBackIosIcon fontSize="large"/> </p>
     <p>Test Title :</p>
     <Input className='modal-inputNew'  type="text"
     disableUnderline={true}
      value={title}
      placeholder='Title'
     onChange={(e)=>{setTitle(e.target.value)}}
         ></Input>
     </div></h3>

     <div>
  
     </div>
     <div >
      <h5 className="subject-heading-text" onClick={()=>{setAddQuestionOpen(true)}}>  Add Question +</h5> 
     </div>
        </div>
        
      <QuestionDisplay questions={questions}
       />
<div className="subMitDiv">
<button className="submit-button" onClick={handleSubmit}>Create The Test </button>
</div>
    </div>
    <AddQuestion
    modalOpen = {addQuestionOpen}
    setModalOpen={setAddQuestionOpen}
     onAddQuestion={handleAddQuestion} />

<Snackbar open={toastOpen} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
          <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
            <ul>
              {Object.entries(errors).map(([key, value]) => (
                <li key={key}>
                  {value}
                </li>
              ))}
            </ul>
          </Alert>
        </Snackbar>
    </>
  );
};

export default SubAdminTestComp;
