import React, { useEffect, useState } from "react";
import "./AdminQuestionComp.css";
import QuestionDisplay from "./QuestionDisplay/QuestionDisplay";
import AddQuestion from "./AddQuestionModal/AddQuestionModal";
import Navbar from "../../../Layouts/Navbar/Navbar";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Alert, Snackbar } from "@mui/material";

const AdminQuestionComp = (props) => {
    const navigate=useNavigate();

    const moduleId = localStorage.getItem("adminModuleId");
    const chapterId = parseInt(localStorage.getItem("adminChapterId"));
    const subChapterId = localStorage.getItem("adminSubChapterId");
    const subChapterName = localStorage.getItem("adminSubChapter");
    // const chapterName = localStorage.getItem("adminChapterName");
    // const subjectName = localStorage.getItem("adminSubjectName");
    const [addQuestionOpen,setAddQuestionOpen] = useState(false);
  const [questions, setQuestions] = useState([]);

  const [errors, setErrors] = useState({});
  const [toastOpen, setToastOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      setToastOpen(false);
      return;
    }
  }

  const handleAddQuestion = (newQuestion) => {
    setQuestions([...questions, newQuestion]);
  };

  const fetchQuestions = async () => {
    try {
      const response = await axios.get(
        `https://edusync-backend.onrender.com/module/allQuestions/${moduleId}/${chapterId}/${subChapterId}`,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      if (response.status === 200) {
        console.log('Response',response);
        
        setQuestions(response.data.questions);
    
      } else {
        console.log("Status Code", response.status);
      }
    } catch (error) {
      console.log("error", error);
      setErrors({error:'Failed to fetch questions.'});
      setToastOpen(true);
    }
    
  };

  useEffect(()=>{
    fetchQuestions()
  },[])

  const handleSubmit = async () => {
    console.log(questions)
    try {
      const response = await axios.post(
        `https://edusync-backend.onrender.com/admin/addQuestions/${moduleId}/${chapterId}/${subChapterId}`,
        {
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
        fetchQuestions();

      } else {
        console.log("Status Code", response.status);
      }
    } catch (error) {
      console.error("Error adding questions:", error);
      setErrors({error:'Failed to fetch questions.'});
      setToastOpen(true);
    }
  };
  

  return (
    <>
    <div className="adminQuestionComp">
    <Navbar  isAdmin={true} />
    <div className="subchapter-heading">
          <h3 className="subject-heading-text"> 
          
          <div className="goBack">
    <p className="back-icon" onClick={()=>{navigate("/admin/subchapter")}}><ArrowBackIosIcon fontSize="large"/> </p>
     <p>{subChapterName}</p>
     </div></h3>
     <div>
     <button className="submit-button" onClick={handleSubmit}>Submit All Questions</button>
     </div>
     <div >
      <h3 className="subject-heading-text" onClick={()=>{setAddQuestionOpen(true)}}> +</h3> 
     </div>
        </div>
        
      <QuestionDisplay questions={questions}
      setErrors={setErrors}
      setToastOpen={setToastOpen}
      fetchQuestions={fetchQuestions}
       />


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

export default AdminQuestionComp;
