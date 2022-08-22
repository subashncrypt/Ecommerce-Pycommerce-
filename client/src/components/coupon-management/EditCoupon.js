/**
 * Author: Hemanth Nadipineni
 * Banner ID: B00899473
 */
/*
Component to edit a coupon.
Referenced from the tutorial on freecodecamp: https://www.freecodecamp.org/news/react-crud-app-how-to-create-a-book-management-app-from-scratch/
*/
import React, { useContext } from "react";
import CouponForm from "./CouponForm";
import { useParams } from "react-router-dom";
import CouponsContext from "../../context/CouponsContext";

const EditCoupon = ({ history }) => {
  const { coupons, setCoupons } = useContext(CouponsContext);
  const { id } = useParams();
  const couponToEdit = coupons.find((coupon) => coupon.id === id);
/**
 * The function will handle the events for submission of coupons and show the list of coupons after submission.
 */
  const handleOnSubmit = (coupon) => {
    const filteredCoupons = coupons.filter((coupon) => coupon.id !== id);
    setCoupons([coupon, ...filteredCoupons]);
    history.push("/coupons/list");
  };

  return (
    <div>
      <CouponForm coupon={couponToEdit} handleOnSubmit={handleOnSubmit} />{" "}
    </div>
  );
};
/**
 * The function above is exported as EditCoupon component
 */
export default EditCoupon;
