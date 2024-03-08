import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import WorkIcon from '@mui/icons-material/Work';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import Divider from '@mui/material/Divider';
import ListSubheader from '@mui/material/ListSubheader';
import EntityModal from './EntityModal';
import AddIcon from '@mui/icons-material/Add';
import AddResultModal from './Modals/AddResultModal';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';

const TestResults = ({results,clasroom,fetchClassroom}) => {
  const [modalOpen,setModalOpen] = React.useState(false);
  const [currenttest,setCurrentTest] = React.useState({});
  const [addmodalOpen,setAddModalOpen] = React.useState(false);
  const code = localStorage.getItem("classroomCode");

  const handleDeleteClick = async(e,id)=>{

    e.stopPropagation();  
    e.preventDefault();
    try {
    
      await axios.delete(`https://edusync-backend.onrender.com/subadmin/classrooms/${code}/results/${id}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        }
      }).then(response => {
        console.log("Response", response);

        if (response.status === 200) {

          console.log(response?.message);
          fetchClassroom();
          
        } else {
          console.log("Status Code", response.status);
        }
      });
    } catch (error) {
      console.log("error", error);
    }
  }
  return (
    <div className="flex justify-center my-6">
      <div className='w-full lg:w-[80%]'>
        <List sx={{ width: '100%' }} className='w-70'>
          <ListSubheader sx={{ fontWeight: 'bold', fontSize: '1.1rem' }}>Test Results</ListSubheader>
          <Divider />
          {results?.map((test)=>{
        return (<>
          <ListItem sx={{alignItems: 'center' }} onClick={()=>{setModalOpen(true);setCurrentTest(test)}}>
            <ListItemAvatar>
              <Avatar>
                <ImageIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={test?.testName}  />
            <DeleteIcon onClick={(e) => handleDeleteClick(e,test._id)} />
          </ListItem>
         
          <Divider className=''/>
        </>)
      })}
      <ListItem sx={{alignItems: 'center' }}  className='cursor-pointer ' onClick={()=>{setAddModalOpen(true)}}>
            <ListItemAvatar>
              <Avatar>
                <ImageIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Add New Test" />
            <AddIcon />
          </ListItem>
        </List>
        <EntityModal modalOpen={modalOpen} setModalOpen={setModalOpen} test={currenttest} fetchClassroom={fetchClassroom} />
        <AddResultModal modalOpen={addmodalOpen} setModalOpen={setAddModalOpen} clasroom={clasroom} fetchClassroom={fetchClassroom} />
      </div>
     
    </div>
  );
};

export default TestResults;