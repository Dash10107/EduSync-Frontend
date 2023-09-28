import React, { useEffect, useState } from "react";
import "./QuestionComp.css";
import axios from "axios";
import Navbar from "../../Layouts/Navbar/Navbar";
import SingleQuestion from "./singleQuestion/SingleQuestion";
import { useNavigate } from "react-router-dom";
const QuestionComp = (props) => {
  const moduleId = localStorage.getItem("moduleId");
  const chapterId = parseInt(localStorage.getItem("chapterId"));
  const subChapterId = localStorage.getItem("subChapterId");
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [showResult, setShowResult] = useState(false); // To control when to show the result button
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0); // To count correct answers


  

  const handleEndTest = async (e) => {
    e.preventDefault();

    const formData = {
      moduleId: moduleId,
      chapterId: chapterId,
      subchapterId: subChapterId,
      correctAnswers:correctAnswersCount ,
      totalQuestions:questions.length,
    }

    try {
      const response = await axios.post("http://localhost:5000/progress/", formData, {
        headers: {
          Authorization: localStorage.getItem("token"), // Include your authorization token here
        },
      });

      if (response.status === 200) {
        console.log("Progress saved successfully");
        console.log('Response',response);
        setCorrectAnswersCount(0);
        navigate(-1); 
      } else {
        console.error("Failed to save progress");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };


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
    if(!selectedOption) {
      // Display an error or message to select an option
      console.log("Please select an option before proceeding.");
      return;
    }else{
    setShowResult(true);
    }
  };

  



  const handleNextQuestion = () => {

    if(!selectedOption) {
      // Display an error or message to select an option
      console.log("Please select an option before proceeding.");
      return;
    }
    else {
   

      if (currentQuestionIndex < questions.length - 1) {
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
        // If there are more questions, increment the index to move to the next question
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedOption(""); // Clear the selected option for the next question
        setShowResult(false); // Hide the result button for the next question
      } else {
        // All questions have been answered, you can handle completion here
        console.log("Test Completed");
        console.log(`You got ${correctAnswersCount} questions correct out of ${questions.length}`);
      }
      
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
