/*
* @author: Adesh Nalpet Adimurthy
*/

const mongoose = require("mongoose");
const Favorites = require("../models/favorites-model");

/**
 * Add items to favorites for a given user-id and product-id
 * @param {*} req 
 * @param {*} res 
 */
const addItemToFavorites = async (req, res) => {
  try {
    const favorites = new Favorites(req.body);
    await favorites.save();
    res.send();
  } catch (error) {
    console.log(error);
    res.status(500).send();
  }
};

/**
 * Remove item from favorites for a given user-id and product-id
 * @param {*} req 
 * @param {*} res 
 */
const removeItemFromFavorites = async (req, res) => {
  try {
    const userId = mongoose.Types.ObjectId(req.body.userId);
    const productId = mongoose.Types.ObjectId(req.body.productId);
    await Favorites.deleteOne({ userId: userId, productId: productId });
    res.send();
  } catch (error) {
    console.log(error);
    res.status(204).send();
  }
};

/**
 * Get all products in favorites for a given user-id.
 * @param {*} req 
 * @param {*} res 
 */
const getFavoritesItems = async (req, res) => {
  try {
    const uId = mongoose.Types.ObjectId(req.params.id);
    const items = await Favorites.aggregate([
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
    res.json(items);
  } catch (error) {
    console.log(error);
    res.status(500).send();
  }
};

module.exports = { addItemToFavorites, getFavoritesItems, removeItemFromFavorites };
