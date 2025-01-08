
import mongoose from 'mongoose';
import Product from '../models/productModel.js';
import connectDB from './db.js';
import data from '../data/data.js';

connectDB();

const importData = async()=>{
  try{
    await Product.deleteMany(); //clear db
    const products = data.products.map((product)=>({
      ...product,
      _id: product._id,
    }))
    await Product.insertMany(products); //insert products
    console.log('data imported');
    process.exit();
  }
  catch(err){
    console.error(`error importing data: ${err.message}`);
    process.exit(1);
  }
}

importData();
//import hardcoded data to mongodb