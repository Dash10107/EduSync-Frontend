import React, { useCallback, useEffect, useState }  from 'react';
import { Button, Modal } from 'antd';
// import "./Modal.css";
import Input from '@mui/material/Input';
import SideArrow from "../../../../Assets/Arrow 4.png";
import WhiteArrow from "../../../../Assets/whitearrow.png";
import { ToastContainer, toast } from 'react-toastify';

const AddPostModalComp = ({modalOpen,setModalOpen,handleSubmit}) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const handleHover = () => {
    setIsAnimating(true);
  };

  const handleMouseLeave = () => {
    setIsAnimating(false);
  };

  const [newname,setNewName] = useState("");
  const [content,setContent] = useState("");
  const [file,setFile] = useState(null)
  
  const handleChange = (e) => {
    const file = e.target.files[0];
    console.log('File',file);
    
    setFile(file)
  };

 useEffect(() => {
  const handleKeyDown = (event) => {
    if (modalOpen && event.key === 'Enter') { // Check if modal is open and Enter key is pressed
      event.preventDefault();
      // submitFunction();
    }
  };

  const handleDocumentKeyDown = (event) => {
    handleKeyDown(event);
  };

  document.addEventListener('keydown', handleDocumentKeyDown);

  return () => {
    document.removeEventListener('keydown', handleDocumentKeyDown);
  };
}, [modalOpen]);


  
  return (
    <>
      <Modal
        title={<p className='newModuleTitle'> Create New Post</p>}
        
        centered
        width={"auto"}
        open={modalOpen}
        onOk={() => setModalOpen(false)}
       
        onCancel={() => setModalOpen(false)}
        footer={[
          <button
            key="submit"
            onClick={(e)=>{handleSubmit(e,newname,content,file)}}
            className={`animated-button ${isAnimating ? "animated btn-modal" : "btn-modal"}`}
            onMouseEnter={handleHover}
      onMouseLeave={handleMouseLeave}
          >
          Submit New Post  &nbsp;&nbsp;
        {isAnimating? <img src={WhiteArrow} alt=""/>: <img src={SideArrow} alt=""/>}  
          </button>,
        ]}
      >
          <div className="box">

     <Input className='modal-inputNew'  type="text"
     disableUnderline={true}
      value={newname}
      placeholder='Title'
     onChange={(e)=>{setNewName(e.target.value);console.log(newname);}}
         ></Input>
         <Input className='modal-inputNew'  type="text"
     disableUnderline={true}
      value={content}
      placeholder='Content'
     onChange={(e)=>{setContent(e.target.value);console.log(content);}}
         ></Input>
            <input
      type="file"
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#6469ff] focus:border-[#6469ff] outline-none block w-full p-3"
      placeholder="Select Any File (PDF/Image)"
      accept=".pdf, image/*"
      onChange={handleChange}
      required

    />
         </div>
      </Modal>
      <ToastContainer/>
    </>
  );
};

export default AddPostModalComp;