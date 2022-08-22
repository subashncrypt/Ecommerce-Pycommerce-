/**
 * Author: Hemanth Nadipineni
 * Banner ID: B00899473
 * Model for Coupons
 */
const Coupon = require("../models/coupon-model");

/**
 * Method to list all the coupons
 */
const listCoupons = async (req, res) => {
  try {
    const coupons = await Coupon.find({});
    res.set('Access-Control-Allow-Origin', '*');
    res.json(coupons);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

/**
 * Method to list a coupon by Id
 */
 const listCouponById = async (req, res) => {
  try {
    const coupons = await Coupon.findById(req.params.id);
    res.json(coupons);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

/**
 * Method to list a coupon by couponCode
 */
 const listCouponByCouponCode = async (req, res) => {
  try {
    const coupons = await Coupon.find({ couponCode: req.params.couponCode });
    res.json(coupons);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

/**
 * Method to add a coupon
 */

const addCoupon = async (req, res) => {
  const couponData = {
    couponCode: req.body.couponCode,
    couponCondition: req.body.couponCondition,
    couponDiscount: req.body.couponDiscount,
    maximumOff: req.body.maximumOff,
  };
  try {
    const coupon = new Coupon(couponData);
    await coupon.save();
    res.json();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
};

/**
 * Method to add a coupon by Id
 */
const updateCouponById = async (req, res) => {
  try {
    await Coupon.findByIdAndUpdate(
      req.params.id,
      {
        couponCode: req.body.couponCode,
        couponCondition: req.body.couponCondition,
        couponDiscount: req.body.couponDiscount,
        maximumOff: req.body.maximumOff,
      },
      { new: true }
    );
    res.json({
      success: true,
      message: "Coupon Updated",
    });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

/**
 * Method to delete a coupon by Id
 */
const deleteCouponById = async (req, res) => {
  try {
    await Coupon.findByIdAndRemove(req.params.id);
    res.json({
      success: true,
      message: "Coupon Deleted",
    });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

module.exports = {
  listCoupons,
  listCouponById,
  listCouponByCouponCode,
  addCoupon,
  updateCouponById,
  deleteCouponById,
};
