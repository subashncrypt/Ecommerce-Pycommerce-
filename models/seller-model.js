/*
* @author: Indu Munagapati
* Seller details schema
*/

const mongoose = require("mongoose");

const sellerSchema = mongoose.Schema({
  emailAddress: {
    type : String,
    required : true
  },
  companyName: {
    type : String,
    required : true
  },
  companyRegistrationNumber: {
    type : String,
    required : true
  },
  location: {
    type : String,
    required : true
  }
});

const Seller = new mongoose.model("seller", sellerSchema);

module.exports = Seller;
