import React from 'react';
import { Link, NavLink } from 'react-router-dom';

function Getstarted() {
  return (
    <div className="h-screen flex flex-col overflow-hidden">
      {/* Navbar */}
      <header style={{ backgroundColor: '#58999E' }} className="fixed top-0 left-0 w-full flex justify-between items-center px-8 py-4 text-white shadow-md z-50">
        <div className="text-2xl font-bold flex">
          <img
            src="https://i.pinimg.com/originals/5e/b9/24/5eb924aee830d769dff1ad0997a99d25.gif"
            alt="Logo"
            width={80}
            className="rounded-full m-0"
          />
        </div>
        <div>
          <NavLink to="/login" className="mr-6 hover:bg-blue-800 bg-blue-700 px-4 py-1 rounded">
            Sign In
          </NavLink>
          <NavLink to="/signup" className="mr-6 hover:bg-blue-800 bg-blue-700 px-4 py-1 rounded">
            Get Started 
          </NavLink>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row items-center justify-center flex-grow pt-16">
        <div style={{ backgroundColor: '#FEF8E1' }} className="flex flex-col pt-8 md:pt-40 items-start w-full md:w-1/2 px-8 h-full bg-opacity-80">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Create Personas & Build User Stories
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Persona generator and library tools with optional connected user stories. An online workspace to align your efforts with real-world user needs.
          </p>
          <Link to="/signup" className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 ml-auto">
            Create Your First Blog
          </Link>
        </div>

        <div className="w-full md:w-1/2 flex justify-center md:justify-end mt-8 md:mt-0">
          <img
            src="/Gettarted background image.webp"
            alt="Get Started Background"
            className="max-w-full h-auto object-cover"
          />
        </div>
      </div>
    </div>
  );
}

export default Getstarted;
