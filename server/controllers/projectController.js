// server/controllers/projectController.js
import Project from '../models/Project.js';
import User from '../models/User.js';

// Admin adds a new project
export const createProject = async (req, res) => {
  const { name, description, deadline } = req.body;

  if (req.user.role !== 'admin' && req.user.role !== 'lead') {
    return res.status(403).json({ message: 'Only admin can create projects' });
  }

  try {
    const project = new Project({ name, description, deadline });
    await project.save();
    res.status(201).json({ message: 'Project created', project });
  } catch (err) {
    res.status(500).json({ message: 'Error creating project', error: err.message });
  }
};

// All users can view all active projects
export const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.status(200).json(projects);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching projects' });
  }
};

// Admin marks a project as complete
export const markProjectComplete = async (req, res) => {
  const { id } = req.params;

  // Check for admin role
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Only admin can mark projects as completed' });
  }

  try {
    const project = await Project.findByIdAndUpdate(
      id,
      { status: 'completed' },
      { new: true }
    );

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.status(200).json({ message: 'Project marked as completed', project });
  } catch (err) {
    console.error('Error updating project status:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};
export const activateProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      { status: 'active' },
      { new: true }
    );
    res.json({ message: 'Project activated', project });
  } catch (err) {
    res.status(500).json({ message: 'Failed to activate project' });
  }
};


// Project Lead assigns developers to a project
export const assignDevelopersToProject = async (req, res) => {
  const { id } = req.params; // project ID
  const { developerIds } = req.body;

  if (req.user.role !== 'lead') {
    return res.status(403).json({ message: 'Only project leads can assign developers' });
  }

  try {
    const project = await Project.findById(id);
    if (!project) return res.status(404).json({ message: 'Project not found' });

    // Check that all assigned IDs are developers
    const validDevs = await User.find({ _id: { $in: developerIds }, role: 'developer' });
    const validIds = validDevs.map(dev => dev._id);

    project.assignedDevelopers = validIds;
    await project.save();

    res.status(200).json({ message: 'Developers assigned', project });
  } catch (err) {
    res.status(500).json({ message: 'Error assigning developers', error: err.message });
  }
};

// Developer views their own assigned projects
export const getMyProjects = async (req, res) => {
  if (req.user.role !== 'developer') {
    return res.status(403).json({ message: 'Only developers can view this route' });
  }

  try {
    const projects = await Project.find({ assignedDevelopers: req.user.id })
      .populate('assignedLeads', 'name email')
      .populate('assignedDevelopers', 'name email');

    res.status(200).json(projects);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching assigned projects', error: err.message });
  }
};

export const deleteProject = async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: 'Project deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete project' });
  }
};
