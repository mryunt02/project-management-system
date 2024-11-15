import { Request, Response } from 'express';
import Event, { IEvent } from '../models/Event';
import Project from '../models/Project';

// Yeni bir event oluşturma
export const createEvent = async (req: Request, res: Response) => {
  try {
    const { title, description, date, attendees, projectId } = req.body;

    const newEvent: IEvent = new Event({
      title,
      description,
      date,
      attendees,
      projectId,
    });

    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

// Belirli bir projedeki tüm event'leri getirme
export const getEventsByProjectId = async (req: Request, res: Response) => {
  const { projectId } = req.params;
  try {
    const events = await Event.find({ projectId }).populate('projectId');
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

// Event ID'sine göre event' getirme
export const getEventById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const event = await Event.findById(id).populate('projectId');
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

// Event güncelleme
export const updateEvent = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const updatedEvent = await Event.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedEvent) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.status(200).json(updatedEvent);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

// Event silme
export const deleteEvent = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const deletedEvent = await Event.findByIdAndDelete(id);
    if (!deletedEvent) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.status(200).json({ message: 'Event deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};
