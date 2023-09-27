import React from "react";
import "./SingleQuestion.css";

const SingleQuestion = (props) => {
  const { question, selectedOption, handleOptionChange, showResult } = props;
  const isAnswerCorrect = question.correctAnswer === selectedOption;

  return (
    <li key={question.id}>
      <p>{question.question}</p>
      {showResult ? (
        <p>{isAnswerCorrect ? "Correct!" : "Incorrect."}</p>
      ) : (
        <div>
          {question.options.map((option, index) => (
            <div key={index}>
              <input
                type="radio"
                name="options"
                id={`option-${index}`}
                value={option}
                checked={selectedOption === option}
                onChange={() => handleOptionChange(option)}
                disabled={showResult} // Disable options when showing results
              />
              <label htmlFor={`option-${index}`}>{option}</label>
            </div>
          ))}
        </div>
      )}
    </li>
  );
};

export default SingleQuestion;
