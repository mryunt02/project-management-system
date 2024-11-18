import { Request, Response } from 'express';
import List from '../models/List';
import Project from '../models/Project';

// Create a new list under a project
export const createList = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { projectId } = req.params;
  const { name, color } = req.body;

  try {
    const project = await Project.findById(projectId);
    if (!project) {
      res.status(404).json({ message: 'Project not found' });
      return;
    }

    const newList = new List({ name, color, projectId });
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

// Get a list by ID and populate events
export const getListById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { listId } = req.params;

  try {
    const list = await List.findById(listId).populate('events');
    if (!list) {
      res.status(404).json({ message: 'List not found' });
      return;
    }

    res.status(200).json(list);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get list', error });
  }
};

export const updateList = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { projectId, listId } = req.params;
  const { name, color } = req.body;

  try {
    const list = await List.findOneAndUpdate(
      { _id: listId, projectId },
      { name, color },
      { new: true }
    );

    if (!list) {
      res.status(404).json({ message: 'List not found' });
      return;
    }

    res.status(200).json(list);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update list', error });
  }
};
