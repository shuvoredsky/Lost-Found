import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase/firebase-init";
import { AuthContext } from "../Provider/AuthProvider";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FcGoogle } from "react-icons/fc";
import { Helmet } from "react-helmet-async";
import axios from "axios";

const SignUp = () => {
  const { createUser, setUser, updateUser } = useContext(AuthContext);
  const [nameError, setNameError] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        setUser(result.user);
        toast.success("Google Sign In Successful!");
        navigate("/");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  // Image change handler
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Upload image to ImgBB
  const uploadImageToImgBB = async (imageFile) => {
    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      const response = await axios.post(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
        formData
      );
      return response.data.data.display_url;
    } catch (error) {
      console.error("Image upload failed:", error);
      throw error;
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const password = form.password.value;

    if (name.length < 5) {
      setNameError("Name should be more than 5 characters");
      return;
    } else {
      setNameError("");
    }

    setUploading(true);

    try {
      let photoURL = "";

      // If user selected an image, upload it to ImgBB
      if (imageFile) {
        photoURL = await uploadImageToImgBB(imageFile);
      }

      // Create user in Firebase
      const currentUser = await createUser(email, password);
      const newUser = currentUser.user;

      if (newUser) {
        toast.success("Register Success!");
        e.target.reset();
        setImageFile(null);
        setImagePreview("");
      }

      // Update user profile with name and photo
      await updateUser({ displayName: name, photoURL: photoURL });
      setUser({ ...newUser, displayName: name, photoURL: photoURL });
      navigate("/sign-in");

    } catch (error) {
      toast.error(error.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center px-4 pb-20 lg:pt-5">
      <Helmet>
        <title>Lost-Found | Register</title>
      </Helmet>
      <ToastContainer />
      <div className="bg-base-100 border border-base-300 shadow-xl rounded-2xl p-8 w-full max-w-sm text-base-content">
        <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
        <form onSubmit={handleRegister} className="space-y-4" noValidate>
          <div>
            <label htmlFor="name" className="block mb-1 font-semibold">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Full Name"
              className="input input-bordered w-full"
              required
              minLength={5}
            />
            {nameError && (
              <p className="text-xs text-error mt-1">{nameError}</p>
            )}
          </div>

          <div>
            <label htmlFor="photo" className="block mb-1 font-semibold">
              Profile Photo
            </label>
            <input
              id="photo"
              name="photo"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="file-input file-input-bordered w-full"
            />
            
            {imagePreview && (
              <div className="mt-3 flex justify-center">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-24 h-24 object-cover rounded-full border-2 border-primary"
                />
              </div>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block mb-1 font-semibold">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Email"
              className="input input-bordered w-full"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block mb-1 font-semibold">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPass ? "text" : "password"}
                placeholder="Password"
                className="input input-bordered w-full pr-10"
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                title="At least 8 characters, with uppercase, lowercase, and number"
                required
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-3 text-gray-500"
                aria-label={showPass ? "Hide password" : "Show password"}
              >
                {showPass ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <button 
            type="submit" 
            className="btn btn-primary w-full"
            disabled={uploading}
          >
            {uploading ? "Registering..." : "Register"}
          </button>

          <button
            type="button"
            className="btn btn-outline w-full flex items-center justify-center gap-2"
            onClick={handleGoogleSignIn}
            disabled={uploading}
          >
            <FcGoogle size={24} /> Sign In with Google
          </button>

          <p className="text-center text-sm mt-4">
            Already have an account?{" "}
            <Link to="/sign-in" className="link text-primary">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;