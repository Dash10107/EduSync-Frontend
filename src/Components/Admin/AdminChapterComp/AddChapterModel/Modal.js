import React, { useCallback, useEffect, useState }  from 'react';
import { Button, Modal } from 'antd';
import "./Modal.css";
import Input from '@mui/material/Input';
import SideArrow from "../../../../Assets/Arrow 4.png";
import WhiteArrow from "../../../../Assets/whitearrow.png";
import { ToastContainer, toast } from 'react-toastify';

const ModalComp = ({modalOpen,setModalOpen,handleSubmit}) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const handleHover = () => {
    setIsAnimating(true);
  };

  const handleMouseLeave = () => {
    setIsAnimating(false);
  };

  const [newname,setNewName] = useState("");
  const [desc,setDesc] =useState("");

  

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
        title={<p className='newModuleTitle'>New Chapter</p>}
        
        centered
        width={"auto"}
        open={modalOpen}
        onOk={() => setModalOpen(false)}
       
        onCancel={() => setModalOpen(false)}
        footer={[
          <button
            key="submit"
            onClick={(e)=>{handleSubmit(e,newname,desc)}}
            className={`animated-button ${isAnimating ? "animated btn-modal" : "btn-modal"}`}
            onMouseEnter={handleHover}
      onMouseLeave={handleMouseLeave}
          >
           Create a Chapter &nbsp;&nbsp;
        {isAnimating? <img src={WhiteArrow} alt=""/>: <img src={SideArrow} alt=""/>}  
          </button>,
        ]}
      >
          <div className="box">
        <p style={{position:"relative",top:"4vh",left:'1vw'}}>Name</p>
     <Input className='modal-inputNew'  type="text"
     disableUnderline={true}
      value={newname}
     onChange={(e)=>{setNewName(e.target.value);console.log(newname);}}
         ></Input>
         </div>
         <div className="box" style={{position:"relative",top:"-3vh",left:''}}>
         <p style={{position:"relative",bottom:"-2vh",left:'1vw'}}>Description</p>
<Input className='modal-inputNew'  type="text"
disableUnderline={true}
 value={desc}
onChange={(e)=>{setDesc(e.target.value);console.log(desc);}}
    ></Input>
    </div>
      </Modal>
      <ToastContainer/>
    </>
  );
};

export default ModalComp;