/*
 * @author: Subash Narayanan
 * Comments: comments of a particular product
 */

const mongoose = require("mongoose");

const comments = mongoose.Schema({
  userId: {
    type: String,
  },
  productId: {
    type: String,
  },
  name: {
    type: String,
  },
  rating: {
    type: Number,
  },
  title: {
    type: String,
  },
  comment: {
    type: String,
  },
  cdate: {
    type: Date,
    default: Date.now,
  },
});

const Comment = new mongoose.model("comment", comments);

module.exports = Comment;
