// src/models/Project.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface IProject extends Document {
  name: string;
  type: string;
  members: string[];
  description: string;
}

const projectSchema: Schema<IProject> = new Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  members: { type: [String], required: true },
  description: { type: String, required: true },
});

const Project = mongoose.model<IProject>('Project', projectSchema);
export default Project;
