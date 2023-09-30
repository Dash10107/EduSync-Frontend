import React from "react";
import "./SingleQuestion.css";

const SingleQuestion = (props) => {
  const { question, selectedOption, handleOptionChange, showResult, currentQuestionIndex } = props;
  const isAnswerCorrect = question.correctAnswer === selectedOption;

  return (
    <div key={question.id} className="single-question">
      <p className="question-text">{question.question}</p>
      <div className="options">
        {currentQuestionIndex % 3 === 0 && (
          // Render options as radio buttons for the first question
          question.options.map((option, index) => (
            <div className="single-option" key={index}>
              <input
                type="radio"
                name="options"
                id={`option-${index}`}
                value={option}
                checked={selectedOption === option}
                onChange={() => handleOptionChange(option)}
                disabled={showResult} // Disable options when showing results
              />
              <label className={`option-text ${showResult && question.correctAnswer === option ? "correct" : question.correctAnswer !== option && selectedOption === option ? "incorrect" : ""}`} htmlFor={`option-${index}`}>
                {option}
              </label>
            </div>
          ))
        )}
        {currentQuestionIndex % 3 === 1 && (
          // Render options as a 2x2 grid for the second question
          <div className="grid-options">
            {question.options.map((option, index) => (
              <div className="grid-option" key={index}>
                <button
                  className={`option-button ${
                    selectedOption === option ? "selected" : ""
                  }`}
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
              <div className="vertical-option" key={index}>
                <button
                  className={`option-button ${
                    selectedOption === option ? "selected" : ""
                  }`}
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
      {showResult && (
        <p className={`correct-incorrect ${isAnswerCorrect ? "correct" : "incorrect"}`}>
          {isAnswerCorrect ? " Correct!" : "Incorrect."}
        </p>
      )}
    </div>
  );
};

export default SingleQuestion;
