import { Router } from 'express';
import {
  createList,
  getLists,
  updateList,
} from '../controllers/listController';

const router = Router();

router.post('/projects/:projectId/lists', createList);
router.get('/projects/:projectId/lists', getLists);
router.put('/projects/:projectId/lists/:listId', updateList);

export default router;
