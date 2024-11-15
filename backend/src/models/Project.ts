import mongoose, { Document, Schema } from 'mongoose';
import eventSchema, { IEvent } from './Event'; // Event modelini import edin

export interface IProject extends Document {
  name: string;
  type: string;
  members: string[];
  description: string;
  events: IEvent[]; // Events alanını ekleyin
}

const projectSchema: Schema<IProject> = new Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  members: { type: [String], required: true },
  description: { type: String, required: true },
  events: { type: [eventSchema], default: [] }, // Events şeması ile ilişkilendirin
});

const Project = mongoose.model<IProject>('Project', projectSchema);
export default Project;
