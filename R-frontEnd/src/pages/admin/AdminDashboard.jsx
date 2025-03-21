import React from 'react'
import Profile from '../../components/Profile'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faUserTie } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

const AdminDashboard = () => {
  return (
    <div className="grid sm:grid-cols-12  gap-2 m-3 mr-3 min-h-screen  ">
      <div className="sm:col-span-3  bg-white shadow-lg shadow-black rounded-lg  h-screen">
        <h1 className="m-2 text-4xl font-bold">
          <span
            className="text-transparent  bg-clip-text bg-gradient-to-r from-purple-500 to-blue-500"
          >
            Profile
          </span>
        </h1>
        <Profile isUser={false} className="pt-12 text-center"/>
      </div>
      <div className="md:col-span-9 sm:col-span-9   shadow-2xl shadow-black rounded-md h-full bg-gradient-to-t from-purple-500 to-cyan-500 p-4">
        <h1 className="m-2 text-4xl font-bold">HOME</h1>
        <div className="grid lg:grid-cols-3  md:grid-cols-2 gap-8 m-5 ml-10 mr-10">
          <div
            className="bg-white p-4 shadow-2xl shadow-black rounded-lg text-center contain-content cursor-pointer"
          >
            <Link to='/dashboard/userInfo'>
              <p className="text-lg font-semibold">Users</p>
                <div className="">
                  <div className="text-8xl pt-5 pb-5"><FontAwesomeIcon icon={faUser} /></div>
                </div>
            </Link>
          </div>
          <div
            className="bg-white p-4 shadow-2xl shadow-black rounded-lg text-center cursor-pointer"
          >
            <p className="text-lg font-semibold">Admins</p>

            <div >
              <div className=" text-8xl pt-5 pb-5"><FontAwesomeIcon icon={faUserTie} /> </div>
            </div>
          </div>
          <div className="bg-white p-4 shadow-2xl shadow-black rounded-lg text-center">
            <p className="text-lg font-semibold mt-1 ">Create Tab</p>
            <div className="text-8xl hover:scale-125 cursor-pointer ">
              +
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard

