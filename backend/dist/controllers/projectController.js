"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addEventToProject = exports.deleteProject = exports.updateProject = exports.getProjectById = exports.getProjects = exports.createProject = void 0;
const Project_1 = __importDefault(require("../models/Project"));
// Create a new project
const createProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, type, members, description } = req.body;
        const newProject = new Project_1.default({
            name,
            type,
            members,
            description,
        });
        yield newProject.save();
        res.status(201).json(newProject);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.createProject = createProject;
// Get all projects
const getProjects = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const projects = yield Project_1.default.find();
        res.status(200).json(projects);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getProjects = getProjects;
// Get a project by ID
const getProjectById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const project = yield Project_1.default.findById(id).populate({
            path: 'lists',
            select: 'name color events', // Select only name and events from lists
            populate: {
                path: 'events', // Assuming events is a reference to the Event model
                select: 'title description deadline attendees', // Select the fields you want from events
            },
        });
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }
        res.status(200).json(project);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getProjectById = getProjectById;
// Update a project by ID
const updateProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const updatedProject = yield Project_1.default.findByIdAndUpdate(id, req.body, {
            new: true,
        });
        if (!updatedProject) {
            return res.status(404).json({ message: 'Project not found' });
        }
        res.status(200).json(updatedProject);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.updateProject = updateProject;
// Delete a project by ID
const deleteProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const deletedProject = yield Project_1.default.findByIdAndDelete(id);
        if (!deletedProject) {
            return res.status(404).json({ message: 'Project not found' });
        }
        res.status(200).json({ message: 'Project deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.deleteProject = deleteProject;
// Function to add an event to a project
const addEventToProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const projectId = req.params.id;
    const eventData = req.body; // Ensure this contains the necessary event fields
    try {
        // Find the project and push the new event into the events array
        const project = yield Project_1.default.findByIdAndUpdate(projectId, { $push: { events: eventData } }, { new: true, useFindAndModify: false });
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }
        res.status(201).json(project);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.addEventToProject = addEventToProject;
