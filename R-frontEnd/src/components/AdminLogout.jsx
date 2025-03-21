import { useDispatch } from "react-redux";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { logoutApi } from "../utils/constant";
import { logoutAdmin } from "../store/adminSlice";

const AdminLogout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = async() => {
        try {
            const res = await axios.post(logoutApi, {},{
                withCredentials : true
            })
            
            if (res.status === 200) {
                toast.success(res.data.message);
                dispatch(logoutAdmin());
                navigate("/")
            }
        } catch (error) {
            toast.error(error?.response?.data?.message ||"Logout failed" )
        }
    }
    return (
        <button
            onClick={handleLogout}
            className="border-1 rounded-lg px-3 py-1.5 text-2xl  bg-blue-500 text-white font-semibold cursor-pointer "
        >
            Logout
        </button>
    )
};

export default AdminLogout;