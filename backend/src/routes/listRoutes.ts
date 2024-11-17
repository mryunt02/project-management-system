import express from 'express';
import {
  createList,
  addEventsToList,
  getAllLists,
  getListById,
} from '../controllers/listController'; // Import the controller functions

const router = express.Router();

// POST endpoint to create a new list with event categories
router.post('/lists', createList);

// POST endpoint to add events to an existing list by ID
router.post('/lists/:id/events', addEventsToList);

// GET endpoint to retrieve all lists
router.get('/lists', getAllLists);

// GET endpoint to retrieve a specific list by ID
router.get('/lists/:id', getListById);

export default router;
