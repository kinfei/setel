import * as mongoose from 'mongoose';

export const OrderSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    status: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String },
    created_at: { type: Date },
    updated_at: { type: Date },
  },
  { versionKey: false },
);

export interface Order extends mongoose.Document {
  id: string;
  name: string;
  price: number;
  description: string;
  status: string;
  created_at: Date;
  updated_at: Date;
}
