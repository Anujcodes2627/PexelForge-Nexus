// server/models/Project.js
import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: String,
    deadline: Date,
    status: { type: String, enum: ["active", "completed"], default: "active" },
    assignedLeads: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    assignedDevelopers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

const Project = mongoose.model("Project", projectSchema);
export default Project;
