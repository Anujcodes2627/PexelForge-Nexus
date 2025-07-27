// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Navigate, useNavigate } from "react-router-dom";
// import { useParams } from "react-router-dom";
// import { useSelector } from "react-redux";

// const ProjectDetails = () => {
//   const { id } = useParams();
//   const { token, role } = useSelector((state) => state.auth);

//   const [project, setProject] = useState(null);
//   const [documents, setDocuments] = useState([]);
//   const [file, setFile] = useState(null);
//   const [developerIds, setDeveloperIds] = useState([]);
//   const [allDevelopers, setAllDevelopers] = useState([]);
//   const [msg, setMsg] = useState("");
//   const headers = { Authorization: `Bearer ${token}` };
//   const navigate = useNavigate();
//   useEffect(() => {
//     const fetchAll = async () => {
//       try {
//         const res = await axios.get("http://localhost:5000/api/projects/all", {
//           headers,
//         });
//         const found = res.data.find((p) => p._id === id);
//         setProject(found);

//         const docsRes = await axios.get(
//           `http://localhost:5000/api/documents/${id}`,
//           { headers }
//         );
//         setDocuments(docsRes.data);

//         if (role === "lead") {
//           const devRes = await axios.get(
//             "http://localhost:5000/api/auth/developers",
//             { headers }
//           );
//           setAllDevelopers(devRes.data);
//         }
//       } catch (err) {
//         setMsg("Failed to load project details");
//       }
//     };
//     fetchAll();
//   }, []);
//   const markAsCompleted = async (projectId) => {
//     try {
//       await axios.put(
//         `http://localhost:5000/api/projects/complete/${projectId}`,
//         {},
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       // Update the project status locally
//       setProject((prev) =>
//         prev.map((p) =>
//           p._id === projectId ? { ...p, status: "Completed" } : p
//         )
//       );
//       navigate(`/dashboard`);
//     } catch (err) {
//       console.error("Failed to mark project as completed:", err);
//       alert("Only Admins can complete a project.");
//     }
//   };

//   const handleFileUpload = async (e) => {
//     e.preventDefault();
//     if (!file) return;
//     const formData = new FormData();
//     formData.append("file", file);
//     try {
//       await axios.post(
//         `http://localhost:5000/api/documents/upload/${id}`,
//         formData,
//         {
//           headers: { ...headers, "Content-Type": "multipart/form-data" },
//         }
//       );
//       setMsg("Document uploaded!");
//     } catch {
//       setMsg("Upload failed");
//     }
//   };

//   const handleAssignDevelopers = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.put(
//         `http://localhost:5000/api/projects/assign/${id}`,
//         { developerIds },
//         { headers }
//       );
//       setMsg("Developers assigned!");
//     } catch {
//       setMsg("Assignment failed");
//     }
//   };

//   if (!project)
//     return <p className="text-center text-gray-500">Loading project...</p>;

//   return (
//     <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
//       <div>
//         <h2 className="text-2xl font-bold text-indigo-700">{project.name}</h2>
//         <p className="text-gray-600">{project.description}</p>
//         <p className="text-sm text-gray-500 mt-1">
//           Deadline: {new Date(project.deadline).toLocaleDateString()}
//         </p>
//       </div>
//       <div>
//         <h3 className="text-lg font-semibold text-gray-800">Documents</h3>
//         <ul className="list-disc ml-5 mt-2 text-sm text-gray-600">
//           {documents.map((doc) => (
//             <li key={doc._id}>
//               <a
//                 href={`http://localhost:5000${doc.fileUrl}`}
//                 target="_blank"
//                 rel="noreferrer"
//                 className="text-indigo-600 hover:underline"
//               >
//                 {doc.filename}
//               </a>
//             </li>
//           ))}
//         </ul>
//       </div>
//       {(role === "admin" || role === "lead") && (
//         <form onSubmit={handleFileUpload} className="space-y-3">
//           <label className="block text-sm font-medium">Upload Document</label>
//           <input
//             type="file"
//             onChange={(e) => setFile(e.target.files[0])}
//             className="border border-gray-300 rounded px-3 py-2"
//             required
//           />
//           <button
//             type="submit"
//             className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
//           >
//             Upload
//           </button>
//         </form>
//       )}
//       {/* {role === "lead"  && (
//         <div>
//           <h3 className="text-lg font-semibold mb-2">Assign Developers</h3>
//           <form onSubmit={handleAssignDevelopers}>
//             <select
//               multiple
//               value={developerIds}
//               onChange={(e) =>
//                 setDeveloperIds(
//                   [...e.target.selectedOptions].map((opt) => opt.value)
//                 )
//               }
//               className="w-full border rounded px-3 py-2 h-32"
//             >
//               {allDevelopers.map((dev) => (
//                 <option key={dev._id} value={dev._id}>
//                   {dev.name} - {dev.email}
//                 </option>
//               ))}
//             </select>
//             <button
//               type="submit"
//               className="mt-3 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
//             >
//               Assign
//             </button>
//           </form>
//         </div>
//       )} */}
//       {role === "lead" && project.status !== "completed" && (
//         <div>
//           <h3 className="text-lg font-semibold mb-2">Assign Developers</h3>
//           <form onSubmit={handleAssignDevelopers}>
//             <select
//               multiple
//               value={developerIds}
//               onChange={(e) =>
//                 setDeveloperIds(
//                   [...e.target.selectedOptions].map((opt) => opt.value)
//                 )
//               }
//               className="w-full border rounded px-3 py-2 h-32"
//             >
//               {allDevelopers.map((dev) => (
//                 <option key={dev._id} value={dev._id}>
//                   {dev.name} - {dev.email}
//                 </option>
//               ))}
//             </select>
//             <button
//               type="submit"
//               className="mt-3 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
//             >
//               Assign
//             </button>
//           </form>
//         </div>
//       )}

//       {msg && <p className="text-blue-600 font-medium">{msg}</p>}

//       {role === "admin" && project.status === "active" && (
//         <button onClick={() => markAsCompleted(id)} className="btn">
//           Mark as Completed
//         </button>
//       )}
//     </div>
//   );
// };

// export default ProjectDetails;
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProjectDetails = () => {
  const { id } = useParams();
  const { token, role } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [project, setProject] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [file, setFile] = useState(null);
  const [developerIds, setDeveloperIds] = useState([]);
  const [allDevelopers, setAllDevelopers] = useState([]);
  const [msg, setMsg] = useState("");

  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/projects/all", {
          headers,
        });
        const found = res.data.find((p) => p._id === id);
        setProject(found);

        const docsRes = await axios.get(
          `http://localhost:5000/api/documents/${id}`,
          { headers }
        );
        setDocuments(docsRes.data);

        if (role === "lead") {
          const devRes = await axios.get(
            "http://localhost:5000/api/auth/developers",
            { headers }
          );
          setAllDevelopers(devRes.data);
        }
      } catch (err) {
        setMsg("Failed to load project details");
      }
    };
    fetchAll();
  }, []);

  const markAsCompleted = async (projectId) => {
    try {
      await axios.put(
        `http://localhost:5000/api/projects/complete/${projectId}`,
        {},
        { headers }
      );
      setProject((prev) => ({ ...prev, status: "Completed" }));
      navigate("/dashboard");
    } catch (err) {
      console.error("Failed to mark project as completed:", err);
      alert("Only Admins can complete a project.");
    }
  };

  const markAsActive = async (projectId) => {
    try {
      await axios.put(
        `http://localhost:5000/api/projects/activate/${projectId}`,
        {},
        { headers }
      );
      setProject((prev) => ({ ...prev, status: "active" }));
      setMsg("Project re-activated!");
    } catch (err) {
      console.error("Failed to activate project:", err);
      alert("Only Admins can reactivate projects.");
    }
  };

  const handleFileUpload = async (e) => {
    e.preventDefault();
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    try {
      await axios.post(
        `http://localhost:5000/api/documents/upload/${id}`,
        formData,
        {
          headers: { ...headers, "Content-Type": "multipart/form-data" },
        }
      );
      setMsg("Document uploaded!");
    } catch {
      setMsg("Upload failed");
    }
  };
  const deleteProject = async (projectId) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this project?"
    );
    if (!confirm) return;

    try {
      await axios.delete(`http://localhost:5000/api/projects/${projectId}`, {
        headers,
      });
      alert("Project deleted successfully");
      navigate("/dashboard");
    } catch (err) {
      console.error("Error deleting project:", err);
      alert("Failed to delete project");
    }
  };

  const handleAssignDevelopers = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:5000/api/projects/assign/${id}`,
        { developerIds },
        { headers }
      );
      setMsg("Developers assigned!");
    } catch {
      setMsg("Assignment failed");
    }
  };

  if (!project)
    return <p className="text-center text-gray-500">Loading project...</p>;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-indigo-700">{project.name}</h2>
        <p className="text-gray-600">{project.description}</p>
        <p className="text-sm text-gray-500 mt-1">
          Deadline: {new Date(project.deadline).toLocaleDateString()}
        </p>
      </div>

      {/* Status Display for Lead/Dev and Action for Admin */}
      {project.status === "completed" && (
        <div className="mt-4 p-3 bg-green-100 border border-green-400 text-green-800 rounded">
          {role === "admin" ? (
            <button
              onClick={() => markAsActive(id)}
              className="bg-yellow-500 hover:bg-yellow-600 text-white font-medium px-4 py-2 rounded"
            >
              Mark as Active
            </button>
          ) : (
            <span className="text-sm font-semibold">
              ✅ This project is marked as Completed
            </span>
          )}
        </div>
      )}

      {/* File Upload */}
      {(role === "admin" || role === "lead") && project.status === "active" && (
        <form onSubmit={handleFileUpload} className="space-y-3">
          <label className="block text-sm font-medium">Upload Document</label>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            className="border border-gray-300 rounded px-3 py-2"
            required
          />
          <button
            type="submit"
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
          >
            Upload
          </button>
        </form>
      )}

      {/* Document List */}
      {project.status === "active" && (
        <div>
          <h3 className="text-lg font-semibold text-gray-800">Documents</h3>
          <ul className="list-disc ml-5 mt-2 text-sm text-gray-600">
            {documents.map((doc) => (
              <li key={doc._id}>
                <a
                  href={`http://localhost:5000${doc.fileUrl}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-indigo-600 hover:underline"
                >
                  {doc.filename}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Assign Developers */}
      {role === "lead" && project.status !== "completed" && (
        <div>
          <h3 className="text-lg font-semibold mb-2">Assign Developers</h3>
          <form onSubmit={handleAssignDevelopers}>
            <select
              multiple
              value={developerIds}
              onChange={(e) =>
                setDeveloperIds(
                  [...e.target.selectedOptions].map((opt) => opt.value)
                )
              }
              className="w-full border rounded px-3 py-2 h-32"
            >
              {allDevelopers.map((dev) => (
                <option key={dev._id} value={dev._id}>
                  {dev.name} - {dev.email}
                </option>
              ))}
            </select>
            <button
              type="submit"
              className="mt-3 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Assign
            </button>
          </form>
        </div>
      )}

      {msg && <p className="text-blue-600 font-medium">{msg}</p>}

      {/* Mark as Completed */}
      {role === "admin" && project.status === "active" && (
        <button
          onClick={() => markAsCompleted(id)}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Mark as Completed
        </button>
      )}
      {role === "admin" && (
        <button
          onClick={() => deleteProject(id)}
          className="mt-4 bg-red-700 text-white px-4 py-2 rounded hover:bg-red-800"
        >
          Delete Project
        </button>
      )}
    </div>
  );
};

export default ProjectDetails;
