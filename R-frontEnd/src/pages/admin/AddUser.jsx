import React from 'react'
import {Link, useNavigate, useParams} from 'react-router-dom'
import AdminSideBar from '../../components/AdminSideBar'
import { useState } from 'react'
import { validateEmail, validateImage, validateName, validatePassword, validatePhone } from '../../utils/formValidation'
import { createUser } from '../../utils/constant'
import { toast } from 'react-toastify'

const AddUser = () => {
  const { count } = useParams()
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [profileImage, setProfileImage] = useState(null);

  const navigate = useNavigate()


  const handleFormSubmit = async (e) => {  
    e.preventDefault();
    if (loading) return; 

    const nameError = validateName(name);
    const phoneError = validatePhone(phone);
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    const imageError = validateImage(profileImage);

    if (nameError) return toast.error(nameError);
    if (phoneError) return toast.error(phoneError);
    if (emailError) return toast.error(emailError);
    if (passwordError) return toast.error(passwordError);
    if (imageError) return toast.error(imageError);

    const formData = new FormData()
    formData.append("name", name.trim());
    formData.append("phone", phone.trim());
    formData.append("email", email.trim());
    formData.append("password", password.trim());
    formData.append("image", profileImage);

    setLoading(true);
    try {
      const res = await fetch(createUser, {
        method: "POST",
        credentials: "include",
        body: formData 
      })
      const data = await res.json()
      console.log(data)
      if (res.ok) {
        toast.success(data.message || "Signup suceess");
        navigate("/dashboard/userInfo");
      } else {
        toast.error(data.message || "Signup failed");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);  // Stop loading
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-200">
      {/* Sidebar */}
      <AdminSideBar userCount={count} />

      {/* Main Content */}
      <div className="flex flex-1 justify-center items-center p-6">
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
          <h2 className="text-3xl font-bold text-center mb-6">Create-User</h2>

          <form onSubmit={handleFormSubmit} className="space-y-4">
            {/* Name Input */}
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

            {/* Password Input */}
            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
              <div className="bg-gray-800 px-4 py-2 text-white">Password</div>
              <input
                type="text"
                className="w-full p-2 text-gray-700 outline-none"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
              {loading ? "Creating ..." : "Create A/c"}
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

export default AddUser