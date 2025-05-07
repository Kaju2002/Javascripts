import React, { useContext, useEffect, useState } from "react";
import { FaGoogle, FaFacebookF } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext";

// const clientId = '199057955312-4cvv1fd7vonckv916sv61cfq8oj01i5a.apps.googleusercontent.com'
// import { useEffect } from "react";
// import { gapi } from "gapi-script";
const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setIsLoggedIn, getUserData,API_BASE_URL } = useContext(UserContext);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      axios.defaults.withCredentials = true;

      const { data } = await axios.post(
        `${API_BASE_URL}/api/auth/login`,
        {
          email,
          password,
        }
      );
      console.log("Login response data:", data);

      if (data.success) {
        localStorage.setItem("userId", data.user.id); // ✅ Set userId from response
        setIsLoggedIn(true);
        getUserData();
        navigate("/");
        toast.success("Login Successful");
        setEmail("");
        setPassword("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="w-full max-w-md bg-white p-10 shadow-xl rounded-xl">
        <h2 className="text-2xl font-bold text-center mb-2">Welcome Back</h2>
        <p className="text-center text-gray-500 mb-6">
          Sign in to your account
        </p>

        <form className="space-y-4" onSubmit={handleLogin}>
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full mt-1 border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Password</label>
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full mt-1 border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-black"
              />
              <span className="absolute right-3 top-3 text-gray-400 cursor-pointer">
                👁
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm text-gray-600">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              Remember me
            </label>
            <a
              href="#"
              onClick={() => useNavigate("/")}
              className="hover:underline"
            >
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

        {/* Separator */}
        <div className="my-6 flex items-center">
          <div className="flex-grow h-px bg-gray-300"></div>
          <span className="mx-2 text-gray-400 text-sm">OR</span>
          <div className="flex-grow h-px bg-gray-300"></div>
        </div>

        <p className="text-sm text-center text-gray-600 mt-6">
          Don’t have an account?{" "}
          <a href="/sign-up" className="text-black font-medium hover:underline">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signin;
