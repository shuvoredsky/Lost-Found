import React, { useContext, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../Provider/AuthProvider";
import { toast } from "react-toastify";
import { FaMapMarkerAlt, FaUser, FaBars, FaTimes, FaSignInAlt, FaUserPlus } from "react-icons/fa";
import DarkModeToggle from "./DarkModeToggle";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogOut = () => {
    logOut()
      .then(() => {
        toast.success("Sign out successfully");
        setMobileMenuOpen(false);
      })
      .catch((error) => toast.error(error.message));
  };

  const navLinks = [
    ["Home", "/"],
    ["Lost & Found Items", "/allItems"],
    ["Add Item", "/add-lost-found"],
    ["Recovered Items", "/all-Recovered"],
  ];

  const activeClass = "border-b-2 border-primary text-primary font-semibold";
  const authBtnClass = "text-sm px-3 py-2 font-bold text-white bg-primary hover:bg-error/80 rounded transition";
  const outlineBtnClass = "text-sm px-3 py-2 font-bold text-primary border border-primary hover:bg-primary hover:text-white rounded transition cursor-pointer";

  const handleNavClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 shadow-md bg-base-100 text-base-content">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mobile Layout */}
        <div className="md:hidden flex justify-between items-center h-16">
          {/* Left: Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-2xl p-2 hover:bg-base-200 rounded-lg transition"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>

          {/* Center: Logo */}
          <div className="cursor-pointer" onClick={() => navigate("/")}>
            <span className="text-xl flex items-center font-bold text-primary">
              Lost <FaMapMarkerAlt className="ml-1 text-error" /> Found
            </span>
          </div>

          {/* Right: Auth Area */}
          {user ? (
            <div className="flex items-center space-x-2">
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt="User"
                  title={user.displayName || "User"}
                  className="w-8 h-8 rounded-full border-2 border-base-content object-cover"
                />
              ) : (
                <FaUser size={20} />
              )}
              <button
                onClick={handleLogOut}
                className="text-xs px-2 py-1 font-bold text-white bg-error hover:bg-error/80 rounded transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <button
                onClick={() => navigate("/sign-in")}
                className="p-2 text-primary hover:bg-primary/10 rounded-lg transition"
                aria-label="Sign In"
                title="Sign In"
              >
                <FaSignInAlt size={20} />
              </button>
              <button
                onClick={() => navigate("/sign-up")}
                className="p-2 text-primary hover:bg-primary/10 rounded-lg transition"
                aria-label="Sign Up"
                title="Sign Up"
              >
                <FaUserPlus size={20} />
              </button>
            </div>
          )}
        </div>

        {/* Desktop/Tablet Layout */}
        <div className="hidden md:flex justify-between items-center h-16">
          {/* Logo */}
          <div className="cursor-pointer" onClick={() => navigate("/")}>
            <span className="text-2xl flex items-center font-bold text-primary ml-2">
              Lost <FaMapMarkerAlt className="ml-1 text-error" /> Found
            </span>
          </div>

          {/* Desktop Nav */}
          <nav className="flex space-x-6 items-center">
            {navLinks.map(([label, path]) => (
              <NavLink
                key={label}
                to={path}
                className={({ isActive }) =>
                  `text-md px-2 py-1 transition ${
                    isActive
                      ? activeClass
                      : "hover:border-b-2 hover:border-secondary"
                  }`
                }
              >
                {label}
              </NavLink>
            ))}

            {user && (
              <NavLink
                to={`/myItems/${user.email}`}
                className={({ isActive }) =>
                  `text-md px-2 py-1 transition ${
                    isActive
                      ? activeClass
                      : "hover:border-b-2 hover:border-secondary"
                  }`
                }
              >
                My Items
              </NavLink>
            )}
          </nav>

          {/* Theme Toggle */}
          <DarkModeToggle />

          {/* Desktop Auth Area */}
          {user ? (
            <div className="flex items-center space-x-4">
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt="User"
                  title={user.displayName || "User"}
                  className="w-10 h-10 rounded-full border-2 border-base-content object-cover"
                />
              ) : (
                <FaUser size={28} />
              )}

              <button onClick={handleLogOut} className={authBtnClass}>
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-3">
              <button
                onClick={() => navigate("/sign-in")}
                className={authBtnClass}
              >
                Sign in
              </button>

              <button
                onClick={() => navigate("/sign-up")}
                className={outlineBtnClass}
              >
                Sign up
              </button>
            </div>
          )}
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-base-200 shadow-lg rounded-b-lg absolute left-0 right-0 top-16 mx-4 z-40">
            <nav className="flex flex-col p-4 space-y-2">
              {navLinks.map(([label, path]) => (
                <NavLink
                  key={label}
                  to={path}
                  onClick={handleNavClick}
                  className={({ isActive }) =>
                    `px-4 py-3 rounded-lg transition ${
                      isActive
                        ? "bg-primary text-white font-semibold"
                        : "hover:bg-base-300"
                    }`
                  }
                >
                  {label}
                </NavLink>
              ))}

              {user && (
                <NavLink
                  to={`/myItems/${user.email}`}
                  onClick={handleNavClick}
                  className={({ isActive }) =>
                    `px-4 py-3 rounded-lg transition ${
                      isActive
                        ? "bg-primary text-white font-semibold"
                        : "hover:bg-base-300"
                    }`
                  }
                >
                  My Items
                </NavLink>
              )}

              {/* Theme Toggle in Mobile Menu */}
              <div className="px-4 py-3 flex items-center justify-between border-t border-base-300 mt-2 pt-4">
                <span className="font-semibold">Dark Mode</span>
                <DarkModeToggle />
              </div>
            </nav>
          </div>
        )}
      </div>

      {/* Overlay when mobile menu is open */}
      {mobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/20 z-30"
          onClick={() => setMobileMenuOpen(false)}
        ></div>
      )}
    </header>
  );
};

export default Navbar;