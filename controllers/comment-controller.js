/*
 * @author: Subash Narayanan
    comment controller to query and insert comments into the data base.
 */

const mongoose = require("mongoose");
const Comment = require("../models/comment-model");
const userModel = require("../models/user-model");

const addComment = async (req, res) => {
  const getUser = await userModel.find({ emailAddress: req.body.emailAddress });
  const com = {
    userId: req.body.userId,
    productId: req.body.productId,
    name: req.body.emailAddress,
    rating: req.body.rating,
    title: req.body.title,
    comment: req.body.comment,
    cdate: req.body.cdate,
  };

  try {
    const newComment = new Comment(com);
    //creating new user model in the DB
    await newComment.save();

    res.status(201).json({
      message: "Review added sucessfully",
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal server error " + err,
    });
  }
};

const getCommentByProductId = async (req, res) => {
  const productid = req.params.id;
  try {
    const result = await Comment.find({ productId: productid });
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

module.exports = {
  addComment,
  getCommentByProductId,
};
