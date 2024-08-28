import React, { useCallback, useEffect, useState }  from 'react';
import { Button, Modal } from 'antd';
import Input from '@mui/material/Input';
import SideArrow from "../../../Assets/Arrow 4.png";
import WhiteArrow from "../../../Assets/whitearrow.png";
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
  const [content,setNewContent] = useState("");
  

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
        title={<p className='newModuleTitle'> Create Notice</p>}
        
        centered
        width={"auto"}
        open={modalOpen}
        onOk={() => setModalOpen(false)}
       
        onCancel={() => setModalOpen(false)}
        footer={[
          <button
            key="submit"
            onClick={(e)=>{handleSubmit(e,newname,content)}}
            className={`animated-button ${isAnimating ? "animated btn-modal" : "btn-modal"}`}
            onMouseEnter={handleHover}
      onMouseLeave={handleMouseLeave}
          >
           Post the Notice &nbsp;&nbsp;
        {isAnimating? <img src={WhiteArrow} alt=""/>: <img src={SideArrow} alt=""/>}  
          </button>,
        ]}
      >
          <div className="box" style={{display:"flex",flexDirection:"column"}}>
        
     <Input className='modal-inputNew'  style={{margin:0,marginTop:"2vh"}} type="text"
     placeholder='Title'
     disableUnderline={true}
      value={newname}
     onChange={(e)=>{setNewName(e.target.value);console.log(newname);}}
         >
        
         </Input>
              <Input className='modal-inputNew' style={{margin:0,marginBottom:"2vh"}}  type="text"
     disableUnderline={true}
     placeholder='Content'
      value={content}
     onChange={(e)=>{setNewContent(e.target.value);}}
         ></Input>
         </div>
      </Modal>
      <ToastContainer/>
    </>
  );
};

export default ModalComp;