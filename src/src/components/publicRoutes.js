import { Outlet, Navigate } from 'react-router-dom'
import { useAuth } from './src/components/useAuth'

function PublicRoutes() {
    const token = useAuth()
    return token ? <Navigate to='/' /> : <Outlet />
}

export default PublicRoutes