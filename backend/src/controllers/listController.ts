import { Request, Response } from 'express';
import List from '../models/List';
import Project from '../models/Project';

// Create a new list under a project
export const createList = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { projectId } = req.params;
  const { name } = req.body;

  try {
    const project = await Project.findById(projectId);
    if (!project) {
      res.status(404).json({ message: 'Project not found' });
      return;
    }

    const newList = new List({ name, projectId });
    await newList.save();

    project.lists.push(newList._id);
    await project.save();

    res.status(201).json(newList);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create list', error });
  }
};

// Get all lists under a project
export const getLists = async (req: Request, res: Response): Promise<void> => {
  const { projectId } = req.params;

  try {
    const lists = await List.find({ projectId });
    res.status(200).json(lists);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get lists', error });
  }
};
