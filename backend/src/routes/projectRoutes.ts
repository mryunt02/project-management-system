// src/routes/projectRoutes.ts
import express from 'express';
import {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
  addEventToProject,
} from '../controllers/projectController';

const router = express.Router();

// Routes for project operations
router.post('/projects', createProject); // Create a new project
router.get('/projects', getProjects); // Get all projects
router.get('/projects/:id', getProjectById); // Get project by ID
router.put('/projects/:id', updateProject); // Update project by ID
router.delete('/projects/:id', deleteProject); // Delete project by ID

// New route for adding an event to a project
router.post('/projects/:id/events', addEventToProject); // Add event to project

export default router;
