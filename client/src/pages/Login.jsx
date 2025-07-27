// // // client/src/pages/Login.jsx
// // import React, { useState } from 'react';
// // import axios from 'axios';
// // import { useDispatch } from 'react-redux';
// // import { loginSuccess } from '../redux/authSlice';
// // import { useNavigate } from 'react-router-dom';

// // const Login = () => {
// //   const [email, setEmail] = useState('');
// //   const [password, setPassword] = useState('');
// //   const [error, setError] = useState('');

// //   const dispatch = useDispatch();
// //   const navigate = useNavigate();

// //   const handleLogin = async (e) => {
// //     e.preventDefault();

// //     try {
// //       const res = await axios.post('http://localhost:5000/api/auth/login', {
// //         email,
// //         password,
// //       });

// //       const { token, user } = res.data;
// //       dispatch(loginSuccess({ token, role: user.role, user }));
// //       navigate('/dashboard');
// //     } catch (err) {
// //       setError(err.response?.data?.message || 'Login failed');
// //     }
// //   };

// //   return (
// //     <div className="container" style={{ maxWidth: '400px', marginTop: '100px' }}>
// //       <h2>Login</h2>
// //       <form onSubmit={handleLogin}>
// //         <div>
// //           <label>Email:</label>
// //           <input
// //             type="email"
// //             required
// //             value={email}
// //             onChange={(e) => setEmail(e.target.value)}
// //             className="form-control"
// //           />
// //         </div>
// //         <div style={{ marginTop: '10px' }}>
// //           <label>Password:</label>
// //           <input
// //             type="password"
// //             required
// //             value={password}
// //             onChange={(e) => setPassword(e.target.value)}
// //             className="form-control"
// //           />
// //         </div>
// //         <button type="submit" style={{ marginTop: '20px' }} className="btn btn-primary">
// //           Login
// //         </button>
// //         {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
// //       </form>
// //     </div>
// //   );
// // };

// // export default Login;
// // client/src/pages/Login.jsx
// import React, { useState } from 'react';
// import axios from 'axios';
// import { useDispatch } from 'react-redux';
// import { loginSuccess } from '../redux/authSlice';
// import { useNavigate } from 'react-router-dom';

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');

//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await axios.post('http://localhost:5000/api/auth/login', {
//         email,
//         password,
//       });

//       const { token, user } = res.data;
//       dispatch(loginSuccess({ token, role: user.role, user }));
//       navigate('/dashboard');
//     } catch (err) {
//       setError(err.response?.data?.message || 'Login failed');
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-gray-100 via-white to-gray-200">
//       <div className="w-full max-w-md p-8 rounded-2xl shadow-lg bg-white">
//         <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">Login to PixelForge Nexus</h2>
//         {error && (
//           <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4">
//             {error}
//           </div>
//         )}
//         <form onSubmit={handleLogin} className="space-y-4">
//           <div>
//             <label className="block text-gray-600 font-semibold mb-1">Email</label>
//             <input
//               type="email"
//               required
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//             />
//           </div>
//           <div>
//             <label className="block text-gray-600 font-semibold mb-1">Password</label>
//             <input
//               type="password"
//               required
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//             />
//           </div>
//           <button
//             type="submit"
//             className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700 transition"
//           >
//             Login
//           </button>
//         </form>
//         <p className="text-sm text-center text-gray-500 mt-4">
//           Only registered users can login. Contact Admin to register.
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Login;
// client/src/pages/Login.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      });
      const { token, user } = res.data;
      dispatch(loginSuccess({ token, role: user.role, user }));
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-6 text-indigo-700">Login to PixelForge Nexus</h2>
        {error && (
          <div className="bg-red-100 text-red-700 p-2 rounded text-sm mb-4 text-center">
            {error}
          </div>
        )}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-600">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-600">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-md font-medium transition"
          >
            Login
          </button>
        </form>
        <p className="text-xs text-gray-500 text-center mt-4">Contact admin to register new accounts.</p>
      </div>
    </div>
  );
};

export default Login;
