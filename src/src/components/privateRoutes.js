import { Outlet, Navigate } from 'react-router-dom'
import { useAuth } from './src/components/useAuth'

function PrivateRoutes() {
    const token = useAuth()
    return token ? <Outlet /> : <Navigate to='/login' />
}

export default PrivateRoutes