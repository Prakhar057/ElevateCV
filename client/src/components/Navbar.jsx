import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const user = {
    name: "John Doe",
  };
  const navigate = useNavigate();

  const logOutUser = () => {
    navigate("/");
  };
  return (
    <div className="shadow-lg bg-gradient-to-r from-black via-gray-900 to-black border-b border-gray-800">
      <nav className="flex items-center justify-between max-w-7xl mx-auto px-4 py-3.5 text-white transition-all">
        <Link to="/">
          <img src="/Logo.png" alt="logo" className="h-11 w-auto" />
        </Link>
        <div className="flex items-center gap-4 text-sm">
          <p className="max-sm:hidden">Hi, {user?.name}</p>
          <button
            onClick={logOutUser}
            className="bg-gray-800 hover:bg-gray-700 border border-gray-700 px-7 py-1.5 rounded-full active:scale-95 transition-all text-white"
          >
            Logout
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
