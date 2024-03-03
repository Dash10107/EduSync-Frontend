import {  createBrowserRouter } from "react-router-dom";
import Landing from "../Pages/Content/Landing";
import Login from "../Pages/User/Login";
import Chapters from "../Pages/Content/Chapters";
import Subjects from "../Pages/Content/Subjects";
import Question from "../Pages/Content/Question";
import Profile from "../Pages/User/Profile";
import Signup from "../Pages/User/Signup";
import ModulesProgress from "../Pages/Content/ModulesProgress";
import AdminHome from "../Pages/Admin/AdminHome";
import AdminChapter from "../Pages/Admin/AdminChapter";
import AdminSubChapter from "../Pages/Admin/AdminSubChapter";
import AdminQuestion from "../Pages/Admin/AdminQuestion";
import ContentPage from "../Pages/Content/Content";
import HomePage from "../Pages/Content/Home";
import Classroom from "../Pages/Classroom/Classroom";
import ClassroomSingle from "../Pages/Classroom/ClassroomSingle";
import SurpriseTest from "../Pages/Classroom/SurpriseTest";
import SubAdminHome from "../Pages/SubAdmin/SubAdminHome";
import VerifyEmail from "../Pages/User/VerifyEmail";
import BeforeVerify from "../Pages/User/BeforeVerify";
import SinglePost from "../Pages/Classroom/SinglePost";
import SubAdminClassroom from "../Pages/SubAdmin/SubAdminClassroom";
import SubAdminTest from "../Pages/SubAdmin/SubAdminTest";

;

export const router = createBrowserRouter([
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/noticeboard",
    element: <Landing />,
  },
  {
    path: "/login",
    element:  <Login />,
  },
  {
    path: "/verifyemail/:id/:token",
    element: <VerifyEmail />
  },
  {
    path:"/verifyemail",
    element:<BeforeVerify/>
  },
  {
    path:"/home",
    element:<HomePage/>,
  },
  {
    path:"/classrooms",
    element:<Classroom/>,
  },
  {
    path:"/classrooms/single",
    element:<ClassroomSingle/>,
  },
  {
    path:"/classrooms/single/post",
    element:<SinglePost/>,
  },
  {
    path:"/classrooms/test",
    element:<SurpriseTest/>,
  },
  {
    path: "/content",
    element:<ContentPage /> ,
  },
  {
    path: "/chapters",
    element: <Chapters /> ,
  },
  {
    path: "/subjects",
    element: <Subjects /> ,
  },
  {
    path: "/questions",
    element: <Question /> ,
  },
  {
    path: "/profile",
    element: <Profile /> ,
  },
  {
    path: "/profile/modules",
    element: <ModulesProgress /> ,
  },
  {
    path:"/admin/home",
    element:<AdminHome/>
  },
  {
    path:"admin/chapter",
    element:<AdminChapter/>
  },
  {
    path:"admin/subchapter",
    element:<AdminSubChapter/>
  },
  {
    path:"admin/questions",
    element:<AdminQuestion/>
  },
  {
    path:"subadmin/home",
    element:<SubAdminHome/>
  },
  {
    path:"subadmin/classroom",
    element:<SubAdminClassroom/>
  },
  {
    path:"/subadmin/classrooms/createTest",
    element:<SubAdminTest/>
  }

]);

export default router;
