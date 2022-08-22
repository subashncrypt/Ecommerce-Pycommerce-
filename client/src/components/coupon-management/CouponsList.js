/**
 * Author: Hemanth Nadipineni
 * Banner ID: B00899473
 */
/*
Component to display all coupons.
Referenced from the tutorial on freecodecamp: https://www.freecodecamp.org/news/react-crud-app-how-to-create-a-book-management-app-from-scratch/
*/
import React, { useContext } from "react";
import _ from "lodash";
import Coupon from "./Coupon";
import CouponsContext from "../../context/CouponsContext";
/**
 * Get the list of coupons with thier details from the coupons context.
 */
const CouponsList = () => {
  const { coupons, setCoupons } = useContext(CouponsContext);
/**
 * Function to handle the coupon deletion events.
 */
  const handleRemoveCoupon = (id) => {
    setCoupons(coupons.filter((coupon) => coupon.id !== id));
  };
/**
 *  The remaining coupons will be returned and rendered, otherwise put a message to show No coupons are available.
 */
  return (
    <React.Fragment>
      <div className="coupon-li">
        {" "}
        {!_.isEmpty(coupons) ? (
          coupons.map((coupon) => (
            <Coupon
              key={coupon.id}
              {...coupon}
              handleRemoveCoupon={handleRemoveCoupon}
            />
          ))
        ) : (
          <p className="message">
            {" "}
            No coupons available.Please add some coupons.{" "}
          </p>
        )}{" "}
      </div>{" "}
    </React.Fragment>
  );
};
/**
 * The function above is exported as CouponsList component
 */
export default CouponsList;
