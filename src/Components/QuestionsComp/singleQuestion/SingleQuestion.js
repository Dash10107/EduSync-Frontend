import React, { useEffect, useState } from "react";
import "./SingleQuestion.css";
import { getRandomNegativeMessage, getRandomPositiveMessage } from "../../../Utils";

const SingleQuestion = (props) => {
  const {
    question,
    selectedOption,
    handleOptionChange,
    showResult,
    currentQuestionIndex,
  } = props;
  const isAnswerCorrect = question.correctAnswer === selectedOption;
  const [selectedClass, setSelectedClass] = useState("");


  useEffect(() => {
    if (showResult) {
      setSelectedClass(isAnswerCorrect ? "correct-answer" : "incorrect-answer");
    } else {
      setSelectedClass(selectedOption ? "selected" : "");
    }
  }, [showResult, isAnswerCorrect, selectedOption]);

  return (
    <div key={question.id} className="single-question">
      <p className="question-text">{question.question}</p>
      <div className="options">
        {currentQuestionIndex % 3 === 0 && (
          // Render options as radio buttons for the first question
          question.options.map((option, index) => (
            <div
              className={`single-option`}
              key={index}
            >
              <input
                type="radio"
                name="options"
                id={`option-${index}`}
                value={option}
                checked={selectedOption === option}
                onChange={() => handleOptionChange(option)}
                disabled={showResult} // Disable options when showing results
              />
              <label className="option-text" htmlFor={`option-${index}`}>
                {option}
              </label>
            </div>
          ))
        )}
        {currentQuestionIndex % 3 === 1 && (
          // Render options as a 2x2 grid for the second question
          <div className="grid-options">
            {question.options.map((option, index) => (
              <div
                className={`grid-option ${selectedOption === option ? selectedClass : ""}`}
                key={index}
              >
                <button
                  className={`option-button`}
                  onClick={() => handleOptionChange(option)}
                  disabled={showResult} // Disable options when showing results
                >
                  {option}
                </button>
              </div>
            ))}
          </div>
        )}
        {currentQuestionIndex % 3 === 2 && (
          // Render options as vertical buttons for the third question and beyond
          <div className="vertical-options">
            {question.options.map((option, index) => (
              <div
                className={`vertical-option ${selectedOption === option ? selectedClass : ""}`}
                key={index}
              >
                <button
                  className={`option-button`}
                  onClick={() => handleOptionChange(option)}
                  disabled={showResult} // Disable options when showing results
                >
                  {option}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      {showResult && !isAnswerCorrect && (
        <div className={`result-message ${isAnswerCorrect ? 'correct' : ''}`}>
        <p>{getRandomNegativeMessage()}</p>
          <p>{`Correct Answer: ${question.correctAnswer}`}</p>
      
        </div>
      )}
      {showResult && isAnswerCorrect && (
        <div className={`result-message ${isAnswerCorrect ? 'correct' : ''}`}>
          <p>{getRandomPositiveMessage()}</p>
        </div>
      )}
    </div>
  );
};

export default SingleQuestion;
