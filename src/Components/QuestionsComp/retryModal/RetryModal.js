import React from "react"
import "./RetryModal.css"
import { Button, Modal } from "antd";
import RefreshIcon from '@mui/icons-material/Refresh';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
const RetryModal = (props) => {
  const { modalOpen, setModalOpen, handleRetry, handleGoBack } = props;
  return (
    <Modal
      title={<p className="modal-text">Please Retry Again</p>}
      className='modal-text'
      centered
      width={"auto"}
      open={modalOpen}
      onOk={() => setModalOpen(false)}
      onCancel={() => setModalOpen(false)}
      footer={null} // Remove the default footer
    >
      <div className="modal-content">
        <p>Your marks are low. Do you want to</p>
        <div className="button-container">
          <Button className="modal-button btn-x" onClick={handleRetry}>
            Retry Quiz <RefreshIcon fontSize="small" style={{ marginLeft: "4px" }}/>
          </Button>
          <Button className="modal-button btn-y" onClick={handleGoBack}>
            Go Back <KeyboardReturnIcon fontSize="small" style={{ marginLeft: "4px" }}/>
          </Button>
        </div>
      </div>
    </Modal>
  )
};

export default RetryModal;
