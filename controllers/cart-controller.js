/**
 * @Author: Dhruvrajsinh Vansia
 * Banner ID: B00891415
 * Cart controller
 */

const mongoose = require("mongoose");
const Cart = require("../models/cart-model");

const addItem = async (req, res) => {
  try {
    const cart = new Cart(req.body);
    await cart.save();
    res.send();
  } catch (error) {
    console.log(error);
    res.status(500).send();
  }
};

const removeItem = async (req, res) => {
  try {
    const userId = mongoose.Types.ObjectId(req.body.userId);
    const productId = mongoose.Types.ObjectId(req.body.productId);
    await Cart.findOneAndRemove({ userId: userId, productId: productId });
    res.send();
  } catch (error) {
    console.log(error);
    res.status(204).send();
  }
};

const getCartItems = async (req, res) => {
  try {
    const uId = mongoose.Types.ObjectId(req.params.id);
    const cartItems = await Cart.aggregate([
      {
        $match: {
          userId: uId,
        },
      },
      {
        $lookup: {
          from: "products",
          localField: "productId",
          foreignField: "_id",
          as: "productDetails",
        },
      },
    ]);
    res.json(cartItems);
  } catch (error) {
    console.log("Hello: ", error);
    res.status(500).send();
  }
};

const updateQuantity = async (req, res) => {

  const filter = { userId : mongoose.Types.ObjectId(req.body.userId),  productId : mongoose.Types.ObjectId(req.body.productId)}
  const update = {  qty : req.body.qty }
 try{
  const updated = await Cart.findOneAndUpdate(filter,{$set: update}, {returnNewDocument: true})
    res.json(updated)
 }catch(error){
  console.log(error)
 }
};

const removeAllItem = async (req, res) => {
  try {
    const userId = mongoose.Types.ObjectId(req.body.userId);
    await Cart.deleteMany({ userId: userId });
    res.send();
  } catch (error) {
    console.log(error);
    res.status(404).json({ error: "CLEAR_CART" });
  }
};


module.exports = { addItem, getCartItems, removeItem, updateQuantity, removeAllItem };
