import React, { useEffect, useState } from "react"
import  "./QuestionComp.css"
import axios from "axios";

const QuestionComp = (props) => {
    const moduleId = localStorage.getItem("moduleId");
    const chapterId = parseInt(localStorage.getItem("chapterId"));
    const subChapterId = localStorage.getItem("subChapterId");


    
    
    const [questions,setQuestions] = useState([]);
      const [loading,setLoading] = useState(true);
    
      const fetchQuestions=async()=>{
        try {
          await axios.get(`http://localhost:5000/module/questions/${moduleId}/${chapterId}/${subChapterId}`,{
            headers: {
              Authorization: localStorage.getItem("token"),
            }
           }).then(response => {
            console.log("Response",response);
            
            if(response.status===200){
        console.log('200');
        setQuestions(response?.data?.questions);
        
    
            }else{console.log("Status Code",response.status);
            }
           
          })
        } catch (error) {
          console.log("error", error)
        }finally {
          // Set loading to false when data fetching is complete
          setLoading(false);
        }
      }
    
    useEffect(()=>{
    fetchQuestions();
    },[])
    useEffect(()=>{
        console.log(questions);
        
    },[questions])
    
  return (
    <div>
         <h2>Questions</h2>
         <br/>
      <ul>
        {questions.map((question) => (
          <li key={question.id}>
            {question.question}
            <ul>
              {question.options.map((option, index) => (
                <li key={index}>{option}</li>
              ))}
            </ul>
            <br/>
          </li>
        ))}
      </ul>
    </div>
  )
};

export default QuestionComp;
