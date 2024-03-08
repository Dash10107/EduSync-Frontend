import React, { useEffect, useState } from "react";
import "./ModulesProgress.css";
import Navbar from "../../../Layouts/Navbar/Navbar";
import axios from "axios";
import SingleModule from "./singleModule/SingleModule";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useNavigate } from "react-router-dom";
const ModulesProg = (props) => {
  const navigate = useNavigate();
  const [progressModules, setProgressModules] = useState([]);
  const [progressChapters, setProgressChapters] = useState([]);
  const [progressSubChapters, setProgressSubChapters] = useState([]);
  const [selectedModule, setSelectedModule] = useState(null);
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [subchapters,setSubChapters] = useState([]);

  const fetchMainProgress = async () => {
    try {
      const response = await axios.get("https://edusync-backend.onrender.com/progress/modules", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });

      if (response.status === 200) {
        setProgressModules(response.data?.allModulesProgress);
      } else {
        console.log("Status Code", response.status);
      }
    } catch (error) {
      console.error("error", error);
    }
  };

  const fetchChaptersProgress = async (moduleId) => {
    try {
      const response = await axios.get(`https://edusync-backend.onrender.com/progress/${moduleId}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });

      if (response.status === 200) {
        console.log('Response for chapters', response);
        setProgressChapters(response.data?.progressPercentages);
      } else {
        console.log("Status Code", response.status);
      }
    } catch (error) {
      console.error("error", error);
    }
  };

  const fetchSubChaptersProgress = async (moduleId, chapterId) => {
    try {
      const response = await axios.get(`https://edusync-backend.onrender.com/progress/${moduleId}/${chapterId}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });

      if (response.status === 200) {
        console.log('Response for subchapters', response);
        setProgressSubChapters(response.data?.chapterProgress);
      } else {
        console.log("Status Code", response.status);
      }
    } catch (error) {
      console.error("error", error);
    }
  };

  const fetchSubChapters = async (moduleId, chapterId) => {
    try {
      const response = await axios.get(`https://edusync-backend.onrender.com/module/subchapters/${moduleId}/${chapterId}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });

      if (response.status === 200) {
        console.log('Response for subchapters', response);
        setSubChapters(response.data?.subchapters)
      } else {
        console.log("Status Code", response.status);
      }
    } catch (error) {
      console.error("error", error);
    }
  };

  useEffect(() => {
    fetchMainProgress();
  }, []);

  useEffect(() => {
    if (selectedModule) {
      fetchChaptersProgress(selectedModule.moduleId);
    }
  }, [selectedModule]);

  useEffect(() => {
    if (selectedChapter) {
      fetchSubChaptersProgress(selectedModule.moduleId, selectedChapter.chapterId);
      fetchSubChapters(selectedModule.moduleId, selectedChapter.chapterId);
    }
  }, [selectedChapter]);

  return (
    <div>
      <Navbar />
      <div>
        {!selectedModule ? (
          <div className="ending-margin">
            <h2 className="progress-subject-heading">
            <div className="goBack">
    <p className="back-icon" onClick={()=>{navigate("/profile")}}><ArrowBackIosIcon fontSize="large"/> </p>
    <p> All Subjects Progress </p>
    </div></h2>
            <ul>
              {progressModules.map((module, index) => (
                <SingleModule
                  key={module.moduleId}
                  index={index}
                  module={module}
                  onClick={() => setSelectedModule(module)}
                />
              ))}
            </ul>
          </div>
        ) : !selectedChapter ? (
          <div className="ending-margin">
            <h2 className="progress-subject-heading">
            <div className="goBack">
    <p className="back-icon" onClick={()=>{setSelectedModule(null)}}><ArrowBackIosIcon fontSize="large"/> </p>
            <p>{selectedModule.moduleName}</p>
            </div>
            </h2>
            <ul>
              {progressChapters.map((chapter, index) => (
                <SingleModule
                  key={chapter.chapterId}
                  index={index}
                  module={chapter}
                  onClick={() => setSelectedChapter(chapter)}
                />
              ))}
            </ul>
          </div>
        ) : (
          <div className="ending-margin">
          <h2 className="progress-subject-heading">
          <div className="goBack">
    <p className="back-icon" onClick={()=>{setSelectedChapter(null)}}><ArrowBackIosIcon fontSize="large"/> </p>
            <p>{selectedChapter.chapterName}</p>
            </div>
            </h2>
            <ul>
              {progressSubChapters.map((subchapter, index) => (
                <SingleModule
                  key={subchapter.subchapterId}
                  index={index}
                  module={subchapter}
                  Subchapter={subchapters.find((sub)=>sub.id===subchapter.subchapterId)}
                  onClick={() => {
                    console.log(subchapter)
                    console.log(subchapters[index])
                  }}
                />
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModulesProg;
