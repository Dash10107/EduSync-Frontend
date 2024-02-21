import React, { useState } from "react";

import "./QuestionDisplay.css";
import { MenuItem, Select } from "@mui/material";
import axios from "axios";

const QuestionDisplay = ({ questions,setErrors,setToastOpen,fetchQuestions }) => {
  const moduleId = localStorage.getItem("adminModuleId");
  const chapterId = parseInt(localStorage.getItem("adminChapterId"));
  const subChapterId = localStorage.getItem("adminSubChapterId");
 
  const [newQuestions,setNewQuestions]=useState([]);
 // State to track edited options
 const [editedOptions, setEditedOptions] = useState({});
  
 const handleEdit = (questionId, field, newValue) => {
  const editedQuestions = questions.map((q) => ({ ...q })); // Create a shallow copy

  if (field === "question") {
    editedQuestions.forEach((q) => {
      if (q.id === questionId) {
        q.question = newValue;
      }
    });
  } else if (field === "correctAnswer") {
    editedQuestions.forEach((q) => {
      if (q.id === questionId) {
        q.correctAnswer = newValue;
      }
    });
  } else if (field.includes("option")) {
    const inputString = field;
    const match = inputString.match(/\[(\d+)\]/);
    let ind;
    if (match && match[1]) {
      ind = parseInt(match[1], 10);
    } else {
      console.log("No match found.");
    }
    editedQuestions.forEach((q) => {
      if (q.id === questionId) {
        q.options[ind] = newValue;
      }
    });
  } else {
    console.log("field not found");
  }

  setNewQuestions(editedQuestions, () => {
    // Use the callback form to ensure you're working with the latest state
    setEditedOptions((prev) => ({
      ...prev,
      [questionId]: editedQuestions.find((q) => q.id === questionId)?.options || [],
    }));
  });
};


  const handlePut = async() => {
    console.log('Edited Questions', newQuestions);
    let sendingQuestions=newQuestions;
    if(newQuestions.length===0){
      sendingQuestions = questions;
    }

    try {
      const response = await axios.put(
        `https://edusync-backend.onrender.com/admin/updateQuestions/${moduleId}/${chapterId}/${subChapterId}`,
        {
          updatedQuestions: sendingQuestions,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
  
      if (response.status === 200) {
        console.log("Questions Updated successfully");
        // Clear the questions array after submission if needed
        setErrors({error:'Updated questions successfully.'});
        setToastOpen(true);
        fetchQuestions();

      } else {
        console.log("Status Code", response.status);
      }
    } catch (error) {
      console.error("Error updating questions:", error);
      setErrors({error:'Failed to update questions.'});
      setToastOpen(true);
    }
    
  };

  return (
    <>
      <div className="allQuestions">
      {newQuestions.length!==0?
          newQuestions.map((q) => (
          <div key={q.id} className="question-container">
            {/* Editable Question */}
            <h4
              contentEditable={true}
              suppressContentEditableWarning={true}
              onBlur={(e) => handleEdit(q.id, "question", e.target.innerText)}
            >
              {q.question}
            </h4>

            {/* Editable Options */}
            <ul>
              {q.options.map((option, index) => {
               
                return (
                <li
                  key={index}
                  contentEditable={true}
                  suppressContentEditableWarning={true}
                  onBlur={(e) =>
                    handleEdit(
                      q.id,
                      `options[${index}]`,
                      e.target.innerText
                    )
                  }
                >
                  {option}
                </li>
              )})}
            </ul>

            {/* Editable Correct Answer */}
            <p>
              Correct Answer:
              <Select
                value={q.correctAnswer}
                className="select-correct-answer"
                onChange={(e) => handleEdit(q.id, "correctAnswer", e.target.value)}
              >
  {editedOptions[q.id] ?
                    editedOptions[q.id].map((option, index) => (
                      <MenuItem
                        className="single-option"
                        key={index}
                        value={option}
                      >
                        {option}
                      </MenuItem>
                    ))
                    :
                    q.options.map((option, index) => (
                      <MenuItem
                        className="single-option"
                        key={index}
                        value={option}
                      >
                        {option}
                      </MenuItem>
                    ))}
              </Select>
            </p>
          </div>
        ))
        :
          questions.map((q) => (
          <div key={q.id} className="question-container">
            {/* Editable Question */}
            <h4
              contentEditable={true}
              suppressContentEditableWarning={true}
              onBlur={(e) => handleEdit(q.id, "question", e.target.innerText)}
            >
              {q.question}
            </h4>

            {/* Editable Options */}
            <ul>
              {q.options.map((option, index) => {
               
                return (
                <li
                  key={index}
                  contentEditable={true}
                  suppressContentEditableWarning={true}
                  onBlur={(e) =>
                    handleEdit(
                      q.id,
                      `options[${index}]`,
                      e.target.innerText
                    )
                  }
                >
                  {option}
                </li>
              )})}
            </ul>

            {/* Editable Correct Answer */}
            <p>
              Correct Answer:
              <Select
                value={q.correctAnswer}
                className="select-correct-answer"
                onChange={(e) => handleEdit(q.id, "correctAnswer", e.target.value)}
              >
                <MenuItem value="">Select Correct Answer</MenuItem>
                {q.options.map((option, index) => (
                  <MenuItem className="single-option" key={index} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </p>
          </div>
        ))
        }
        <div className="editQuestionDiv">
          <button className="submit-button" onClick={handlePut}>
            {/* On button click, log the edited questions */}
            Edit the Questions
            <div></div>
          </button>
        </div>
      </div>
    </>
  );
};

export default QuestionDisplay;
