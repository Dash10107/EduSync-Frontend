import React, { useEffect, useState } from 'react';
import Navbar from '../../../Layouts/Navbar/Navbar';
import FolderCopyIcon from '@mui/icons-material/FolderCopy';
import SchoolIcon from '@mui/icons-material/School';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import { useNavigate } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import {
  CircularProgressbar,
  CircularProgressbarWithChildren,
  buildStyles
} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import './ProfileGraph.css';
import axios from 'axios';

const ProfileClassComp = () => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userDetails, setUserDetails] = useState({});
  const [formResults, setFormResults] = useState([]);
  const [testResults, setTestResults] = useState([]);
  const [activeTab, setActiveTab] = useState('offline'); // Default to 'offline'

  const [testChartResults, setTestChartResults] = useState({
    labels: [],
    datasets: [
      {
        label: 'Test Results',
        data: [],
        backgroundColor: ['aqua', 'green', 'red', 'yellow'],
        borderColor: ['aqua', 'green', 'red', 'yellow'],
        borderWidth: 0.5,
      },
    ],
  });

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.setItem('token', '');
    localStorage.setItem('allowRedirect', false);
    navigate('/login');
  };

  const fetchUser = async () => {
    setLoading(true);

    try {
      const response = await axios.get('https://edusync-backend.onrender.com/users/protected', {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      });

      if (response.status === 200) {
        const userTestData = response.data.userDetails.testResults;

        const testLabels = userTestData.map((test) => test.testName);
        const testValues = userTestData.map((test) => test.marks);

        setTestChartResults({
          labels: testLabels,
          datasets: [
            {
              label: 'Test Results',
              data: testValues,
              backgroundColor: ['aqua', 'green', 'red', 'yellow'],
              borderColor: ['aqua', 'green', 'red', 'yellow'],
              borderWidth: 0.5,
            },
          ],
        });

        setUserData(response.data.user);
        setUserDetails(response.data.userDetails);
        setTestResults(response.data.userDetails.testResults);
        setFormResults(response.data.userDetails.formResults);
      } else {
        console.log('Access denied');
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <>
      <div>
        <Navbar isProfile={true} />
      </div>
      <div className='flex'>
        <div className='w-[15%] border-r-2 hidden lg:block'>
          <div>
            <button className='home-button' onClick={() => navigate('/profile')}>
              {' '}
              <HomeRoundedIcon /> <p>User Details </p>{' '}
            </button>

            <button className='home-button' onClick={() => navigate('/content/profile')}>
              {' '}
              <FolderCopyIcon /> <p>Content Progress </p>{' '}
            </button>

            <button className='home-button' onClick={() => navigate('/classroom/profile')}>
              {' '}
              <SchoolIcon /> <p>Classrooms Performance</p>{' '}
            </button>

            <button className='home-button' onClick={() => navigate('/feedback')}>
              {' '}
              <DynamicFeedIcon /> <p>Feedback</p>{' '}
            </button>
            <button className='home-button' onClick={handleLogout}>
              {' '}
              <LogoutIcon /> <p>Logout</p>{' '}
            </button>
          </div>
        </div>
        <div className='w-[100%] lg:w-[85%]'>
          <div className='w-[100%] flex justify-center items-center my-8'>
            <div className='w-[60%] text-center text-4xl font-semibold '>
              <h3 className='text-gray-800'>Classroom Performance Of Student</h3>
              <div className='w-[100%] flex my-8  '>
                <div className='w-[80%]'>
                  {/* <Bar
                    data={testChartResults}
                    height={400}
                    options={{
                      maintainAspectRatio: false,
                      scales: {
                        yAxes: [
                          {
                            ticks: {
                              beginAtZero: true,
                            },
                          },
                        ],
                      },
                      legend: {
                        labels: {
                          fontSize: 0,
                        },
                      },
                    }}
                  /> */}
                </div>
              </div>
            </div>
          </div>
          <div className='w-[100%]  flex my-8'>
            <div className='text-4xl font-semibold '>
              <div className='tabs w-[100%] '>
                <button
                  className={`tab-button ${activeTab === 'offline' ? 'active-tab' : ''}`}
                  onClick={() => handleTabChange('offline')}
                >
                  Offline Tests
                </button>
                <button
                  className={`tab-button ${activeTab === 'surprise' ? 'active-tab' : ''}`}
                  onClick={() => handleTabChange('surprise')}
                >
                  Surprise Tests
                </button>
              </div>
              <div className='overview-sec'>
                <p className='overview-text'>Overview Of Each Test </p>
                {activeTab === 'offline' &&
                  formResults.map((test) => (
                    <div key={test.formId} className='my-progress-card'>
                      <CircularProgressbarWithChildren
                        className='progress-in-active'
                        value={test.marks}
                        counterClockwise
                        strokeWidth={5}
                        styles={buildStyles({
                          textColor: '#1F1926',
                          pathColor: '#EF6746',
                          trailColor: '#FFDCD4',
                        })}
                      >
                        <div>
                          <span style={{ fontSize: '2vh', fontWeight: 700, fontFamily: 'Poppins' }}>{test.marks}</span>
                          <span style={{ fontSize: '1.5vh', fontWeight: 700, fontFamily: 'Poppins' }}>%</span>
                        </div>
                      </CircularProgressbarWithChildren>
                      <p className='overview-text'>{test.formName}</p>
                    </div>
                  ))}
                {activeTab === 'surprise' &&
                  testResults.map((test) => (
                    <div key={test.testId} className='my-progress-card'>
                      <CircularProgressbarWithChildren
                        className='progress-in-active'
                        value={test.marks}
                        counterClockwise
                        strokeWidth={5}
                        styles={buildStyles({
                          textColor: '#1F1926',
                          pathColor: '#EF6746',
                          trailColor: '#FFDCD4',
                        })}
                      >
                        <div>
                          <span style={{ fontSize: '2vh', fontWeight: 700, fontFamily: 'Poppins' }}>{test.marks}</span>
                          <span style={{ fontSize: '1.5vh', fontWeight: 700, fontFamily: 'Poppins' }}>%</span>
                        </div>
                      </CircularProgressbarWithChildren>
                      <p className='overview-text'>{test.testName}</p>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileClassComp;
