import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { UserContext } from "../Context/UserContext";

const Signup = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const { setIsLoggedIn,getUserData,API_BASE_URL } = useContext(UserContext);
  

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      axios.defaults.withCredentials = true;

      const { data } = await axios.post(
        `${API_BASE_URL}/api/auth/register`,
        {
          name,
          email,
          password,
          rememberMe,
        }
      );
  
      if (data.success) {
        // Successfully registered
       setIsLoggedIn(true);
        getUserData(); // optional if you fetch user data
        navigate("/sign-in");
        toast.success("Registration successful!");
        
        setName('');
        setEmail('');
        setPassword('');
        setRememberMe(false);
      } else {
        toast.error(data.message); // Show error if registration failed
      }
    } catch (error) {
      // Check if the error is from the response
      const errorMessage = error.response?.data?.message || 'An error occurred';
      toast.error(errorMessage);
    }
  }
  

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="w-full max-w-md bg-white p-10 shadow-xl rounded-xl">
        <h2 className="text-2xl font-bold text-center mb-2">Welcome Back</h2>
        <p className="text-center text-gray-500 mb-6">
          Sign in to your account
        </p>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium">Username</label>
            <input
              type="text"
              placeholder="Enter your name.."
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full mt-1 border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email.."
              className="w-full mt-1 border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Password</label>
            <div className="relative">
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full mt-1 border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-black"
              />
              <span className="absolute right-3 top-3 text-gray-400 cursor-pointer">
                👁
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm text-gray-600">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="mr-2"
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              Remember me
            </label>
            <a href="#" className="hover:underline">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition duration-200"
          >
            Sign In
          </button>
        </form>

        <p className="text-sm text-center text-gray-600 mt-6">
          Don’t have an account?{" "}
          <a href="/sign-in" className="text-black font-medium hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;

