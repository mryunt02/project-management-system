import { Request, Response } from 'express';
import Event from '../models/Event';
import List from '../models/List';

// Create a new event under a list
export const createEvent = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { projectId, listId } = req.params;
  const { title, description, deadline, attendees } = req.body;

  try {
    const list = await List.findOne({ _id: listId, projectId });
    if (!list) {
      res.status(404).json({ message: 'List not found' });
      return;
    }

    const newEvent = new Event({
      title,
      description,
      deadline,
      attendees,
      listId,
    });
    await newEvent.save();

    list.events.push(newEvent._id);
    await list.save();

    res.status(201).json(newEvent);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create event', error });
  }
};

// Get all events under a list
export const getEvents = async (req: Request, res: Response): Promise<void> => {
  const { projectId, listId } = req.params;

  try {
    const events = await Event.find({ listId });
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get events', error });
  }
};

// Get all events across all projects and lists
export const getAllEvents = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get all events', error });
  }
};

// Update an event under a list
export const updateEvent = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { projectId, listId, eventId } = req.params;
  const { title, description, deadline, attendees } = req.body;

  try {
    const list = await List.findOne({ _id: listId, projectId });
    if (!list) {
      res.status(404).json({ message: 'List not found' });
      return;
    }

    const event = await Event.findOneAndUpdate(
      { _id: eventId, listId },
      { title, description, deadline, attendees },
      { new: true }
    );

    if (!event) {
      res.status(404).json({ message: 'Event not found' });
      return;
    }

    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update event', error });
  }
};
