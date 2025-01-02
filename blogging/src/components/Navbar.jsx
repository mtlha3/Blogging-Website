import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom"; // For routing and navigation
import { useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav style={{ backgroundColor: '#58999E' }} className="p-4 fixed w-full mb-4">
      <div className="container mx-auto flex justify-between items-center">

        <div className="text-white text-2xl font-semibold flex">
          <Link to="/homepage">
            <img
              src="https://i.pinimg.com/originals/5e/b9/24/5eb924aee830d769dff1ad0997a99d25.gif"
              alt="Logo"
              width={80}
              className="rounded-full mr-4"
            />
          </Link>
          <Link to="/homepage">PersonaCraft</Link>
        </div>

        <div className="space-x-6">
          {/* Home Link */}
          <NavLink 
            to="/homepage"
            end  // Ensure it only matches the exact /homepage route
            className={({ isActive }) =>
              `text-white ${isActive ? "underline" : "no-underline"}`
            }
          >
            Home
          </NavLink>

          {/* My Blogs Link */}
          <NavLink 
            to="/homepage/myblogs"
            className={({ isActive }) =>
              `text-white ${isActive ? "underline" : "no-underline"}`
            }
          >
            My Blogs
          </NavLink>

          {/* Add Blog Link */}
          <NavLink 
            to="/homepage/Addblog"
            className={({ isActive }) =>
              `text-white ${isActive ? "underline" : "no-underline"}`
            }
          >
            Add Blog
          </NavLink>
          <button
            onClick={handleLogout}
            className="text-white bg-red-600 rounded-md hover:text-gray-200 px-6 py-2"
          >
            Logout
          </button>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
