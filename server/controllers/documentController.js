// server/controllers/documentController.js
import Document from "../models/Document.js";
import Project from "../models/Project.js";

export const uploadDocument = async (req, res) => {
  const { projectId } = req.params;
  const { file } = req;

  try {
    const project = await Project.findById(projectId);
    if (!project) return res.status(404).json({ message: "Project not found" });

    const isAuthorized =
      req.user.role === "admin" ||
      (req.user.role === "lead" && project.assignedLeads.includes(req.user.id));

    if (!isAuthorized) {
      return res
        .status(403)
        .json({ message: "Unauthorized to upload for this project" });
    }

    const document = new Document({
      project: projectId,
      uploadedBy: req.user.id,
      filename: file.originalname,
      fileUrl: `/uploads/${file.filename}`,
    });

    await document.save();
    res.status(201).json({ message: "Document uploaded", document });
  } catch (err) {
    res.status(500).json({ message: "Upload error", error: err.message });
  }
};

export const getProjectDocuments = async (req, res) => {
  const { projectId } = req.params;

  try {
    const project = await Project.findById(projectId);
    if (!project) return res.status(404).json({ message: "Project not found" });

    const isAssigned =
      project.assignedDevelopers.includes(req.user.id) ||
      project.assignedLeads.includes(req.user.id) ||
      req.user.role === "admin";

    if (!isAssigned) {
      return res.status(403).json({ message: "Access denied" });
    }

    const documents = await Document.find({ project: projectId });
    res.status(200).json(documents);
  } catch (err) {
    res.status(500).json({ message: "Fetch error", error: err.message });
  }
};
