import mongoose, { Document, Schema } from 'mongoose';

export interface IEvent extends Document {
  title: string;
  description: string;
  date: Date;
  attendees: string[];
  projectId: mongoose.Schema.Types.ObjectId; // Projeye bağlanacak alan
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
  }, // projectId ile bağlantı
});

const Event = mongoose.model<IEvent>('Event', eventSchema);
export default Event;
