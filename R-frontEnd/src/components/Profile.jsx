import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'

import { validateEmail, validateImage, validateName, validatePhone } from '../utils/formValidation'
import UserLogout from './Logout'
import AdminLogout from './AdminLogout'
import { adminProfile, backendImageUrl, userProfile } from '../utils/constant'
import { toast } from 'react-toastify'
import axios from 'axios'
import { addUser } from '../store/userSlice'
import { addAdmin } from '../store/adminSlice'



const Profile = ({ isUser, className }) => {
    console.log("isUser",isUser)
    const [editMode, setEditMode] = useState(false)
    const [loading, setLoading] = useState(false)



    const person = useSelector((state) => (isUser ? state.users.users : state.admin.admin));
    const profile = isUser ? userProfile : adminProfile;
    const addPerson = isUser ? addUser : addAdmin;

    console.log("person",person);
    

    const [name,setName] = useState(person.name)
    const [phone,setPhone] = useState(person.phone)
    const [email,setEmail] = useState(person.email)
    const [profileImage, setProfileImage] = useState(null);

    const dispatch = useDispatch()

    
    async function fetchData() {
        try {
            console.log(profile)
            const res = await axios.get(profile, { withCredentials: true })
            if (res.status === 200) {
                dispatch(addPerson(res.data))
            }
        } catch (error) {
            toast.error("Failed to fetch data")
        }
    }
    
    useEffect(() => {
        fetchData()
    },[])

    const handleEdittoggle = (val) => {
        setEditMode(!editMode)
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault()
        if (loading) return;

        if (name === person.name && phone === person.phone && email === person.email && !profileImage) {
            toast.info("No changes detected");
            return;
        }

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

        try {
            const formData = new FormData()
            formData.append("name", name.trim())
            formData.append("phone", phone.trim())
            formData.append("email", email.trim())
            if (profileImage) {
                formData.append("image",profileImage)
            }
            const res = await axios.put(profile, formData , {
                withCredentials : true
            })

            if (res.status === 200) {
                dispatch(addPerson(res.data)); 
                toast.success("Profile updated successfully!");
            }
        } catch (error) {
            console.log(error)
            toast.error( error.response?.data?.message || error.message || "update-failed");
        } finally {
            setLoading(false)
            handleEdittoggle()
        }
    }

    return person  ? ( 
        <>
            <div
                className={ isUser ? "bg-white shadow-2xl w-100 h-80 shadow-black rounded-lg p-6 text-center " : className}
                style={{
                    display: editMode ? "none" : "block"
                }}
            >
                <div className="flex">
                    {person.image && (
                        <img src={`${backendImageUrl}${person.image}`} alt="profile pic" className="w-40 h-40 rounded-full relative left-3 mb-4 mx-auto object-cover overflow-hidden"/>
                    )}
                    <FontAwesomeIcon icon={faPenToSquare} className="relative right-5 top-2 cursor-pointer" onClick={handleEdittoggle}/>
                </div>
                <h2 className="text-xl font-semibold text-gray-800 mb-4 ">{person.name.toUpperCase()}</h2>
                <p className="text-gray-600 mb-2  ">{person.email}</p> 
                <p className="text-gray-600 mb-8 ">{person.phone}</p>
                <div className="text-center">
                    { isUser ? <UserLogout /> : <AdminLogout/>  }
                </div> 
            </div>
            {/* edit mode */}
            <div className={editMode ? "bg-white shadow-lg shadow-black rounded-lg p-6 h-full text-center" : "hidden"}>
                <p
                    className="w-full text-end font-bold cursor-pointer"
                    onClick = {handleEdittoggle}
                >
                    X
                </p>
                <img src={`${backendImageUrl}${person.image}`} alt="profile pic" className="w-40 h-40 rounded-full relative left-3 mb-4 mx-auto object-cover"/>
                <form onSubmit={handleFormSubmit} className="">
                    <div>
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
                            {loading ? "Saving..." : "Save"}
                        </button>
                    </div>
                    
                </form>
            </div>
        </>
    ) : (
        <p className="text-center text-gray-500">No data available</p>
    );
}
export default Profile