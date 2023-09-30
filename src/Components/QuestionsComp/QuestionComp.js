import React, { useEffect, useState } from "react";
import "./QuestionComp.css";
import axios from "axios";
import Navbar from "../../Layouts/Navbar/Navbar";
import SingleQuestion from "./singleQuestion/SingleQuestion";
import { useNavigate } from "react-router-dom";
import { Progress } from "antd";

const QuestionComp = (props) => {
  const moduleId = localStorage.getItem("moduleId");
  const chapterId = parseInt(localStorage.getItem("chapterId"));
  const subChapterId = localStorage.getItem("subChapterId");
  const subChapterName = localStorage.getItem("SubChapter");
  const chapterName = localStorage.getItem("ChapterName");
  const subjectName = localStorage.getItem("SubjectName");
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
      return;
    } else {
      setShowResult(true);
    }
  };

  const handleNextQuestion = () => {
    if (!selectedOption) {
      console.log("Please select an option before proceeding.");
      return;
    } else {
      if (currentQuestionIndex < questions.length - 1) {
        const currentQuestion = questions[currentQuestionIndex];
        if (currentQuestion.correctAnswer === selectedOption) {
          setCorrectAnswersCount(correctAnswersCount + 1);
          console.log("Correct!");
        } else {
          console.log("Incorrect.");
        }
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedOption("");
        setShowResult(false);
      } else {
        console.log("Test Completed");
        console.log(
          `You got ${correctAnswersCount} questions correct out of ${questions.length}`
        );
      }
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

// Calculate the progress based on the current question index
const progressPercentage = ((currentQuestionIndex + 1) / questions.length) * 100;
console.log(progressPercentage);

  return (
    <div className="questions-div">
      <Navbar />
      <div className="questions-heading">
        <div>
          <span onClick={() => navigate(-3)}>{subjectName}</span>
          <span onClick={() => navigate(-2)}> {">"} {chapterName} </span>
          <span onClick={() => navigate(-1)}>
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
          <SingleQuestion
            question={questions[currentQuestionIndex]}
            selectedOption={selectedOption}
            handleOptionChange={handleOptionChange}
            showResult={showResult}
            currentQuestionIndex={currentQuestionIndex}
          />
          {!showResult ? (
            <button onClick={handleShowResult}>Next</button>
          ) : (
            <div>
              {currentQuestionIndex < questions.length - 1 ? (
                <button onClick={handleNextQuestion}>Next</button>
              ) : (
                <div>
                  <p>Test Completed</p>
                  <p>
                    You got {correctAnswersCount} questions correct out of{" "}
                    {questions.length}
                  </p>
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
