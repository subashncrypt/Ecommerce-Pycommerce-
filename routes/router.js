const express = require("express");

const {
  getProducts,
  getProductById,
  addProduct,
  getProductsByCategory,
} = require("../controllers/product-controller");

const {
  addItemToFavorites,
  removeItemFromFavorites,
  getFavoritesItems,
} = require("../controllers/favorites-controller");

const {
  verifyEmailAddress,
  userRegistration,
  userLogin,
  forgotPassword,
  sellerRegistration,
} = require("../controllers/user-controller");

const {
    addAddress,
    modifyAddress,
    viewAddresses,
    deleteAddress,
} = require("../controllers/user-addresses-controller");
 
const {
  addItem,
  removeItem,
  getCartItems,
  updateQuantity,
  removeAllItem
} = require("../controllers/cart-controller");

const { addCost } = require("../controllers/checkout-controller");

const {
  listCoupons,
  addCoupon,
  listCouponById,
  listCouponByCouponCode,
  deleteCouponById,
  updateCouponById
 } = require("../controllers/coupon-controller");

const {
  addInventoryProduct,
  viewInventoryProduct,
  updateInventoryProductById,
  deleteInventoryProductsById,
  getInventoryProductById
} = require("../controllers/inventory-controller");

const {
  addComment,
  getCommentByProductId,
} = require("../controllers/comment-controller");

const {
  getUserDetails,
  changePassword,
  updatePhoneNumber
} = require("../controllers/profile-info-controller");

const { verifyJWT } = require("../authentication/authentication");
const{
  createPaymentIntent
} = require("../controllers/payment-controller");

const {
  createOrderDetails, getOrderDetails, updateOrderDetails
} = require("../controllers/order-controller");

const router = express.Router();

router.post("/register", userRegistration);
router.post("/verifyemail", verifyEmailAddress);
router.post("/login", userLogin);
router.post("/forgotpassword", forgotPassword);
router.post("/sellerregistration", verifyJWT, sellerRegistration);

router.post("/add-address", verifyJWT, addAddress);
router.post ("/modify-address", verifyJWT, modifyAddress);
router.get("/view-addresses/:id", verifyJWT, viewAddresses );
router.delete("/delete-address/:id", verifyJWT, deleteAddress);

router.get("/userinfo/:id", verifyJWT, getUserDetails);
router.post("/changepassword", verifyJWT, changePassword);
router.post("/updatephonenumber", verifyJWT, updatePhoneNumber);

router.get("/products/get-products", getProducts);
router.get("/products/get-products/:categoryName", getProductsByCategory);
router.get("/products/get-product/:id", getProductById);
router.post("/products/add-product", addProduct);

router.post("/favorites/add-item", addItemToFavorites);
router.delete("/favorites/remove-item", removeItemFromFavorites);
router.get("/favorites/get-items/:id", getFavoritesItems);

router.post("/addcomment", addComment);
router.get("/getcomment/:id", getCommentByProductId);

router.post("/cart/add-item", addItem);
router.delete("/cart/remove-item", removeItem);
router.get("/cart/get-items/:id", getCartItems);
router.patch("/cart/item/updatequantity", updateQuantity);
router.delete("/cart/removeall", removeAllItem);

router.post("/checkout", addCost);

router.get("/coupons/list-coupons", listCoupons);
router.get("/coupons/list-coupon/:id", listCouponById);
router.get("/coupons/list-couponcode/:couponCode", listCouponByCouponCode);
router.post("/coupons/add-coupon", addCoupon);
router.put("/coupons/update-coupon/:id", updateCouponById);
router.delete("/coupons/delete-coupon/:id", deleteCouponById);

router.post("/inventory/add-product", addInventoryProduct);
router.put("/inventory/update-product/:id", updateInventoryProductById);
router.delete("/inventory/delete-product/:id", deleteInventoryProductsById);
router.get("/inventory/product/:id", getInventoryProductById);

router.get("/inventory/products", viewInventoryProduct);

router.post("/payment/create-payment-intent", createPaymentIntent);

router.post("/order/create-order", createOrderDetails);
router.get("/order/get-order", getOrderDetails);
router.post("/order/update-order", updateOrderDetails);

module.exports = router;
