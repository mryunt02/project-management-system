import mongoose, { Document, Schema } from 'mongoose';

export interface IEvent extends Document {
  title: string;
  description: string;
  date: Date;
  attendees: string[];
  projectId: mongoose.Schema.Types.ObjectId; // Reference to the project
  listId: mongoose.Schema.Types.ObjectId; // Reference to the list
}

const eventSchema: Schema<IEvent> = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  attendees: { type: [String], required: true },
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true,
  }, // Reference to the project
  listId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'List', // Reference to the List model
    required: true,
  }, // Reference to the list
});

const Event = mongoose.model<IEvent>('Event', eventSchema);
export default eventSchema;
