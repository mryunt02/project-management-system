import { Router } from 'express';
import {
  createList,
  getLists,
  updateList,
  deleteList,
} from '../controllers/listController';

const router = Router();

router.post('/projects/:projectId/lists', createList);
router.get('/projects/:projectId/lists', getLists);
router.put('/projects/:projectId/lists/:listId', updateList);
router.delete('/projects/:projectId/lists/:listId', deleteList); // Add delete endpoint

export default router;
