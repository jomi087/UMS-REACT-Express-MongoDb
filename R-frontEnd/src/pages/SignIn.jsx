import React, { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios';  

import { validateEmail, validatePassword } from '../utils/formValidation';
import { signinApi } from '../utils/constant'
import { useDispatch} from 'react-redux';
import { addUser } from '../store/userSlice';


const SignIn = () => {
  const [loading, setLoading] = useState(false);

  const emailRef = useRef(null)
  const passwordRef = useRef(null)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    if (loading) return;  // Prevent multiple clicks

    const email = emailRef.current.value
    const password = passwordRef.current.value

    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    if (emailError) return toast.error(emailError);
    if (passwordError) return toast.error(passwordError);

    setLoading(true);
    
    try {
      const res = await axios.post(signinApi, {  //axios method
        email,
        password
      }, {
        withCredentials: true
      })

      if (res.status === 200) {

        toast.success(res.data.message||"Sign-in successful!");
        dispatch(addUser(res.data))//storing data in redux

        setTimeout(() => {
          navigate("/home");
        }, 1000);

      }

    } catch (error) {
      toast.error(error.response?.data?.message || "Sign-in failed");   //error.message typically contains a generic error like "Network Error" instead of the actual backend message.
      //In axios, the actual error message from the server is usually inside error.response.data.message.

    } finally { 
      setLoading(false)
    }
  }


  return (
    <div className="flex justify-center items-center min-h-screen px-4 bg-zinc-200 overflow-hidden ">
      <div className="bg-gradient-to-b  p-7 rounded-lg shadow-lg shadow-gray-950 rounded-tl-4xl rounded-br-4xl  w-full  max-w-md  bg-zinc-100 overflow-hidden ">
        <h2 className="text-4xl font-bold  mb-6 text-center">Sign-In</h2>
        <form onSubmit = {handleFormSubmit} >
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
                ref = {emailRef}
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
                ref ={passwordRef}
              />
            </div>
          </label>

          <button
            type="submit"
            className={`text-center bg-blue-500 w-full p-2 mt-2 rounded-full font-semibold  ${ loading ? "opacity-50 cursor-not-allowed" : "cursor-pointer" }`}
            disabled={loading}
          >
            {loading ? "signing in ..." : "sign - In"}
          </button>
        </form>
        <p className="text-center mt-7 mb-4 ">
          Dont have an account?
          <Link to='/signup' className="text-blue-600 underline cursor-pointer">Sign-up</Link>
        </p>
        <p className="text-center mt-7 ">
          <Link to='/admin' className="text-blue-900 text-center">Enjoy our App</Link>
        </p>
      </div>
      
    </div>
  )
}

export default SignIn