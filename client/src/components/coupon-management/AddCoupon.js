/**
 * Author: Hemanth Nadipineni
 * Banner ID: B00899473
 */
/*
Component to add a coupon.
Referenced from the tutorial on freecodecamp: https://www.freecodecamp.org/news/react-crud-app-how-to-create-a-book-management-app-from-scratch/
*/
import React, { useContext } from "react";
import CouponForm from "./CouponForm";
import CouponsContext from "../../context/CouponsContext";
const AddCoupon = ({ history }) => {
  const { coupons, setCoupons } = useContext(CouponsContext);

  /**
   * Handling on submit event when the form from coupon component has been filled
   * and the coupons variable will be initialized.
   * Th function will redirect to coupons list page. 
   */
  const handleOnSubmit = (coupon) => {
    setCoupons([coupon, ...coupons]);
    history.push("/coupons/list");
  };

  return (
    <React.Fragment>
      <CouponForm handleOnSubmit={handleOnSubmit} />{" "}
    </React.Fragment>
  );
};

/**
 * The function is exported as AddCoupon component
 */
export default AddCoupon;
