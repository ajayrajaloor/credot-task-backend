import express, { Application, Request, Response } from "express";
import mongoose from "mongoose";
import cors from "cors";
import productRoutes from './routes/productRoutes'

const app: Application = express();
const url: string =
  "mongodb+srv://ajayrajaloor:gVrR0QlfbqujPDZN@cluster0.hdhiush.mongodb.net/?retryWrites=true&w=majority";

async function connectDB() {
  try {
    await mongoose.connect(url);
    console.log("MongoDB has been connected");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/',productRoutes)


const port = 3030;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
