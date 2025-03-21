import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../store/userSlice'
import adminReducer from '../store/adminSlice'

console.log("adminReducer",adminReducer)

const appStore = configureStore({  //create a store
    reducer: { //! reducer => The store expects a single reducer function (which can be an object of multiple slices).
        users: userReducer,
        admin: adminReducer
    }
})

export default appStore