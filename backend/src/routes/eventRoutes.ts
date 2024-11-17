import { Router } from 'express';
import { createEvent, getEvents } from '../controllers/eventController';

const router = Router();

router.post('/projects/:projectId/lists/:listId/events', createEvent);
router.get('/projects/:projectId/lists/:listId/events', getEvents);

export default router;
