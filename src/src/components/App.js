import { Routes, Route } from 'react-router-dom'
import PrivateRoutes from "./components/privateRoutes"
import PublicRoutes from './components/publicRoutes'

import Index from './pages/Index';
import AssignCreate from './pages/AssignCreate';
import AssignEdit from './pages/AssignEdit';
import AssignList from './pages/AssignList';
import Callback from './pages/Callback';
import ClassCreate from './pages/ClassCreate';
import ClassEdit from './pages/ClassEdit';
import ErrorComp from './pages/error'
import Home from './pages/Home';
import Homeprof from './pages/Homeprof';
import Lab from './pages/Lab';
import Login from './pages/Login';
import Sentin from './pages/Sentin';
import StudentList from './pages/StudentList';
import Testernaja from './pages/Testernaja';

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