import React, { useRef, useState, useContext } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../Provider/AuthProvider";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase/firebase-init";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Helmet } from "react-helmet-async";

const SignIn = () => {
  const [error, setError] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const emailRef = useRef();
  const { signIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    signIn(email, password)
      .then(() => {
        toast.success("User Login Successful!");
        navigate("/");
      })
      .catch((error) => {
        setError(error.code);
      });
  };

  const handleForgetPass = async () => {
    // Get email from ref
    const email = emailRef.current.value;
    
    if (!email) {
      setErrorMsg("Please enter your email address first.");
      toast.error("Please enter your email address first.");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("Password reset email sent. Check your inbox.");
      setErrorMsg("");
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        setErrorMsg("No account found with this email.");
        toast.error("No account found with this email.");
      } else if (error.code === "auth/invalid-email") {
        setErrorMsg("Invalid email address.");
        toast.error("Invalid email address.");
      } else {
        setErrorMsg(error.message);
        toast.error("Failed to send reset email. Try again.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center px-4">
      <Helmet>
        <title>Lost-Found | Login</title>
      </Helmet>

      <div className="bg-base-100 text-base-content border border-base-300 shadow-xl rounded-xl p-8 w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center mb-6">
          Login to Your Account
        </h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="email" className="block mb-1 font-semibold">
              Email
            </label>
            <input
              id="email"
              name="email"
              ref={emailRef}
              type="email"
              placeholder="Email"
              className="input input-bordered w-full bg-base-100"
              required
              autoComplete="email"
            />
          </div>

          <div>
            <label htmlFor="password" className="block mb-1 font-semibold">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              className="input input-bordered w-full bg-base-100"
              required
              autoComplete="current-password"
            />
          </div>

          <div className="text-sm text-right">
            <button
              type="button"
              onClick={handleForgetPass}
              className="text-primary hover:underline focus:outline-none cursor-pointer"
            >
              Forgot password?
            </button>
          </div>

          {(error || errorMsg) && (
            <p className="text-error text-xs text-center">
              {error || errorMsg}
            </p>
          )}

          <button type="submit" className="btn btn-primary w-full">
            Login
          </button>

          <p className="text-center text-sm mt-4">
            Don't have an account?{" "}
            <Link to="/sign-up" className="text-secondary hover:underline">
              Register
            </Link>
          </p>
        </form>
      </div>

      <ToastContainer autoClose={3000} position="top-right" theme="colored" />
    </div>
  );
};

export default SignIn;