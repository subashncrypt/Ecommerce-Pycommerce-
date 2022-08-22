/*
* @author: Adesh Nalpet Adimurthy
*/

const { Product } = require("../models/product-model");

/**
 * Get all products.
 * @param {*} req 
 * @param {*} res 
 */
const getProducts = async (req, res) => {
  try {
    const result = await Product.find({});
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

/**
 * Get products by category used in home page and categories page.
 * @param {*} req 
 * @param {*} res 
 */
const getProductsByCategory = async (req, res) => {
  const cName = req.params.categoryName;
  try {
    if (cName === "top_deals") {
      const result = await Product.find({}).skip(3);
      res.json(result);
    } else if (cName === "top_offers") {
      const result = await Product.find({}).skip(5);
      res.json(result);
    } else {
      const result = await Product.find({ category: cName });
      res.json(result);
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

/**
 * Get Product details from product ID.
 * @param {*} req 
 * @param {*} res 
 */
const getProductById = async (req, res) => {
  const productId = req.params.id;
  try {
    const result = await Product.findById(productId);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

/**
 * Add product to the database (Inventory)
 * @param {*} req 
 * @param {*} res 
 */
const addProduct = async (req, res) => {
  console.log(req.body)
  const productData = {
    url: req.body.url,
    title: {
      shortTitle: req.body.title,
      longTitle: req.body.description,
    },
    price: {
      mrp: req.body.mrp,
      cost: req.body.cost,
      discount: req.body.discount,
    },
    tagline: req.body.tag,
    category: req.body.category,
    description: req.body.description,
  };
  try {
    const product = new Product(productData);
    await product.save();
    res.json();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
};

module.exports = {
  getProducts,
  getProductsByCategory,
  getProductById,
  addProduct,
};
