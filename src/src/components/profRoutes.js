import { Outlet, Navigate } from 'react-router-dom'
import { usePerm } from './usePerm'

function ProfRoutes() {
    return usePerm() ? <Outlet /> : <Navigate to='/' />
}

export default ProfRoutes