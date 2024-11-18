import mongoose, { Document, Schema } from 'mongoose';

export interface IList extends Document {
  name: string;
  projectId: mongoose.Schema.Types.ObjectId;
  events: mongoose.Schema.Types.ObjectId[];
  color: string;
}

const listSchema: Schema<IList> = new Schema({
  name: { type: String, required: true },
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true,
  },
  events: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' }],
  color: { type: String, default: '#101204' },
});

const List = mongoose.model<IList>('List', listSchema);
export default List;
