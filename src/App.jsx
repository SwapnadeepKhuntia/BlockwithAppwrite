import { useEffect, useState } from 'react';
import './App.css'
import { useDispatch } from 'react-redux';
import authService from './Appwrite/auth.js';
import {login,logout} from './redux/Slice/authslice.js';
function App() {

  const [isloading,setisloading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
     authService.getCurrentUser()
     .then((userData) => {
       if(userData) {
         dispatch(login(userData)); //Dispatch the login action with the user data
       }
       else{
          dispatch(logout()); //Dispatch the logout action if the user is not logged in
       }
     })
     .finally(() => {
        setisloading(false);
     });
  },[]);

  return !isloading ? (
     <div>
      <h1>Wellcom asas</h1>
     </div>
  ) : (
    <div className="loading">Loading...</div>
  );
}

export default App
