const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const productModel = require("./models/productModel");

const app = express();
const url =
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


  
  app.get("/", async (req, res) => {
    try {
        let products;
        if(req.query.category){
            products = await productModel.find({category:req.query.category})
        }else{
             products = await productModel.find();
        }
      
      res.json(products);
    } catch (error) {
      console.error("Error fetching products:", error);
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