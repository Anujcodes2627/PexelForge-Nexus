import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const AddProject = () => {
  const { token, role } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    deadline: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        'http://localhost:5000/api/projects/create',
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setSuccess('Project created successfully!');
      setFormData({ name: '', description: '', deadline: '' });
      navigate('/dashboard');
    } catch (err) {
      setError('Failed to create project');
    }
  };

  // Allow only admin and lead
  if (role !== 'admin' && role !== 'lead') {
    return <p className="text-center text-red-500">Access denied.</p>;
  }

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold text-indigo-700 mb-4">Create New Project</h2>

      {error && <div className="bg-red-100 text-red-700 p-2 rounded mb-3">{error}</div>}
      {success && <div className="bg-green-100 text-green-700 p-2 rounded mb-3">{success}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Project Name</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Deadline</label>
          <input
            type="date"
            name="deadline"
            value={formData.deadline}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded"
        >
          Create Project
        </button>
      </form>
    </div>
  );
};

export default AddProject;
