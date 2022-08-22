/*
* @author: Indu Munagapati
* User Addresses schema
*/

const mongoose = require("mongoose");

const userAddressSchema = mongoose.Schema({
  emailAddress: {
    type : String,
    required : true
  },
  address: {
    type : String,
    required : true
  }
});

const userAddress = new mongoose.model("user-address", userAddressSchema);

module.exports = userAddress;