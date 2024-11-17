import mongoose, { Document, Schema } from 'mongoose';

export interface IEvent extends Document {
  title: string;
  description: string;
  deadline: Date;
  attendees: string[];
  listId: mongoose.Schema.Types.ObjectId;
}

const eventSchema: Schema<IEvent> = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  deadline: { type: Date },
  attendees: { type: [String], required: true },
  listId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'List',
    required: true,
  },
});

const Event = mongoose.model<IEvent>('Event', eventSchema);
export default Event;
