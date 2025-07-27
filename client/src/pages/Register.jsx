// // client/src/pages/Register.jsx
// import React, { useState } from 'react';
// import axios from 'axios';
// import { useSelector } from 'react-redux';

// const Register = () => {
//   const { token } = useSelector((state) => state.auth);

//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: '',
//     role: 'developer',
//   });

//   const [success, setSuccess] = useState('');
//   const [error, setError] = useState('');

//   const handleChange = (e) => {
//     setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setSuccess('');

//     try {
//       const res = await axios.post(
//         'http://localhost:5000/api/auth/register',
//         formData,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       setSuccess(res.data.message || 'User registered successfully');
//       setFormData({ name: '', email: '', password: '', role: 'developer' });
//     } catch (err) {
//       setError(err.response?.data?.message || 'Registration failed');
//     }
//   };

//   return (
//     <div style={{ maxWidth: '500px', margin: 'auto' }}>
//       <h3>Add New User</h3>

//       {success && <div className="alert alert-success">{success}</div>}
//       {error && <div className="alert alert-danger">{error}</div>}

//       <form onSubmit={handleSubmit}>
//         <div className="mb-3">
//           <label>Name:</label>
//           <input
//             className="form-control"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         <div className="mb-3">
//           <label>Email:</label>
//           <input
//             className="form-control"
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         <div className="mb-3">
//           <label>Password:</label>
//           <input
//             className="form-control"
//             type="password"
//             name="password"
//             value={formData.password}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         <div className="mb-3">
//           <label>Role:</label>
//           <select
//             className="form-select"
//             name="role"
//             value={formData.role}
//             onChange={handleChange}
//           >
//             <option value="developer">Developer</option>
//             <option value="lead">Project Lead</option>
//             <option value="admin">Admin</option>
//           </select>
//         </div>

//         <button className="btn btn-success" type="submit">
//           Register
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Register;
// client/src/pages/Register.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

const Register = () => {
  const { token } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'developer',
  });
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess('');
    setError('');
    try {
      const res = await axios.post(
        'http://localhost:5000/api/auth/register',
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSuccess(res.data.message || 'User registered!');
      setFormData({ name: '', email: '', password: '', role: 'developer' });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to register');
    }
  };

  return (
    <div className="bg-white max-w-md mx-auto p-6 rounded shadow-md space-y-4">
      <h2 className="text-xl font-semibold text-indigo-700 text-center">Add New User</h2>

      {success && <div className="bg-green-100 text-green-700 p-2 rounded">{success}</div>}
      {error && <div className="bg-red-100 text-red-700 p-2 rounded">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            className="w-full border rounded px-3 py-2"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            className="w-full border rounded px-3 py-2"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            className="w-full border rounded px-3 py-2"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Role</label>
          <select
            className="w-full border rounded px-3 py-2"
            name="role"
            value={formData.role}
            onChange={handleChange}
          >
            <option value="developer">Developer</option>
            <option value="lead">Project Lead</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <button className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700">
          Register User
        </button>
      </form>
    </div>
  );
};

export default Register;
