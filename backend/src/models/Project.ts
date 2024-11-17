import mongoose, { Document, Schema } from 'mongoose';
import eventSchema, { IEvent } from './Event'; // Ensure this is correct
import { IList, listSchema } from './List';

export interface IProject extends Document {
  name: string;
  type: string;
  members: string[];
  description: string;
  lists: IList[]; // Each project will have its own unique events
}

const projectSchema: Schema<IProject> = new Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  members: { type: [String], required: true },
  description: { type: String, required: true },
  lists: { type: [listSchema], default: [] }, // Comment this out for testing
});

const Project = mongoose.model<IProject>('Project', projectSchema);
export default Project;
