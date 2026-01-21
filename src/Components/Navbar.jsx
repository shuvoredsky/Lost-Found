import React, { useContext } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../Provider/AuthProvider";
import { toast } from "react-toastify";
import { FaMapMarkerAlt, FaUser } from "react-icons/fa";
import DarkModeToggle from "./DarkModeToggle";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleLogOut = () => {
    logOut()
      .then(() => toast.success("Sign out successfully"))
      .catch((error) => toast.error(error.message));
  };

  const navLinks = [
    ["Home", "/"],
    ["Lost & Found Items", "/allItems"],
    ["Add Item", "/add-lost-found"],
    ["Recovered Items", "/all-Recovered"],
  ];

  const activeClass =
    "border-b-2 border-primary text-primary font-semibold";

  const authBtnClass =
    "text-sm px-3 py-2 font-bold text-white bg-primary hover:bg-error/80 rounded transition";

  const outlineBtnClass =
    "text-sm px-3 py-2 font-bold text-primary border border-primary hover:bg-primary hover:text-white rounded transition cursor-pointer";

  return (
    <header className="sticky top-0 z-50 shadow-md bg-base-100 text-base-content">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="cursor-pointer" onClick={() => navigate("/")}>
            <span className="text-2xl flex items-center font-bold text-primary ml-2">
              Lost <FaMapMarkerAlt className="ml-1 text-error" /> Found
            </span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-6 items-center">
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
          {user && (
            <div className="hidden md:flex items-center space-x-4">
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
          )}

          {!user && (
            <div className="hidden md:flex items-center space-x-3">
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

          {/* Mobile Menu */}
          <div className="md:hidden flex items-center">
            {user ? (
              <details className="dropdown dropdown-end">
                <summary className="cursor-pointer list-none">
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt="User"
                      className="w-9 h-9 rounded-full border-2 border-base-content object-cover"
                    />
                  ) : (
                    <FaUser size={24} />
                  )}
                </summary>

                <ul className="absolute right-0 top-12 w-48 bg-base-200 shadow-md rounded-md mt-2 text-sm z-50">
                  <li>
                    <Link className="block px-4 py-2 hover:bg-base-300" to="/">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="block px-4 py-2 hover:bg-base-300"
                      to="/add-lost-found"
                    >
                      Add Item
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="block px-4 py-2 hover:bg-base-300"
                      to={`/myItems/${user.email}`}
                    >
                      My Items
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={handleLogOut}
                      className="block w-full text-left px-4 py-2 text-error hover:bg-error/20"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </details>
            ) : (
              <div className="flex space-x-2">
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
        </div>
      </div>
    </header>
  );
};

export default Navbar;
