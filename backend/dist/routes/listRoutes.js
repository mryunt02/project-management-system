"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const listController_1 = require("../controllers/listController");
const router = (0, express_1.Router)();
router.post('/projects/:projectId/lists', listController_1.createList);
router.get('/projects/:projectId/lists', listController_1.getLists);
router.put('/projects/:projectId/lists/:listId', listController_1.updateList);
router.delete('/projects/:projectId/lists/:listId', listController_1.deleteList); // Add delete endpoint
exports.default = router;
