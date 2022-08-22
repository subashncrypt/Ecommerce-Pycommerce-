/**
 * Author: Meghdoot Ojha
 * Banner ID: B00854209
 */
const Inventory = require("../models/inventory-model");

/**
 * Method to list all the products
 */
const viewInventoryProduct = async (req, res) => {
    try {
        const product = await Inventory.find({});
        res.status(200).json({ success: 'ok', products: product });
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

/**
 * Method to add a product
 */

const addInventoryProduct = async (req, res) => {
    const inventoryData = {
        productCategory: req.body.productCategory,
        productName: req.body.productName,
        productSerial: req.body.productSerial,
        price: req.body.price,
        discount: req.body.discount,
        quantity: req.body.quantity,
        image: req.body.image,
    };
    try {
        const inventory = new Inventory(inventoryData);
        await inventory.save();
        res.status(200).json({ success: 'ok' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error });
    }
};

/**
 * Method to update product
 */
const updateInventoryProductById = async (req, res) => {
    const inventoryData = {
        productCategory: req.body.productCategory,
        productName: req.body.productName,
        productSerial: req.body.productSerial,
        price: req.body.price,
        discount: req.body.discount,
        quantity: req.body.quantity,
        image: req.body.image,
    };
    console.log(inventoryData, req.params.id)
    try {
        await Inventory.findByIdAndUpdate(
            req.params.id,

            inventoryData,

            //{ new: true }
        );
        res.status(200).json({
            success: true,
            message: "Product Updated",
        });
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

const getInventoryProductById = async (req, res) => {
    const productId = req.params.id;
    try {
        const result = await Inventory.findById(productId);
        res.status(200).json({ success: "ok", product: result });
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

/**
 * Method to delete a product by Id
 */
const deleteInventoryProductsById = async (req, res) => {
    try {
        await Inventory.findByIdAndRemove(req.params.id);
        res.status(200).json({
            success: true,
            message: "Product Deleted",
        });
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

module.exports = {
    viewInventoryProduct,
    addInventoryProduct,
    updateInventoryProductById,
    deleteInventoryProductsById,
    getInventoryProductById
};
