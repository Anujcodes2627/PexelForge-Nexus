// // client/src/components/Navbar.jsx
// import React from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { logout } from '../redux/authSlice';

// const Navbar = () => {
//   const { token, role } = useSelector((state) => state.auth);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     dispatch(logout());
//     navigate('/');
//   };

//   return (
//     <nav className="navbar navbar-expand-lg navbar-light bg-light px-3">
//       <Link className="navbar-brand" to="/">
//         PixelForge Nexus
//       </Link>

//       {token && (
//         <ul className="navbar-nav ms-auto">
//           <li className="nav-item">
//             <Link className="nav-link" to="/dashboard">
//               Dashboard
//             </Link>
//           </li>

//           {role === 'admin' && (
//             <li className="nav-item">
//               <Link className="nav-link" to="/register">
//                 Add User
//               </Link>
//             </li>
//           )}

//           <li className="nav-item">
//             <button className="btn btn-outline-danger ms-2" onClick={handleLogout}>
//               Logout
//             </button>
//           </li>
//         </ul>
//       )}
//     </nav>
//   );
// };

// export default Navbar;
// client/src/components/Navbar.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/authSlice";

const Navbar = () => {
  const { token, role, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 px-6 py-3">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/dashboard" className="text-xl font-bold text-indigo-700">
          PixelForge Nexus
        </Link>

        {token && (
          <div className="flex items-center gap-4">
            {/* Show only to Admins */}
            {role === "admin" && (
              <Link
                to="/register"
                className="text-sm text-gray-700 hover:text-indigo-600 font-medium"
              >
                Register
              </Link>
            )}
            {role === "admin" && (
              <Link
                to="/add-project"
                className="text-sm text-gray-700 hover:text-indigo-600 font-medium"
              >
                Add Project
              </Link>
            )}

            {/* Role display */}
            <span className="text-sm text-gray-500 hidden sm:inline">
              Logged in as: <span className="font-semibold">{role}</span>
            </span>
            <Link
              to="/account"
              className="text-sm text-gray-700 hover:text-indigo-600 font-medium"
            >Account Settings</Link>
            {/* Logout */}
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
