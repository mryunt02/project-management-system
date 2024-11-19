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
exports.deleteList = exports.updateList = exports.getListById = exports.getLists = exports.createList = void 0;
const List_1 = __importDefault(require("../models/List"));
const Project_1 = __importDefault(require("../models/Project"));
// Create a new list under a project
const createList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { projectId } = req.params;
    const { name, color } = req.body;
    try {
        const project = yield Project_1.default.findById(projectId);
        if (!project) {
            res.status(404).json({ message: 'Project not found' });
            return;
        }
        const newList = new List_1.default({ name, color, projectId });
        yield newList.save();
        project.lists.push(newList._id);
        yield project.save();
        res.status(201).json(newList);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to create list', error });
    }
});
exports.createList = createList;
// Get all lists under a project
const getLists = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { projectId } = req.params;
    try {
        const lists = yield List_1.default.find({ projectId });
        res.status(200).json(lists);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to get lists', error });
    }
});
exports.getLists = getLists;
// Get a list by ID and populate events
const getListById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { listId } = req.params;
    try {
        const list = yield List_1.default.findById(listId).populate('events');
        if (!list) {
            res.status(404).json({ message: 'List not found' });
            return;
        }
        res.status(200).json(list);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to get list', error });
    }
});
exports.getListById = getListById;
const updateList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { projectId, listId } = req.params;
    const { name, color } = req.body;
    try {
        const list = yield List_1.default.findOneAndUpdate({ _id: listId, projectId }, { name, color }, { new: true });
        if (!list) {
            res.status(404).json({ message: 'List not found' });
            return;
        }
        res.status(200).json(list);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to update list', error });
    }
});
exports.updateList = updateList;
// Delete a list under a project
const deleteList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { projectId, listId } = req.params;
    try {
        const list = yield List_1.default.findOneAndDelete({ _id: listId, projectId });
        if (!list) {
            res.status(404).json({ message: 'List not found' });
            return;
        }
        // Remove the list reference from the project
        yield Project_1.default.findByIdAndUpdate(projectId, {
            $pull: { lists: listId },
        });
        res.status(200).json({ message: 'List deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to delete list', error });
    }
});
exports.deleteList = deleteList;
