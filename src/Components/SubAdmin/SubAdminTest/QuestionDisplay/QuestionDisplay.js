import React, { useState } from "react";

import "./QuestionDisplay.css";
import { MenuItem, Select } from "@mui/material";
import axios from "axios";

const QuestionDisplay = ({ questions }) => {

 
  const [newQuestions,setNewQuestions]=useState([]);
 // State to track edited options
 const [editedOptions, setEditedOptions] = useState({});
  
 const handleEdit = (questionId, field, newValue) => {
  const editedQuestions = questions.map((q) => ({ ...q })); // Create a shallow copy

  if (field === "questionText") {
    editedQuestions.forEach((q) => {
      if (q.id === questionId) {
        q.questionText = newValue;
      }
    });
  } else if (field === "answer") {
    editedQuestions.forEach((q) => {
      if (q.id === questionId) {
        q.answer = newValue;
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
              onBlur={(e) => handleEdit(q.id, "questionText", e.target.innerText)}
            >
              {q.questionText}
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
                value={q.answer}
                className="select-correct-answer"
                onChange={(e) => handleEdit(q.id, "answer", e.target.value)}
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
              onBlur={(e) => handleEdit(q.id, "questionText", e.target.innerText)}
            >
              {q.questionText}
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
                value={q.answer}
                className="select-correct-answer"
                onChange={(e) => handleEdit(q.id, "answer", e.target.value)}
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

      </div>
    </>
  );
};

export default QuestionDisplay;
