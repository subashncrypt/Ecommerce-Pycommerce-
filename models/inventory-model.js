/**
 * Author: Meghdoot Ojha
 * Banner ID: B00854209
 * Model for Inventory
 */
 const mongoose = require("mongoose");

 const inventorySchema = mongoose.Schema({
   productCategory: {
     type: String,
     required: true
   },
   productName: {
     type: String,
     required: true
   },
   productSerial: {
     type: Number,
     required: true
   },
   price:  {
     type: Number,
     required: true
   },
   discount:  {
    type: Number,
    required: true
  },
  quantity:  {
    type: Number,
    required: true
  },
  image:  {
    type: String,
    required: true
  }
 });
 
 const Inventory = new mongoose.model("inventory", inventorySchema);
 
 module.exports = Inventory;
 