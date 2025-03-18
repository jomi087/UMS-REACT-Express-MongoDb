import { useDispatch } from "react-redux";
import { logoutUser } from "../store/userSlice";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { logoutApi } from "../utils/constant";

const LogoutButton = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = async() => {
        try {
            const res = await axios.post(logoutApi, {},{
                withCredentials : true
            })
    
            if (res.status === 200) {
            
                toast.success(res.data.message);
                dispatch(logoutUser());
                
                setTimeout(() => {
                    navigate("/");
                }, 1000);
            }
        } catch (error) {
            toast.error(error?.response?.data?.message ||"Logout failed" )
        }
    }
    return (
        <button
            onClick={handleLogout}
            className="border-1 rounded-lg px-3 py-1.5 text-2xl  bg-blue-500 text-white font-semibold"
        >
            Logout
        </button>
    )
};

export default LogoutButton;