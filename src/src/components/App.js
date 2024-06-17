import { Routes, Route }    from 'react-router-dom'
import PrivateRoutes        from "./privateRoutes"
import PublicRoutes         from './publicRoutes'
import ProfRoutes           from './profRoutes'




import ClassCreate from '../pages/Not_use/ClassCreate'; // not use due to create class modal

// global
import Home         from '../pages/Home';
// import Login        from '../pages/Login';
// import Callback     from '../pages/Callback';
import Login        from '../test/test-login';
import Callback     from '../test/test-callback';
import ErrorComp    from '../pages/error';
// import Logout       from '../pages/Logout';
import Logout       from '../test/test-logout';

// Professor
import ClassEdit    from '../pages/PF/ClassEdit';
import AssignList   from '../pages/PF/AssignList';
import AssignCreate from '../pages/PF/AssignCreate';
import AssignEdit   from '../pages/PF/AssignEdit';
import Sentin       from '../pages/PF/Sentin';
import StudentList  from '../pages/PF/StudentList';
import TAmanage     from '../pages/PF/TAmanage'

// Student
import Class        from '../pages/ST/Class';
import Lab          from '../pages/ST/Lab';





import Test from '../pages/Test'



// import Testernaja from '../pages/Testernaja';

function App() {
    return (
        <Routes>
            <Route element={<PrivateRoutes />}>
                <Route element={<ProfRoutes />}>
                    <Route element={<ClassEdit />} path='ClassEdit' />
                    <Route element={<AssignCreate />} path='AssignCreate' />
                    <Route element={<AssignEdit />} path='AssignEdit' />
                    <Route element={<AssignList />} path='AssignList' />
                    <Route element={<TAmanage />} path='TAmanage' />
                </Route>
                <Route element={<Home />} path='/' />
                <Route element={<Logout />} path='Logout' />

                <Route element={<Class />} path='Class' />



                
                
                <Route element={<ClassCreate />} path='ClassCreate' />
                <Route element={<Lab />} path='Lab' />
                <Route element={<Sentin />} path='Sentin' />
                <Route element={<StudentList />} path='StudentList' />
            </Route>
            <Route element={<PublicRoutes />}>
                <Route element={<Login />} path='/login' />
                <Route element={<Callback />} path='/callback' />
            </Route>
            <Route element={<Test />} path='/Test' />
            <Route element={<ErrorComp />} path='*' />
        </Routes>
    )
}

export default App