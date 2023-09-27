import React, { useEffect, useState } from "react";
import "./QuestionComp.css";
import axios from "axios";
import Navbar from "../../Layouts/Navbar/Navbar";
import SingleQuestion from "./singleQuestion/SingleQuestion";

const QuestionComp = (props) => {
  const moduleId = localStorage.getItem("moduleId");
  const chapterId = parseInt(localStorage.getItem("chapterId"));
  const subChapterId = localStorage.getItem("subChapterId");

  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [showResult, setShowResult] = useState(false); // To control when to show the result button
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0); // To count correct answers


  const fetchQuestions = async () => {
    try {
      await axios
        .get(`http://localhost:5000/module/questions/${moduleId}/${chapterId}/${subChapterId}`, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        })
        .then((response) => {
          if (response.status === 200) {
            setQuestions(response?.data?.questions);
          } else {
            console.log("Status Code", response.status);
          }
        });
    } catch (error) {
      console.log("error", error);
    } finally {
      // Set loading to false when data fetching is complete
      setLoading(false);
    }
  };

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  const handleShowResult = () => {
    setShowResult(true);
  };

  const handleEndTest = () => {
    console.log("Test Ended");
  };



  const handleNextQuestion = () => {
    if (selectedOption) {
      // If an option is selected, check if it's the correct answer
      const currentQuestion = questions[currentQuestionIndex];
      if (currentQuestion.correctAnswer === selectedOption) {
        // Handle when the answer is correct
        // You can perform any other actions here
        setCorrectAnswersCount(correctAnswersCount + 1);// Increment correct answers count
        console.log("Correct!");
      } else {
        // Handle when the answer is incorrect
        // You can perform any other actions here
        console.log("Incorrect.");
      }

      if (currentQuestionIndex < questions.length - 1) {
        // If there are more questions, increment the index to move to the next question
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedOption(""); // Clear the selected option for the next question
        setShowResult(false); // Hide the result button for the next question
      } else {
        // All questions have been answered, you can handle completion here
        console.log("Test Completed");
        console.log(`You got ${correctAnswersCount} questions correct out of ${questions.length}`);
      }
    } else {
      // Display an error or message to select an option
      console.log("Please select an option before proceeding.");
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  return (
    <div>
      <Navbar />
      <h2>Questions</h2>
      <br />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <SingleQuestion
            question={questions[currentQuestionIndex]}
            selectedOption={selectedOption}
            handleOptionChange={handleOptionChange}
            showResult={showResult}
          />
          {!showResult ? (
            <button onClick={handleShowResult}>Show Result</button>
          ) : (
            <div onClick={handleNextQuestion}>
            {currentQuestionIndex < questions.length - 1 ? (
  <button onClick={handleNextQuestion}>Next</button>
) : (
  <div>
    <p>Test Completed</p>
    <p>
      You got {correctAnswersCount} questions correct out of {questions.length}
    </p>
    {/* Add additional HTML elements here */}
    <button onClick={handleEndTest}>End Test</button>
  </div>
)}

            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default QuestionComp;
