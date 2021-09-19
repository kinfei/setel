import * as mongoose from 'mongoose';

export const OrderSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    status: { type: String, required: true },
    created_at: { type: Date },
    updated_at: { type: Date },
  },
  { versionKey: false },
);

export interface Order extends mongoose.Document {
  id: string;
  name: string;
  status: string;
  created_at: Date;
  updated_at: Date;
}
