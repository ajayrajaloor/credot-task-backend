import { Document, Schema, model, Model } from "mongoose";

export interface IProduct extends Document {
  name: string;
  price: number;
  imageUrl: string;
  description: string;
  category: string;
}

const ProductSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      unique: true,
    },
    price: {
      type: Number,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    category: {
      type: String,
    },
  },
  { timestamps: true }
);

const ProductModel: Model<IProduct> = model<IProduct>("Product", ProductSchema);

export default ProductModel;
