import { Request, Response } from 'express';
import List from '../models/List'; // Import the List model

// Controller to create a new list with event categories
export const createList = async (req: Request, res: Response) => {
  try {
    const { name, description, eventCategories } = req.body;

    const newList = new List({
      name,
      description,
      eventCategories,
    });

    await newList.save();
    res.status(201).json(newList); // Return the newly created list
  } catch (error) {
    res.status(500).json({ message: 'Error creating the list', error });
  }
};

// Controller to add events to an existing list by ID
export const addEventsToList = async (req: Request, res: Response) => {
  try {
    const { id } = req.params; // Get the List ID from the URL parameter
    const { eventCategoryName, events } = req.body; // Assume the event category name and list of events are in the request body

    // Find the List by ID
    const list = await List.findById(id);

    if (!list) {
      return res.status(404).json({ message: 'List not found' });
    }

    // Find the category within the list and add events
    const category = list.eventCategories.find(
      (category) => category.name === eventCategoryName
    );

    if (!category) {
      return res
        .status(404)
        .json({ message: 'Event category not found in the list' });
    }

    // Add the new events to the category
    category.events.push(...events);

    // Save the updated list
    await list.save();

    res.status(200).json(list); // Return the updated list
  } catch (error) {
    res.status(500).json({ message: 'Error adding events', error });
  }
};

// Controller to get all lists
export const getAllLists = async (req: Request, res: Response) => {
  try {
    const lists = await List.find();
    res.status(200).json(lists);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching lists', error });
  }
};

// Controller to get a specific list by ID
export const getListById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const list = await List.findById(id);

    if (!list) {
      return res.status(404).json({ message: 'List not found' });
    }

    res.status(200).json(list);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching the list', error });
  }
};
