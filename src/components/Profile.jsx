import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AppContext } from "../Context/AppContext";
import { toast } from "react-toastify";

const ProfilePage = () => {
  const { userData, setUserData, isLoggedIn, loading } = useContext(AppContext);

  // State to handle the editing mode
  const [isEditing, setIsEditing] = useState(false);
  const userId = localStorage.getItem("userId"); // Get userId from localStorage

  // State for profile data
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    address: "",
    country: "",
    profileImage: null, // Default value for the photo
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("authToken"); // Or wherever you store the token
        const response = await axios.get("http://localhost:4000/api/user/data", {
          headers: {
            Authorization: `Bearer ${token}`, // Send token with the request
          },
        });
        console.log(response)
  
        if (response.data.success) {
          setProfile(response.data.userData); // Assuming you set profile state like in your profile page
        } else {
          console.error("User data not found");
        }
      } catch (error) {
        console.error("Error fetching user data", error);
      }
    };
  
    fetchUserData();
  }, []); // Fetch user data on component mount
  

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle file upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile((prevState) => ({
          ...prevState,
          profileImage: reader.result, // Store the uploaded image as base64
        }));
      };
      reader.readAsDataURL(file); // Read the file and convert to base64
    }
  };

  const handleSave = async () => {
    const formData = new FormData();
    formData.append("name", profile.name);
    formData.append("email", profile.email);
    formData.append("address", profile.address);
    formData.append("country", profile.country);

    // Append the profile image if available
    if (profile.profileImage) {
        formData.append("profileImage", profile.profileImage); // Ensure profileImage is the file object
    }

    try {
        const response = await axios.put("http://localhost:4000/api/user/profile", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        setIsEditing(false);
        toast.success("Profile updated successfully!");
    } catch (error) {
        console.error("Error saving profile", error);
        toast.error("There was an error updating your profile.");
    }
};

  

  return (
    <div className="max-w-4xl mx-auto p-6 mt-20 bg-white rounded-lg shadow-md">
      <h1 className="text-4xl font-semibold text-gray-800 mb-6 text-center">Profile</h1>

      {/* Profile Image and Edit Button */}
      <div className="flex justify-center items-center mb-8">
        <div className="relative">
          {/* Display profile photo or default placeholder */}
          <img
            src={profile.profileImage || "https://via.placeholder.com/100"}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover border-4 border-gray-300"
          />
          <button
            onClick={() => setIsEditing(true)}
            className="absolute bottom-0 right-0 bg-black text-white rounded-full p-2"
          >
            Edit
          </button>
          {isEditing && (
            <input
              type="file"
              onChange={handleFileChange}
              className="absolute bottom-0 left-0 bg-transparent text-black"
            />
          )}
        </div>
      </div>

      {/* Personal Information Section */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Personal Information</h2>

        <div className="space-y-6">
          {/* Username */}
          <div>
            <label className="text-lg font-semibold text-gray-700">Username</label>
            {isEditing ? (
              <input
                type="text"
                name="name"
                value={profile.name}
                onChange={handleInputChange}
                className="w-full mt-2 p-2 border rounded-md"
              />
            ) : (
              <p className="text-lg text-gray-600">{profile.name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="text-lg font-semibold text-gray-700">Email Address</label>
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleInputChange}
                className="w-full mt-2 p-2 border rounded-md"
              />
            ) : (
              <p className="text-lg text-gray-600">{profile.email}</p>
            )}
          </div>

          {/* Address */}
          <div>
            <label className="text-lg font-semibold text-gray-700">Address</label>
            {isEditing ? (
              <input
                type="text"
                name="address"
                value={profile.address}
                onChange={handleInputChange}
                className="w-full mt-2 p-2 border rounded-md"
              />
            ) : (
              <p className="text-lg text-gray-600">{profile.address}</p>
            )}
          </div>

          {/* Country */}
          <div>
            <label className="text-lg font-semibold text-gray-700">Country</label>
            {isEditing ? (
              <select
                name="country"
                value={profile.country}
                onChange={handleInputChange}
                className="w-full mt-2 p-2 border rounded-md"
              >
                <option>United States</option>
                <option>Canada</option>
                <option>India</option>
                <option>United Kingdom</option>
              </select>
            ) : (
              <p className="text-lg text-gray-600">{profile.country}</p>
            )}
          </div>
        </div>

        {/* Save/Edit Button */}
        <div className="flex justify-between mt-8">
          {isEditing ? (
            <button
              onClick={handleSave}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
            >
              Save
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="px-6 py-2 bg-black text-white rounded-md hover:bg-gray-700 transition duration-200"
            >
              Edit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
