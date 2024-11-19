"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/projectRoutes.ts
const express_1 = __importDefault(require("express"));
const projectController_1 = require("../controllers/projectController");
const router = express_1.default.Router();
// Routes for project operations
router.post('/projects', projectController_1.createProject); // Create a new project
router.get('/projects', projectController_1.getProjects); // Get all projects
router.get('/projects/:id', projectController_1.getProjectById); // Get project by ID
router.put('/projects/:id', projectController_1.updateProject); // Update project by ID
router.delete('/projects/:id', projectController_1.deleteProject); // Delete project by ID
// New route for adding an event to a project
router.post('/projects/:id/events', projectController_1.addEventToProject); // Add event to project
exports.default = router;
