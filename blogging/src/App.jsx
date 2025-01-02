import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUpPage from "./pages/Signup.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import Home from "./pages/Home.jsx";
import Myblogs from "./pages/Myblogs.jsx";
import Addblog from "./pages/addblog.jsx";
import Getstarted from "./pages/Getstarted.jsx";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/footer.jsx";
function App() {
  return (
    <div>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Outlet />

          
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;
