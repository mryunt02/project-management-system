import mongoose, { Document, Schema } from 'mongoose';
import { IList } from './List';

export interface IProject extends Document {
  name: string;
  type: string;
  members: string[];
  description: string;
  lists: IList[]; // Adjusted for populated lists
}

const projectSchema: Schema<IProject> = new Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  members: { type: [String], required: true },
  description: { type: String, required: true },
  lists: [{ type: mongoose.Schema.Types.ObjectId, ref: 'List' }],
});

const Project = mongoose.model<IProject>('Project', projectSchema);
export default Project;
