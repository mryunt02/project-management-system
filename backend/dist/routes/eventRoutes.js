"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const eventController_1 = require("../controllers/eventController");
const router = (0, express_1.Router)();
router.post('/projects/:projectId/lists/:listId/events', eventController_1.createEvent);
router.get('/projects/:projectId/lists/:listId/events', eventController_1.getEvents);
router.put('/projects/:projectId/lists/:listId/events/:eventId', eventController_1.updateEvent);
exports.default = router;
