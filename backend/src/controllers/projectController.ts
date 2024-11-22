// src/controllers/projectController.ts
import { Request, Response } from 'express';
import Project, { IProject } from '../models/Project';
import List from '../models/List';

// Create a new project
export const createProject = async (req: Request, res: Response) => {
  try {
    const { name, type, members, description } = req.body;

    // Check if a project with the same name already exists
    const existingProject = await Project.findOne({ name });
    if (existingProject) {
      return res
        .status(400)
        .json({ message: 'Project with this name already exists.' });
    }

    const newProject: IProject = new Project({
      name,
      type,
      members,
      description,
    });
    await newProject.save();
    res.status(201).json(newProject);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

// Get all projects
export const getProjects = async (req: Request, res: Response) => {
  try {
    const projects = await Project.find();
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

// Get a project by ID
export const getProjectById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const project = await Project.findById(id).populate({
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
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

// Update a project by ID
export const updateProject = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const updatedProject = await Project.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedProject) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.status(200).json(updatedProject);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

// Delete a project by ID
export const deleteProject = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const deletedProject = await Project.findByIdAndDelete(id);
    if (!deletedProject) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.status(200).json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

// Function to add an event to a project
export const addEventToProject = async (req: Request, res: Response) => {
  const projectId = req.params.id;
  const eventData = req.body; // Ensure this contains the necessary event fields

  try {
    // Find the project and push the new event into the events array
    const project = await Project.findByIdAndUpdate(
      projectId,
      { $push: { events: eventData } },
      { new: true, useFindAndModify: false }
    );

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};
