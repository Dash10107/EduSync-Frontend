import React from "react"
import  "./RetryModal.css"
import { Button, Modal } from "antd";

const RetryModal = (props) => {
    const {modalOpen,setModalOpen,handleRetry} = props;
  return (
  <Modal
   title="Please Retry Again "
        className='modal-text'
        centered
        width={"25vw"}
        open={modalOpen}
        onOk={() => setModalOpen(false)}
       
        onCancel={() => setModalOpen(false)}
        footer={[<Button      onClick={handleRetry}>Retry</Button>,]}
           >
  <p>Your marks are low. Do you want to retry?</p>
  </Modal>
  )
};

export default RetryModal;
