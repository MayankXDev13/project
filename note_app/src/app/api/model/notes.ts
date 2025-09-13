import mongoose, { Schema, Document } from "mongoose";

export interface INotes extends Document {
  title: string;
  content: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const NotesSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true, unique: true },
  },
  { timestamps: true },
);


const Notes = mongoose.models.Notes || mongoose.model<INotes>("Notes", NotesSchema);

export default Notes;
