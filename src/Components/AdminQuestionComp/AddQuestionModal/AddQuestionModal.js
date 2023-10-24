import React, { useState } from "react";
import "./AddQuestionModal.css";
import { Modal } from "antd";
import { Select,MenuItem } from "@mui/material";

const AddQuestion = ({ modalOpen,setModalOpen,onAddQuestion }) => {
  const [newQuestion, setNewQuestion] = useState("");
  const [newOptions, setNewOptions] = useState([]);
  const [newCorrectAnswer, setNewCorrectAnswer] = useState("");

  const addQuestion = () => {
    if (newQuestion && newOptions.length > 1 && newCorrectAnswer !== "") {
      const newQuestionObj = {
        id: new Date().getTime(), // Use timestamp as a unique ID
        question: newQuestion,
        options: newOptions,
        correctAnswer: newCorrectAnswer,
      };

      onAddQuestion(newQuestionObj); // Pass the new question to the parent component
      setNewQuestion("");
      setNewOptions([]);
      setNewCorrectAnswer("");
    } else {
      alert("Please fill in all fields before adding a question.");
    }
  };

  return (
    <Modal
    title={<p className='newModuleTitle'>Add New Question</p>}
        
        centered
        width={"auto"}
        open={modalOpen}
        onOk={() => setModalOpen(false)}
       footer={null}
        onCancel={() => setModalOpen(false)}
    >
    <div className="add-question-section">
      <div className="question-input-div">
        <label className="question-text">Question:</label>
        <input
          type="text"
          value={newQuestion}
          onChange={(e) => setNewQuestion(e.target.value)}
        />
      </div>
      <div className="option-input-div">
        <label>Options:</label>
        {newOptions.map((option, index) => (
          <div key={index}>
            <input
              type="text"
              value={option}
              onChange={(e) => {
                const updatedOptions = [...newOptions];
                updatedOptions[index] = e.target.value;
                setNewOptions(updatedOptions);
              }}
            />
          </div>
        ))}
        <button
          className="add-option-button"
          onClick={() => setNewOptions([...newOptions, ""])}
        >
          Add Option
        </button>
      </div>
      <div>
        <label>Correct Answer:</label>
        <Select
          value={newCorrectAnswer}
          className="select-correct-answer" // Add a class for styling
          onChange={(e) => setNewCorrectAnswer(e.target.value)}
        >
          <MenuItem value="">Select Correct Answer</MenuItem>
          {newOptions.map((option, index) => (
            <MenuItem  className="single-option" key={index} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </div>
      <button className="add-question-button" onClick={addQuestion}>
        Add Question
      </button>
    </div>
    </Modal>
  );
};

export default AddQuestion;
