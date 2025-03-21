import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { backendImageUrl, deleteUser, usersInfo } from '../../utils/constant'
import { toast } from 'react-toastify'
import AdminSideBar from '../../components/AdminSideBar'


const ManageUser = () => {
  
  const [users, setUsers] = useState([])
  const [search, setSearch] = useState("")
  
  const fetchUser = async () => {
    try {
      const res = await axios.get(usersInfo, {
        withCredentials: true
      })
  
      if (res.status === 200) {
        setUsers(res?.data?.users)
      }
  
    } catch (error) {
      toast.error("fetchUser failed")
    }
    
  }

  useEffect(() => {
    fetchUser()
  }, [])
  
  const displayedUsers = search.trim()
  ? users.filter((user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase()) ||
      user.phone.includes(search.trim())
    )
  : users;

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
  
    try {
      const res = await axios.delete(`${deleteUser}${id}`, {
        withCredentials: true
      });
  
      if (res.status === 200) {
        toast.success("User deleted successfully");
        setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
      }
    } catch (error) {
      
      toast.error("Failed to delete user");
    }
  };
  

  return (
      <div className="flex bg-gradient-to-br from-gray-500 to-gray-900">
      {/* Sidebar */}
          <AdminSideBar userCount={users.length}/>
      {/* Main Content */}
        <div className="w-3/4 p-6">
          {/* Search & Add User */}
          <div className="flex items-center space-x-2 mb-6">
            <input
              type="text"
              placeholder="Search users..."
              className="border p-2 rounded flex-grow text-white font-semibold text-lg"
              value={search}
              onChange={(e)=>setSearch(e.target.value)}
            />
            <Link to={`/dashboard/userInfo/addUser/${users.length}`}>
              <button className="bg-green-500 text-white px-4 py-2 rounded">Add New</button>
            </Link>
          </div>

        {/* User Table */}
          { displayedUsers.length > 0 ? (
            <table className="w-full border-collapse border-2 border-transparent">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-transparent p-2">Profile Image</th>
                  <th className="border border-transparent p-2">Name</th>
                  <th className="border border-transparent p-2">Email</th>
                  <th className="border border-transparent p-2">Phone</th>
                  <th className="border border-transparent p-2">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-zinc-300">
                {displayedUsers.map((user) => (
                  <tr key={user._id} className="text-center border">
                    <td className="border border-transparent p-2 ">
                      <img src={`${backendImageUrl}${user.image}`} alt="Profile" className="w-20 h-20 mx-auto rounded-full" />
                    </td>
                    <td className="border border-transparent p-2">{user.name}</td>
                    <td className="border  border-transparent p-2">{user.email}</td>
                    <td className="border border-transparent p-2">{user.phone}</td>
                    <td className="border border-transparent p-2">
                      <Link to={`/dashboard/userInfo/editUser/${user._id}/`}>
                        <button className="bg-yellow-500 text-white px-3 py-1 rounded mr-2">Edit</button>
                      </Link>
                      <button
                        className="bg-red-500 text-white px-3 py-1 rounded"
                        onClick={()=> handleDelete(user._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            ):(
              <div className="h-[90%] text-center mt-50  text-2xl font-bold font-serif italic">
                 {search.trim() ? "No matching users found." : "No users available."}
              </div>
            )
          }
        </div>
    </div>
  )
}

export default ManageUser


  