import { configureStore } from '@reduxjs/toolkit'
import  userReducer from '../store/userSlice'

const appStore = configureStore({  //create a store
    reducer: { //! reducer => The store expects a single reducer function (which can be an object of multiple slices).
        users : userReducer
    }
})

export default appStore