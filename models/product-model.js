/*
* @author: Adesh Nalpet Adimurthy
* Product details schema
*/

const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  title: {
    shortTitle: String,
    longTitle: String,
  },
  price: {
    mrp: Number,
    cost: Number,
    discount: String,
  },
  qty: Number,
  category: String,
  tagline: String,
  url: String,
  description: String
});

const Product = new mongoose.model("product", productSchema);

module.exports = { productSchema, Product };
