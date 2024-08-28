import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import LandingList from './LandingList';
import Container from '@mui/material/Container';
import { Modal } from 'antd';


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));



const ModalLandingList = ({modalOpen,setModalOpen,notice}) => {

  const dateObject = new Date(notice?.date) || notice.date;
  const formattedDate = dateObject.toLocaleDateString('en-US', { timeZone: 'UTC' });

  return (
    <>
 <Modal
        title={<p className='newModuleTitle' style={{marginBottom:"2vh"}}> {notice.title}</p>}
        
        centered
        width={"auto"}
        open={modalOpen}
        onOk={() => setModalOpen(false)}
       footer={null}
        onCancel={() => setModalOpen(false)}>

          <DialogContent dividers>
            <Typography gutterBottom >
            {notice.content}
            </Typography>

          </DialogContent>
          <DialogActions>
            <p className='flex justify-end px-4 align-center' >
             {formattedDate}
            </p>
          </DialogActions>

        </Modal>
    </>
  )
}

export default ModalLandingList;



