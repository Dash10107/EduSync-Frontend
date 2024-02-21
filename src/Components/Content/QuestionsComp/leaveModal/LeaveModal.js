import React from "react";
import "./LeaveModal.css"
import { Button, Modal } from "antd";
import RefreshIcon from '@mui/icons-material/Refresh';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import { useNavigate } from "react-router-dom";

const LeaveModal = (props) => {
  const { modalOpen, setModalOpen, routeToNavigate,setRouteToNavigate } = props;
  const navigate = useNavigate();

  const handleConfirmLeaveTest = () => {
    // Implement the logic to confirm leaving the test
    // You can use routeToNavigate to navigate to the selected route
    if (routeToNavigate) {

      navigate(routeToNavigate); // Navigate to the selected route
      setRouteToNavigate("");
    }
    setModalOpen(false); // Close the confirmation modal
  };

  const handleCloseModal = () => {
    setRouteToNavigate("");
    setModalOpen(false); // Close the confirmation modal
  };

  return (
    <Modal
      title={<p className="modal-text">Confirmation</p>}
      centered
      width={"auto"}
      open={modalOpen}
      onOk={() => setModalOpen(false)}
      onCancel={() => setModalOpen(false)}
      footer={null} // Remove the default footer
    >
      <div className="modal-content">
        <p>Are you sure you want to exit the test?</p>
        <div className="button-container">
          <Button className="modal-button btn-x" onClick={handleConfirmLeaveTest}>
            Yes, Exit  <RefreshIcon fontSize="small" style={{ marginLeft: "4px" }}/>
          </Button>
          <Button className="modal-button btn-y" onClick={handleCloseModal}>
            No, Continue Test <KeyboardReturnIcon fontSize="small" style={{ marginLeft: "4px" }}/>
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default LeaveModal;
