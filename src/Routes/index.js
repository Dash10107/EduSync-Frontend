import { Navigate, createBrowserRouter } from "react-router-dom";
import Landing from "../Pages/Landing";
import Login from "../Pages/Login";
import HomePage from "../Pages/Home";
import Chapters from "../Pages/Chapters";
import Subjects from "../Pages/Subjects";
import Question from "../Pages/Question";
import Profile from "../Pages/Profile";
import Signup from "../Pages/Signup";

export const router = createBrowserRouter([
  {
    path:"/signup",
    element:<Signup/>
  },
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/home",
    element: localStorage.getItem("token") ? (
      <HomePage />
    ) : (
      <Navigate to="/login" replace />
    ),
  },
  {
    path: "/chapters",
    element: localStorage.getItem("token")  ? (
      <Chapters />
    ) : (
      <Navigate to="/login" replace />
    ),
  },
  {
    path: "/subjects",
    element: localStorage.getItem("token")   ? (
      <Subjects />
    ) : (
      <Navigate to="/login" replace />
    ),
  },
  {
    path: "/questions",
    element: localStorage.getItem("token")  ? (
      <Question />
    ) : (
      <Navigate to="/login" replace />
    ),
  },
  {
    path: "/profile",
    element: localStorage.getItem("token")? (
      <Profile />
    ) : (
      <Navigate to="/login" replace />
    ),
  },
]);

export default router;

//corrently working on it 
// import { Navigate, createBrowserRouter } from "react-router-dom";
// import Landing from "../Pages/Landing";
// import Login from "../Pages/Login";
// import HomePage from "../Pages/Home";
// import Chapters from "../Pages/Chapters";
// import Subjects from "../Pages/Subjects";
// import Question from "../Pages/Question";
// import Profile from "../Pages/Profile";

// export const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Landing />,
//   },
//   {
//     path: "/login",
//     element: <Login />,
//   },
//   {
//     path: "/home",
//     element: localStorage.getItem("token") ? (
//       <HomePage />
//     ) : (
//       <Navigate to="/login" replace />
//     ),
//   },
//   {
//     path: "/chapters",
//     element: localStorage.getItem("token") && localStorage.getItem("moduleId") ? (
//       <Chapters />
//     ) : localStorage.getItem("token") ? (
//       <Navigate to="/home" replace />
//     ) : (
//       <Navigate to="/login" replace />
//     ),
//   },
//   {
//     path: "/subjects",
//     element: localStorage.getItem("token") && localStorage.getItem("chapterId") ? (
//       <Subjects />
//     ) : localStorage.getItem("token") ? (
//       <Navigate to="/chapters" replace />
//     ) : (
//       <Navigate to="/login" replace />
//     ),
//   },
//   {
//     path: "/questions",
//     element: localStorage.getItem("token") && localStorage.getItem("subChapterId") ? (
//       <Question />
//     ) : localStorage.getItem("token") ? (
//       <Navigate to="/subjects" replace />
//     ) : (
//       <Navigate to="/login" replace />
//     ),
//   },
//   {
//     path: "/profile",
//     element: localStorage.getItem("token") ? (
//       <Profile />
//     ) : (
//       <Navigate to="/login" replace />
//     ),
//   },
// ]);

// export default router;
