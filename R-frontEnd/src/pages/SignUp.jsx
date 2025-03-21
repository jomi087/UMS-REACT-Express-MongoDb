import React, { useState } from "react"
import { toast } from 'react-toastify'
import {Link, useNavigate} from 'react-router-dom'

import { validateEmail, validateImage, validateName, validatePassword, validatePhone } from "../utils/formValidation"
import { signupApi } from "../utils/constant"
import { useDispatch } from "react-redux"
import { addUser } from "../store/userSlice"


const SignUp = () => {
  const [loading, setLoading] = useState(false);

  const [name,setName] = useState("")
  const [phone,setPhone] = useState("")
  const [email,setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [profileImage, setProfileImage] = useState(null);

  const navigate = useNavigate()
  const dispatch = useDispatch()


  const handleFormSubmit =async(e) => {  // for this scinreo useRef was better 
    e.preventDefault();
    if (loading) return;  // Prevent multiple clicks

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

    const formData = new FormData()  //! *ReadMe
    formData.append("name", name.trim());  
    formData.append("phone", phone.trim());
    formData.append("email", email.trim());
    formData.append("password", password.trim());
    formData.append("image", profileImage);


    setLoading(true);
    try {
      const res = await fetch(signupApi, {
        method: "POST",
        credentials: "include", //! *ReadMe 
        //header:{'Content-Type:' 'multipart/form-data',} is not required cz fromData atuomaticaly dose it 
        body: formData  //JSON.stringify() is useful when sending text-based data (like emails, passwords, and names.) But this method does not support file uploads (like images), However we can use FormData for sending text (even if there are no files.) but that will be overkill instead send the data as JSON.
      })
      const data = await res.json()
      if (res.ok) {
        toast.success(data.message || "Signup suceess");
        dispatch(addUser(data))

        setTimeout(() => {
          navigate("/home");
        }, 1000);

      } else {
        toast.error(data.message || "Signup failed" );
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup failed");
    }finally {
      setLoading(false);  // Stop loading
    }
  }


  return (
    <div className="flex justify-center items-center min-h-screen px-4 bg-zinc-200 overflow-hidden ">
      <div className="bg-gradient-to-b  p-7 rounded-lg shadow-2xl shadow-gray-950 rounded-tl-4xl rounded-br-4xl  w-full  max-w-md  bg-zinc-100 overflow-hidden ">
        <h2 className="text-4xl font-bold  mb-6 text-center">Sign-up</h2>
        <form onSubmit={handleFormSubmit} >
          <label htmlFor="name">
            <div className="flex items-center border-2 border-gray-300 rounded overflow-hidden mb-6 ">
              <div className="bg-gray-800 px-3 py-2 text-white rounded-l-md">
                Name
              </div>
              <input
                type="text"
                id="name"
                autoFocus  
                className="w-full p-2 text-gray-700 outline-none"
                placeholder="Enter your full Name"
                value={name}
                onChange={(e) => { setName(e.target.value)  }}
              />
            </div>
          </label>

          <label htmlFor="phone">
            <div className="flex items-center border-2 border-gray-300 rounded overflow-hidden mb-6 ">
              <div className="bg-gray-800 px-3 py-2 text-white rounded-l-md">
                Phone 
              </div>
            <input
              type="text"
              id="phone"
              className="w-full p-2 text-gray-700 outline-none"
              placeholder="Enter your phone number"
              value={phone}
              onChange={(e)=>{setPhone(e.target.value)}}
            />
            </div>
          </label>

          <label htmlFor="email">
            <div className="flex items-center border-2 border-gray-300 rounded overflow-hidden mb-6 ">
              <div className="bg-gray-800 px-3 py-2 text-white rounded-l-md whitespace-nowrap">
                E-Mail
              </div>
              <input
                type="email"
                id="email"
                className="w-full p-2 text-gray-700 outline-none"
                placeholder="Enter your email"
                value={email}
                onChange={(e)=>{setEmail(e.target.value)}}
              />
            </div>
          </label>

          <label htmlFor="password">
            <div className="flex items-center border-2 border-gray-300 rounded overflow-hidden mb-6 ">
              <div className="bg-gray-800 px-3 py-2 text-white rounded-l-md">
                Password 
              </div>
              <input
                type="text"
                id="password"
                className="w-full p-2 text-gray-700 outline-none"
                placeholder="Enter your password"
                value={password}
                onChange={(e)=>{setPassword(e.target.value)}}
              />
            </div>
          </label>

          <label htmlFor="image">
            <div className="flex items-center border-2 border-gray-300 rounded overflow-hidden mb-6 ">
              <input
                type="file"
                id="image"
                className="w-full p-2 text-gray-700 outline-none"
                onChange={(e)=>{setProfileImage(e.target.files[0])}}
              />
              <div className="bg-gray-800 px-3 py-2 text-white rounded-l-md whitespace-nowrap">
                Upload
              </div>
            </div>
          </label>

          <button
            type="submit"
            className={`text-center bg-blue-500 w-full p-2 mt-2 rounded-full font-semibold  ${loading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
            disabled={loading}
          >
            {loading ? "Signing up..." : "Sign up"}
          </button>

        </form>
        <p className="text-center mt-7 mb-4">
          Already have an account?
          <Link to ='/' className="text-blue-600 underline cursor-pointer">Sign-in</Link>
        </p>
      </div>
      
    </div>

  )
}

export default SignUp


