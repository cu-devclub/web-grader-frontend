import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './components/reportWebVitals';
import "bootstrap/dist/css/bootstrap.min.css";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import App from './components/App';
import AssignCreate from './pages/AssignCreate';
import AssignEdit from './pages/AssignEdit';
import AssignList from './pages/AssignList';
import Callback from './pages/Callback';
import ClassCreate from './pages/ClassCreate';
import ClassEdit from './pages/ClassEdit';
import Home from './pages/Home';
import Homeprof from './pages/Homeprof';
import Lab from './pages/Lab';
import Login from './pages/Login';
import Sentin from './pages/Sentin';
import StudentList from './pages/StudentList';
import Testernaja from './pages/Testernaja';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  {
    path: "Home",
    element: <Home/>,
  },
  {
    path: "Lab",
    element: <Lab/>,
  },
  {
    path: "AssignEdit",
    element: <AssignEdit/>,
  },
  {
    path: "AssignCreate",
    element: <AssignCreate/>,
  },
  {
    path: "Homeprof",
    element: <Homeprof/>,
  },
  {
    path: "Sentin",
    element: <Sentin/>,
  },
  {
    path: "AssignList",
    element: <AssignList/>,
  },
  {
    path: "StudentList",
    element: <StudentList/>,
  },
  {
    path: "ClassCreate",
    element: <ClassCreate/>,
  },
  {
    path: "ClassEdit",
    element: <ClassEdit/>,
  },
  // {
  //   path:"Testernaja",
  //   element: <Testernaja/>,
  // },
  {
    path:"Login",
    element: <Login/>,
  },
  {
    path:"Callback",
    element: <Callback/>,
  },
  
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  //<React.StrictMode>
    < RouterProvider router={router}/>
  //</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
