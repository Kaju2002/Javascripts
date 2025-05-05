import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {




const [userData, setUserData] = useState(false);
const [isLoggedIn, setIsLoggedIn] = useState(false);
const [loading, setLoading] = useState(true);

axios.defaults.withCredentials = true;

const getUserData = async()=>{
  try {
    const {data} = await axios.get('http://localhost:4000/api/user/data');
    if (data.success) {
      setUserData(data.userData);
      setIsLoggedIn(true); // ✅ Add this line
    } else {
      setIsLoggedIn(false);
      toast.error(data.message);
    }
  } catch (error) {
    if (error.response?.status !== 401) {
      toast.error(error.response?.data?.message || error.message);
    }
    setIsLoggedIn(false)
    }finally {
      setLoading(false); // ✅ Mark loading as finished
    }
}

useEffect(() => {
  getUserData(); // Run only once on page load
}, []);

const value ={
  userData, setUserData,
  isLoggedIn, setIsLoggedIn,
  getUserData,loading 
}

  return (
<UserContext.Provider value={value}>
{children}
    </UserContext.Provider>
  );
};
