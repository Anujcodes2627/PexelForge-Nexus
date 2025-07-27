// // client/src/pages/Dashboard.jsx
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useSelector } from 'react-redux';
// import { Link } from 'react-router-dom';

// const Dashboard = () => {
//   const { token, role } = useSelector((state) => state.auth);
//   const [projects, setProjects] = useState([]);
//   const [error, setError] = useState('');

//   const fetchProjects = async () => {
//     try {
//       const url =
//         role === 'developer'
//           ? 'http://localhost:5000/api/projects/my'
//           : 'http://localhost:5000/api/projects/all';

//       const res = await axios.get(url, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       setProjects(res.data);
//     } catch (err) {
//       setError('Failed to fetch projects');
//     }
//   };

//   useEffect(() => {
//     fetchProjects();
//   }, [role]);

//   return (
//     <div>
//       <h2>Welcome, {role.charAt(0).toUpperCase() + role.slice(1)}</h2>
//       {error && <p style={{ color: 'red' }}>{error}</p>}

//       <div className="mt-4">
//         <h4>Your Projects:</h4>
//         {projects.length === 0 ? (
//           <p>No projects found.</p>
//         ) : (
//           <ul className="list-group">
//             {projects.map((project) => (
//               <li key={project._id} className="list-group-item d-flex justify-content-between align-items-center">
//                 <div>
//                   <strong>{project.name}</strong> - {project.status}
//                   <br />
//                   <small>{project.description}</small>
//                 </div>
//                 <Link to={`/projects/${project._id}`} className="btn btn-sm btn-primary">
//                   View Details
//                 </Link>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
// client/src/pages/Dashboard.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { token, role } = useSelector((state) => state.auth);
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState("");

  const fetchProjects = async () => {
    try {
      const url =
        role === "developer"
          ? "http://localhost:5000/api/projects/my"
          : "http://localhost:5000/api/projects/all";

      const res = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setProjects(res.data);
    } catch (err) {
      setError("Failed to fetch projects");
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [role]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-800">
          Welcome, {role.toUpperCase()}
        </h2>
        <p className="text-gray-500">Here are your current projects:</p>
      </div>

      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded text-sm">
          {error}
        </div>
      )}

      {projects.length === 0 ? (
        <p className="text-gray-600">No projects found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project._id}
              className="bg-white shadow-md rounded-lg p-5 border border-gray-100 hover:shadow-lg transition"
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-xl font-semibold text-indigo-700">
                  {project.name}
                </h3>
                <span
                  className={`text-xs px-2 py-1 rounded-full font-medium ${
                    project.status === "completed"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {project.status}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-2">
                {project.description || "No description provided."}
              </p>
              <p className="text-sm text-gray-500">
                Deadline:{" "}
                {project.deadline
                  ? new Date(project.deadline).toLocaleDateString()
                  : "Not set"}
              </p>
              <Link
                to={`/projects/${project._id}`}
                className="inline-block mt-4 text-sm text-indigo-600 hover:underline"
              >
                View Details →
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
