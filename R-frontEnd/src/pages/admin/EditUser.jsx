import { useEffect, useState } from 'react'
import AdminSideBar from '../../components/AdminSideBar'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { backendImageUrl, updateUser } from '../../utils/constant'
import axios from 'axios'
import { validateEmail, validateImage, validateName, validatePhone } from '../../utils/formValidation'
import { toast } from 'react-toastify'

const EditUser = () => {
  const { id } = useParams()
  const [loading, setLoading] = useState(false)
  
    const [name,setName] = useState("")
    const [phone,setPhone] = useState("")
    const [email,setEmail] = useState("")
    const [profileImage, setProfileImage] = useState("");  // to store new image for update
    const [displayImage, setDisplayImage] = useState("");  //to display image in ui

    const navigate = useNavigate()
    

  useEffect(() => {
    const fetchUser = async () => {
      console.log("entered")
      try {
        const res = await axios.get(`${updateUser}${id}`, { withCredentials: true });
        console.log("res",res)
        if (res.status === 200) { 
          setName(res.data.user.name)
          setPhone(res.data.user.phone)
          setEmail(res.data.user.email)
          setDisplayImage(res.data.user.image)
        }
      } catch (error) {
        console.log(error)
        toast.error("Failed to fetch user details");
      }
    };
    fetchUser()
  },[id])
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    
    const nameError = validateName(name);
    if (nameError) return toast.error(nameError);

    const phoneError = validatePhone(phone);
    if (phoneError) return toast.error(phoneError);


    const emailError = validateEmail(email);
    if (emailError) return toast.error(emailError);

    let imageError = null;
    if (profileImage) {
        imageError = validateImage(profileImage);
    }
    if (imageError) return toast.error(imageError);
    setLoading(true)

    const formData = new FormData();
    formData.append("name", name);
    formData.append("phone", phone);
    formData.append("email", email);
    if (profileImage) {
      formData.append("image", profileImage);
    }

    try {
      const res = await axios.put(`${updateUser}${id}`, formData, {
        withCredentials: true,
      });

      if (res.status === 200) {
        toast.success("User updated successfully");
        navigate("/dashboard/userInfo");
      }
    } catch (error) {
      toast.error("Update failed");
    }finally {
      setLoading(false)
    }
  };


  return (
    <div className="flex min-h-screen bg-gray-200">
      {/* Sidebar */}
      <AdminSideBar />

      {/* Main Content */}
      <div className="flex flex-1 justify-center items-center p-6">
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
          <h2 className="text-3xl font-bold text-center mb-6 underline font-serif">Edit-User</h2>
          <img src={`${backendImageUrl}${displayImage}`} alt="profile pic" className="w-40 h-40 rounded-full relative left-3 mb-4 mx-auto object-cover"/>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
              <div className="bg-gray-800 px-4 py-2 text-white">Name</div>
              <input
                type="text"
                className="w-full p-2 text-gray-700 outline-none"
                placeholder="Enter your full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoFocus
              />
            </div>

            {/* Phone Input */}
            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
              <div className="bg-gray-800 px-4 py-2 text-white">Phone</div>
              <input
                type="text"
                className="w-full p-2 text-gray-700 outline-none"
                placeholder="Enter your phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            {/* Email Input */}
            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
              <div className="bg-gray-800 px-4 py-2 text-white whitespace-nowrap">E-Mail</div>
              <input
                type="email"
                className="w-full p-2 text-gray-700 outline-none"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>


            {/* Image Upload */}
            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
              <input
                type="file"
                className="w-full p-2 text-gray-700 outline-none"
                onChange={(e) => setProfileImage(e.target.files[0])}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className={`w-full bg-blue-500 text-white py-2 rounded-full font-semibold transition ${loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
                }`}
              disabled={loading}
            >
              {loading ? "Updating ..." : "Update"}
            </button>
          </form>

          {/* Sign-in Link */}
        
          <p className="text-center mt-5">
            <Link to="/dashboard/userInfo/" className="text-blue-600 underline ml-1">
            Go Back
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default EditUser