import { Routes, Route } from 'react-router-dom'
import PrivateRoutes from "./privateRoutes"
import PublicRoutes from './publicRoutes'

import Class from '../pages/Class';
import AssignCreate from '../pages/AssignCreate';
import AssignEdit from '../pages/AssignEdit';
import AssignList from '../pages/AssignList';
import Callback from '../pages/Callback';
import ClassCreate from '../pages/ClassCreate';
import ClassEdit from '../pages/ClassEdit';
import ErrorComp from '../pages/error'
import Home from '../pages/Home';
import Homeprof from '../pages/Homeprof';
import Lab from '../pages/Lab';
import Login from '../pages/Login';
import Sentin from '../pages/Sentin';
import StudentList from '../pages/StudentList';
// import Testernaja from '../pages/Testernaja';

function App() {
  return (
    <Routes>
      <Route element={<PrivateRoutes />}>
        <Route element={<AssignCreate />} path='AssignCreate' />
        <Route element={<AssignEdit />} path='AssignEdit' />
        <Route element={<AssignList />} path='AssignList' />
        <Route element={<Class />} path='Class' />
        <Route element={<ClassCreate />} path='ClassCreate' />
        <Route element={<ClassEdit />} path='ClassEdit' />
        <Route element={<Home />} path='/' />
        <Route element={<Homeprof />} path='Homeprof' />
        <Route element={<Lab />} path='Lab' />
        <Route element={<Sentin />} path='Sentin' />
        <Route element={<StudentList />} path='StudentList' />
        <Route element={<ErrorComp />} path='*' />
      </Route>
      <Route element={<PublicRoutes />}>
        <Route element={<Login />} path='/login' />
        <Route element={<Callback />} path='/callback' />
      </Route>
    </Routes>
  )
}

export default App