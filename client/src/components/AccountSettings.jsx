import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const AccountSettings = () => {
  const { token, email } = useSelector((state) => state.auth);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        "http://localhost:5000/api/auth/update-password",
        { email, currentPassword, newPassword }, // 🔐 Sending email explicitly
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setMsg("Password updated successfully");
      setCurrentPassword("");
      setNewPassword("");
    } catch (err) {
      setMsg(err.response?.data?.message || "Update failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 bg-white p-6 shadow rounded">
      <h2 className="text-xl font-semibold mb-4 text-indigo-700">
        Update Password
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="password"
          placeholder="Current Password"
          className="w-full border px-3 py-2 rounded"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="New Password"
          className="w-full border px-3 py-2 rounded"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded"
        >
          Update
        </button>
      </form>
      {msg && <p className="mt-3 text-center text-sm text-blue-600">{msg}</p>}
    </div>
  );
};

export default AccountSettings;
