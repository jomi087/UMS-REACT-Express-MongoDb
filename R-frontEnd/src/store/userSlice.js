import { createSlice ,current} from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "users",
    initialState: {
        users : JSON.parse(localStorage.getItem("key")) || null  // Load from localStorage on page load
    },
    reducers: {  //!reducer"s" => reducers is an object that holds multiple reducer functions (addUser and logoutUser)
        addUser: (state, action) => {
            // console.log("current(state)", current(state))
            // console.log("action", action)
            state.users = action.payload;  // Store user data in Redux state // also here you may think that we are mutating a state but no, reduxtoolkit is making easy for us by  abstraction were reduxtoolkit inside is creating a new copy, 
            localStorage.setItem("key", JSON.stringify(action.payload));  // Save to localStorage
        },
        logoutUser: (state) => {
            state.users = null; 
            localStorage.removeItem("key");  // Remove from localStorage
        }
    }
});

export const { addUser, logoutUser } = userSlice.actions; 
export default userSlice.reducer; //! reducer => (is one single reducer)  createSlice automatically combines all individual reducers into one main reducer function.This combined function is stored in userSlice.reducer (singular).

//?To store data, 
//          use localStorage.setItem(key, value)   .If storing objects or arrays, convert them to JSON first
//?To retrieve data,
//           use localStorage.getItem(key)        .If the data is an object or array, convert it back using JSON.parse():
//?To remove a specific item,
//           use localStorage.removeItem(key)     .To remove everything stored in LocalStorage, use localStorage.clear().