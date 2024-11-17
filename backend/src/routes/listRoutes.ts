import { Router } from 'express';
import { createList, getLists } from '../controllers/listController';

const router = Router();

router.post('/projects/:projectId/lists', createList);
router.get('/projects/:projectId/lists', getLists);

export default router;
