import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../Appwrite/auth.js'
import {logout} from '../../redux/Slice/authslice.js'
function LogoutBtn() {
    const dispatch = useDispatch();
    
    const logoutHandler = async () => {
        const logoutservice = await authService.logout();
        if (logoutservice) {
            dispatch(logout()); // Dispatch the logout action
            console.log("Logout successful");
        }
    }

  return (
     <button
     className='inline-block px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600'
      onClick={logoutHandler}>Logout</button>
  )
}


export default LogoutBtn
