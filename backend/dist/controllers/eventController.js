"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateEvent = exports.getEvents = exports.createEvent = void 0;
const Event_1 = __importDefault(require("../models/Event"));
const List_1 = __importDefault(require("../models/List"));
// Create a new event under a list
const createEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { projectId, listId } = req.params;
    const { title, description, deadline, attendees } = req.body;
    try {
        const list = yield List_1.default.findOne({ _id: listId, projectId });
        if (!list) {
            res.status(404).json({ message: 'List not found' });
            return;
        }
        const newEvent = new Event_1.default({
            title,
            description,
            deadline,
            attendees,
            listId,
        });
        yield newEvent.save();
        list.events.push(newEvent._id);
        yield list.save();
        res.status(201).json(newEvent);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to create event', error });
    }
});
exports.createEvent = createEvent;
// Get all events under a list
const getEvents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { projectId, listId } = req.params;
    try {
        const events = yield Event_1.default.find({ listId });
        res.status(200).json(events);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to get events', error });
    }
});
exports.getEvents = getEvents;
// Update an event under a list
const updateEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { projectId, listId, eventId } = req.params;
    const { title, description, deadline, attendees } = req.body;
    try {
        const list = yield List_1.default.findOne({ _id: listId, projectId });
        if (!list) {
            res.status(404).json({ message: 'List not found' });
            return;
        }
        const event = yield Event_1.default.findOneAndUpdate({ _id: eventId, listId }, { title, description, deadline, attendees }, { new: true });
        if (!event) {
            res.status(404).json({ message: 'Event not found' });
            return;
        }
        res.status(200).json(event);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to update event', error });
    }
});
exports.updateEvent = updateEvent;
