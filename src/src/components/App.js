import { Routes, Route } from 'react-router-dom'
import PrivateRoutes from "./src/components/privateRoutes"
import PublicRoutes from './src/components/publicRoutes'

import Index from './src/pages/Index';
import AssignCreate from './src/pages/AssignCreate';
import AssignEdit from './src/pages/AssignEdit';
import AssignList from './src/pages/AssignList';
import Callback from './src/pages/Callback';
import ClassCreate from './src/pages/ClassCreate';
import ClassEdit from './src/pages/ClassEdit';
import ErrorComp from './src/pages/error'
import Home from './src/pages/Home';
import Homeprof from './src/pages/Homeprof';
import Lab from './src/pages/Lab';
import Login from './src/pages/Login';
import Sentin from './src/pages/Sentin';
import StudentList from './src/pages/StudentList';
import Testernaja from './src/pages/Testernaja';

function App() {
  return (
    <Routes>
      <Route element={<PrivateRoutes />}>
        <Route element={<Home />} path='/' />
        <Route element={<ErrorComp />} path='*' />
      </Route>
      <Route element={<PublicRoutes />}>
        <Route element={<Login />} path='/login' />
      </Route>
      <Route element={<PublicRoutes />}>
        <Route element={<Callback />} path='/callback' />
      </Route>
    </Routes>
  )
}

export default App