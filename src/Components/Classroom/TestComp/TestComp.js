import React, { useEffect, useState } from 'react'
//import Form from '../components/SurpriseTestComponents/Form';
import Navbar from '../../../Layouts/Navbar/Navbar';
import Footer from '../../../Layouts/Footer/Footer';
import Form from './Form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ResultsForm from './ResultForm';

const TestComp = () => {
    const code = localStorage.getItem("classroomCode");
    const formId = localStorage.getItem("formId");
    const classroomName = localStorage.getItem("classroomName");
    const [loading,setLoading] = useState(false);
    const navigate = useNavigate();
    const [form,setForm] = useState({});
    const [userAnswers, setUserAnswers] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const fetchSinglePost = async () => {
        setLoading(true);
        try {
    
          await axios.get(`https://edusync-backend.onrender.com/subadmin/classrooms/${code}/forms/${formId}`, {
            headers: {
              Authorization: localStorage.getItem("token"),
            }
          }).then(response => {
            console.log("Response", response);
    
            if (response.status === 200) {
              const form = response?.data?.form;
              setForm(form);
              
    
            } else {
              console.log("Status Code", response.status);
            }
          });
        } catch (error) {
          console.log("error", error);
        }finally{
          setLoading(false);
        }
      }
useEffect(()=>{fetchSinglePost()},[])

const updateUserAnswers = (answers) => {
    setUserAnswers(answers);
  };


  const putFormResult = async (marks) => {
    const mark = parseInt(marks);
   
    try {

      await axios.put(`https://edusync-backend.onrender.com/subadmin/classrooms/${code}/update-form-results`,{
        formId:formId,
        marks:mark
      }, {
        headers: {
          Authorization: localStorage.getItem("token"),
        }
      }).then(response => {
        console.log("Response", response);

        if (response.status === 200) {        

        } else {
          console.log("Status Code", response.status);
        }
      });
    } catch (error) {
      console.log("error", error);
    }
  }
  const handleSubmit = () => {
    const totalQuestions = form.questions.length;
    // Calculate the result
    const answeredQuestions = Object.keys(userAnswers).length;
    if (answeredQuestions < totalQuestions) {
      // Inform the user that not all questions are answered
      alert('Please answer all questions before submitting.');
      return;
    }
  

    const correctAnswers = form.questions.reduce((count, question, ind) => {
      const userAnswer = userAnswers[ind + 1]; // User's answer for the current question
      if (userAnswer === question.answer) {
        return count + 1;
      }
       return count;
     
    }, 0);
  
    const resultPercentage = (correctAnswers / totalQuestions) * 100;
    console.log('Result Percentage:', resultPercentage);
    putFormResult(resultPercentage);
    setIsSubmitted(true);
  
    // You can perform any other actions with the result here
  };
  

  
  return (
    <>
      <div>
        <Navbar />  
      </div> 
      <div className='flex justify-center'>
      <div className='lg:w-[60%] lg:p-8 p-6'>
        <div className="bg-cover bg-center lg:h-[15vh] h-[12vh] w-full rounded-lg" style={{ backgroundImage: `url('https://img.freepik.com/free-photo/background-gradient-lights_23-2149304985.jpg?w=1380&t=st=1709309022~exp=1709309622~hmac=ce4408754776f674ed07cae66519e186ccace2f44e3a712ae81dcb0d7b8c4423')` }}>
          <div className="text-white font-bold lg:text-3xl xl:text-4xl text-xl p-6 ">
            {form?.title}
          </div>
         {isSubmitted &&  <div className="text-white font-medium lg:text-lg xl:text-xl text-xs md:text-md px-4 lg:px-6 flex md:justify-end">
            Total Points : 10/10
          </div>} 
        </div>
    {form?.questions?.map((question,ind)=>{
        
        return(
            isSubmitted ?<ResultsForm question={question} ind={ind + 1} 
            userAnswer={userAnswers[ind + 1]} correctAnswer={question.answer} 
              />
        :<Form question={question} ind={ind + 1} updateUserAnswers={updateUserAnswers} isSubmitted />)
    })}
   

       <div>
    {isSubmitted ?        
    <button className='py-2 lg:px-8 xl:px-12 px-6 rounded-lg border-2 border-[#350A73] text-sm lg:text-md xl:text-lg font-semibold' onClick={()=>{navigate(-1)}}>Go back</button>
     : <button   onClick={handleSubmit} className='py-2 lg:px-8 xl:px-12 px-6 rounded-lg border-2 border-[#350A73] text-sm lg:text-md xl:text-lg font-semibold'>Submit</button> }  
       </div>
      </div>
      </div>
      <div>
        <Footer />
      </div>
    </>
  )
}

export default TestComp
