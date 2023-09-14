import { createBrowserRouter } from "react-router-dom";
import Landing from "../Pages/Landing";
import Login from "../Pages/Login";
import HomePage from "../Pages/Home";



export const router = createBrowserRouter([
    {
        path:"/",
        element:<Landing/>
    },
    {
        path:"/login",
        element:<Login/>
    },
    {
        path:"/home",
        element:<HomePage/>
    },
])