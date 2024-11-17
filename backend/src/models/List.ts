import mongoose, { Document, Schema } from 'mongoose';

export interface IList extends Document {
  name: string;
  projectId: mongoose.Schema.Types.ObjectId;
  events: mongoose.Schema.Types.ObjectId[];
}

const listSchema: Schema<IList> = new Schema({
  name: { type: String, required: true },
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true,
  },
  events: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' }],
});

const List = mongoose.model<IList>('List', listSchema);
export default List;
