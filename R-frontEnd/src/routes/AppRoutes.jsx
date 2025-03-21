import { createBrowserRouter } from "react-router-dom";
import SignUp from '../pages/SignUp';
import SignIn from '../pages/user/SignIn';
import Home from "../pages/user/Home"
import ProtectedRoute from './ProtectedRoute'
import RestrictRoute from "./RestrictRoute";
import AdminSignIn from "../pages/admin/AdminSignIn";
import AdminDashboard from "../pages/admin/AdminDashboard";
import ManageUser from "../pages/admin/ManageUser";
import AddUser from "../pages/admin/addUser";
import EditUser from "../pages/admin/EditUser";
import AdminProtectedRoute from "./AdminProtectedRoute";
import AdminRestrictedRoute from "./AdminRestrictedRoute";


const router = createBrowserRouter([
    {
        path: '/',
        element: <RestrictRoute> <SignIn /></RestrictRoute>
    },
    {
        path: '/signup',
        element: <RestrictRoute><SignUp /></RestrictRoute>
    },
    {
        path: '/home',
        element: <ProtectedRoute><Home/></ProtectedRoute>
    },
    {
        path: '/admin',
        element :<AdminRestrictedRoute><AdminSignIn/></AdminRestrictedRoute> 
    },
    {
        path: '/dashboard',
        element : <AdminProtectedRoute><AdminDashboard/></AdminProtectedRoute>
    },
    {
        path: '/dashboard/userInfo',
        element :<AdminProtectedRoute><ManageUser/></AdminProtectedRoute> 
    },
    {
        path: '/dashboard/userInfo/addUser/:count',
        element: <AdminProtectedRoute><AddUser /></AdminProtectedRoute>
    },
    {
        path: '/dashboard/userInfo/editUser/:id',
        element : <AdminProtectedRoute><EditUser/></AdminProtectedRoute>
    }


])

export default router
