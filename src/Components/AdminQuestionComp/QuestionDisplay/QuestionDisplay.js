import React from "react";
import "./QuestionDisplay.css";

const QuestionDisplay = ({ questions }) => (
  <div>
    {questions.map((q) => (
      <div key={q.id} className="question-container">
        <h4>{q.question}</h4>
        <ul>
          {q.options.map((option, index) => (
            <li key={index}>{option}</li>
          ))}
        </ul>
        <p>Correct Answer: {q.correctAnswer}</p>
      </div>
    ))}
  </div>
);

export default QuestionDisplay;
