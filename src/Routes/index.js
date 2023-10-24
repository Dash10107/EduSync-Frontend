import {  createBrowserRouter } from "react-router-dom";
import Landing from "../Pages/Landing";
import Login from "../Pages/Login";
import HomePage from "../Pages/Home";
import Chapters from "../Pages/Chapters";
import Subjects from "../Pages/Subjects";
import Question from "../Pages/Question";
import Profile from "../Pages/Profile";
import Signup from "../Pages/Signup";
import ModulesProgress from "../Pages/ModulesProgress";
import AdminHome from "../Pages/AdminHome";
import AdminChapter from "../Pages/AdminChapter";
import AdminSubChapter from "../Pages/AdminSubChapter";
import AdminQuestion from "../Pages/AdminQuestion";

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
    path: "/login",
    element:  <Login />,
  },
  {
    path: "/home",
    element:<HomePage /> ,
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
  }
]);

export default router;
