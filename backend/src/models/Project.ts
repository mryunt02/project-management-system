import mongoose, { Document, Schema } from 'mongoose';

export interface IProject extends Document {
  name: string;
  type: string;
  members: string[];
  description: string;
  lists: mongoose.Schema.Types.ObjectId[];
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
