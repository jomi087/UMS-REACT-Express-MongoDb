import { createBrowserRouter } from "react-router-dom";
import SignUp from '../pages/SignUp';
import SignIn from '../pages/SignIn';
import Home from "../pages/Home";
import ProtectedRoute from './ProtectedRoute'
import RestrictRoute from "./RestrictRoute";
import AdminSignIn from "../pages/admin/AdminSignIn";
import AdminDashboard from "../pages/admin/AdminDashboard";


const router = createBrowserRouter([
    {
        path: '/',
        element: <RestrictRoute> <SignIn /></RestrictRoute>
    },
    {
        path: '/signup',
        element: <RestrictRoute> <SignUp /></RestrictRoute>
    },
    {
        path: '/home',
        element:  <ProtectedRoute> <Home/></ProtectedRoute>
    },
    {
        path: '/admin',
        element : <AdminSignIn/>
    },
    {
        path: '/dashboard',
        element : <AdminDashboard/>
    }

])

export default router
