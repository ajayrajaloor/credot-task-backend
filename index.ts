import express, { Application, Request, Response } from "express";
import mongoose from "mongoose";
import cors from "cors";
import ProductModel, { IProduct }  from "./models/productModel";

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

app.get("/", async (req: Request, res: Response) => {
  try {
    let products: IProduct[]; 

    if (req.query.category) {
      const category: string = req.query.category as string;
      products = await ProductModel.find({ category });
    } else {
      products = await ProductModel.find();
    }

    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


app.post("/admin/add-product", async (req: Request, res: Response) => {
  try {
    const { name, price, imageUrl, description, category } = req.body;

    if (typeof name !== 'string' || typeof price !== 'number' || typeof imageUrl !== 'string' ||
        typeof description !== 'string' || typeof category !== 'string') {
      return res.status(400).json({ error: "Invalid data types in the request" });
    }

    if (!imageUrl) {
      return res.status(400).json({ error: "Image is required" });
    }

    const existingProduct = await ProductModel.findOne({ name });

    if (existingProduct) {
      return res
        .status(409)
        .json({
          error: "Product with this name already exists",
          existingProduct,
        });
    }

    const newProduct = await ProductModel.create({
      name,
      price,
      imageUrl,
      description,
      category,
    });

    res.status(201).json({
      message: "Product added successfully",
      product: newProduct,
    });
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


//   app.get('/cart', (req, res) => {
//     res.json(cartItems);
//   });

//   app.post('/cart/add', (req, res) => {
//     const newItem = req.body;
//     const existingItem = cartItems.find((item) => item._id === newItem._id);

//     if (existingItem) {
//       existingItem.quantity += 1;
//     } else {
//       newItem.quantity = 1;
//       cartItems.push(newItem);
//     }

//     res.json({ message: 'Item added to cart' });
//   });

//   app.post('/cart/clear', (req, res) => {
//     cartItems = [];
//     res.json({ message: 'Cart cleared' });
//   });

const port = 3030;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
