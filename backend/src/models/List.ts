import mongoose, { Document, Schema } from 'mongoose';
import eventSchema, { IEvent } from './Event'; // Import the Event schema

export interface IEventCategory {
  name: string;
  events: IEvent[];
}

export interface IList extends Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  eventCategories: IEventCategory[]; // Array of event categories, each with a name and events
}

export const listSchema: Schema<IList> = new Schema({
  _id: { type: Schema.Types.ObjectId, auto: true },
  name: { type: String, required: true },
  eventCategories: [
    {
      name: { type: String, required: true }, // Name of the event category
      events: { type: [eventSchema], default: [] }, // List of events under each category
    },
  ],
});

const List = mongoose.model<IList>('List', listSchema);
export default List;
