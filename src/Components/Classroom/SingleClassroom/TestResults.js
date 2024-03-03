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

const TestResults = ({results}) => {
  const [modalOpen,setModalOpen] = React.useState(false);
  const [currenttest,setCurrentTest] = React.useState({});
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
          </ListItem>
          <Divider className=''/>
        </>)
      })}
        </List>
        <EntityModal modalOpen={modalOpen} setModalOpen={setModalOpen} test={currenttest} />
      </div>
     
    </div>
  );
};

export default TestResults;