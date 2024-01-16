import { Request,Response } from "express";
import ProductModel,{IProduct} from "../models/productModel";


const getProducts = async(req:Request,res : Response) =>{
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
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
}


const addProduct = async(req:Request, res : Response) =>{
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
}

export default {getProducts,addProduct}