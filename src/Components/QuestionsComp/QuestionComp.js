import React, { useEffect, useState } from "react";
import "./QuestionComp.css";
import axios from "axios";
import Navbar from "../../Layouts/Navbar/Navbar";
import SingleQuestion from "./singleQuestion/SingleQuestion";
import { useNavigate } from "react-router-dom";
import { Progress } from "antd";
import { getCompletionMessage } from "../../Utils";
import RetryModal from "./retryModal/RetryModal";

import { Alert, Snackbar } from "@mui/material";
const QuestionComp = (props) => {
  const moduleId = localStorage.getItem("moduleId");
  const chapterId = parseInt(localStorage.getItem("chapterId"));
  const subChapterId = localStorage.getItem("subChapterId");
  const subChapterName = localStorage.getItem("SubChapter");
  const chapterName = localStorage.getItem("ChapterName");
  const subjectName = localStorage.getItem("SubjectName");
  const navigate = useNavigate();
const [toastOpen,setToastOpen] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [showResult, setShowResult] = useState(false); // To control when to show the result button
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0); // To count correct answers
const [testOver,setTestOver] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showRetryModal, setShowRetryModal] = useState(false);
  const [completionMessage, setCompletionMessage] = useState({
    className: "",
    message: "",
  });
  const handleHover = () => {
    setIsAnimating(true);
  };

  const handleMouseLeave = () => {
    setIsAnimating(false);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setToastOpen(false);
  };

  const resetQuiz = () => {
    setCorrectAnswersCount(0);
    setCurrentQuestionIndex(0);
    setSelectedOption("");
    setShowResult(false);
    setTestOver(false);
    // Reset any other relevant state variables here
  };
const   handleGoBack = ()=>{
  navigate("/subjects")
} 
  const handleRetry = () => {
    // Implement the logic to reset the quiz for retry
    resetQuiz();
    setShowRetryModal(false);
  };
  const handleEndTest = async (e) => {
    e.preventDefault();
    if(correctAnswersCount < 7){
      console.log("Please Try Again");
      setShowRetryModal(true);
   
    }else{
      
  
    const formData = {
      moduleId: moduleId,
      chapterId: chapterId,
      subchapterId: subChapterId,
      correctAnswers: correctAnswersCount,
      totalQuestions: questions.length,
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/progress/",
        formData,
        {
          headers: {
            Authorization: localStorage.getItem("token"), // Include your authorization token here
          },
        }
      );

      if (response.status === 200) {
        console.log("Progress saved successfully");
        console.log("Response", response);
        setCorrectAnswersCount(0);
        navigate("/subjects");
      } else {
        console.error("Failed to save progress");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }
  };

  const fetchQuestions = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/module/questions/${moduleId}/${chapterId}/${subChapterId}`,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      if (response.status === 200) {
        setQuestions(response.data.questions);
      } else {
        console.log("Status Code", response.status);
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false);
    }
    
  };

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  const handleShowResult = () => {
    if (!selectedOption) {
      console.log("Please select an option before proceeding.");
     setToastOpen(true);
      return;
    } else {
      setShowResult(true);
    }
  };

  const handleNextQuestion = () => {
    if (!selectedOption) {
      console.log("Please select an option before proceeding.");
      setToastOpen(true);   
      return;
    }



    const currentQuestion = questions[currentQuestionIndex];
    if (currentQuestion.correctAnswer === selectedOption) {
      setCorrectAnswersCount(correctAnswersCount + 1);
      console.log("Correct!");
    } else {
      console.log("Incorrect.");
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
     
      console.log("Test Completed");
      console.log(
        `You got ${correctAnswersCount} questions correct out of ${questions.length}`
      );
      setTestOver(true);
    }

    setSelectedOption("");
    setShowResult(false);
  };

  const handleKeyboardShortcuts = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      if (!showResult && selectedOption !== "") {
        // If not showing results and an option is selected, show results
        handleShowResult();
      } else if (currentQuestionIndex < questions.length - 1) {
        // If there are more questions, go to the next question
        handleNextQuestion();
      } else if (showResult && testOver) {
        // If showing results and the test is over, end the test
        handleEndTest(event);
      }
    } else if (!showResult) {
      if (event.key >= "1" && event.key <= "4") {
        // Handle number key presses (1, 2, 3, 4) for selecting options
        const selectedIndex = parseInt(event.key) - 1;
        if (
          selectedIndex >= 0 &&
          selectedIndex < questions[currentQuestionIndex].options.length &&
          selectedOption !==
            questions[currentQuestionIndex].options[selectedIndex]
        ) {
          handleOptionChange(
            questions[currentQuestionIndex].options[selectedIndex]
          );
        }
      } else if (event.key === "ArrowLeft" || event.key ==="ArrowUp") {
        // Handle left arrow key to go to the previous option
        const options = questions[currentQuestionIndex].options;
        const currentIndex = options.findIndex((option) => option === selectedOption);
        if (currentIndex > 0) {
          handleOptionChange(options[currentIndex - 1]);
        }
      } else if (event.key === "ArrowRight" || event.key==="ArrowDown") {
        // Handle right arrow key to go to the next option
        const options = questions[currentQuestionIndex].options;
        const currentIndex = options.findIndex((option) => option === selectedOption);
        if (currentIndex < options.length - 1) {
          handleOptionChange(options[currentIndex + 1]);
        }
      }
    }
  };
  

  // Add event listeners for keyboard shortcuts
  useEffect(() => {
    document.addEventListener("keydown", handleKeyboardShortcuts);
    return () => {
      document.removeEventListener("keydown", handleKeyboardShortcuts);
    };
  }, [selectedOption, showResult, questions, currentQuestionIndex, testOver]);

  


  
useEffect(()=>{fetchQuestions()},[])
  // Calculate the progress based on the current question index
  const progressPercentage = ((currentQuestionIndex + 1) / questions.length) * 100;
// Calculate the completion message based on correctAnswersCount and questions.length
useEffect(() => {
  if (testOver) {
    // Calculate the completion message based on correctAnswersCount and questions.length
    const message = getCompletionMessage(correctAnswersCount, questions.length);
    setCompletionMessage(message);
  }
}, [testOver, correctAnswersCount, questions.length]);
  return (
    <>
    <div className="questions-div">
      <Navbar />
      <div className="questions-heading">
        <div>
          <span   style={{
    textDecoration: "none", // Remove underline by default
    cursor: "pointer",
 
    
  }}
  onClick={() => navigate("/home")}>{subjectName}</span>
          <span   style={{
    textDecoration: "none", // Remove underline by default
    cursor: "pointer",
  
  }}
  onClick={() => navigate("/chapters")}> {">"} {chapterName} </span>
          <span   style={{
    textDecoration: "none", // Remove underline by default
    cursor: "pointer",
  
  }}
  onClick={() => navigate("/subjects")}>
            {">"} {subChapterName.split(" ")[0]}
          </span>
        </div>
      </div>
      <div className="progress-section">
        <div className="progress-content">
          <Progress
            strokeLinecap="butt"
            percent={progressPercentage}
            showInfo={false}
          />
        </div>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="single-question-main">
  {!testOver ? (
    // Render SingleQuestion and Next button when the test is not over
    <>
      <SingleQuestion
        question={questions[currentQuestionIndex]}
        selectedOption={selectedOption}
        handleOptionChange={handleOptionChange}
        showResult={showResult}
        currentQuestionIndex={currentQuestionIndex}
      />
      {!showResult ? (
        <button
          className={`animated-button ${
            isAnimating ? "animated next-button" : "next-button"
          }`}
          onMouseEnter={handleHover}
          onMouseLeave={handleMouseLeave}
          onClick={handleShowResult}
        >
          Next
        </button>
      ) : (
        <button
          className={`animated-button ${
            isAnimating ? "animated next-button" : "next-button"
          }`}
          onClick={handleNextQuestion}
          onMouseEnter={handleHover}
          onMouseLeave={handleMouseLeave}
        >
          Next
        </button>
      )}
    </>
  ) : (
     // Render the completion message outside the button
    <>
    <div
                className={`completion-message ${completionMessage.className}`}
              >
                <p>{completionMessage.message}</p>
                <p>
                  You got {correctAnswersCount} questions correct out of{" "}
                  {questions.length}
                </p>
              </div>
      <button
        className={`animated-button ${
          isAnimating ? "animated next-button" : "next-button"
        }`}
        onMouseEnter={handleHover}
        onMouseLeave={handleMouseLeave}
        onClick={handleEndTest}
      >
        End Test
      </button>
      {showRetryModal && (
            <RetryModal
              modalOpen={showRetryModal}
              setModalOpen = {setShowRetryModal}
              handleRetry={handleRetry}
              handleGoBack={handleGoBack}
            />
              )}
    </>
  )}
</div>

      )}
    </div>
   
    <Snackbar open={toastOpen} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
  <Alert onClose={handleClose} severity="warning"     sx={{ width: '100%' }}>
  Please select an option before proceeding
  </Alert>
</Snackbar>
    </>
  );
};

export default QuestionComp;
