/**
 * Author: Hemanth Nadipineni
 * Banner ID: B00899473
 */
import React from "react";
import { makeStyles } from "@material-ui/core";

import AddCoupon from "../../components/coupon-management/AddCoupon";
import ToastMessageContainer from "../../components/toast";
/**
 * The useStyles variable will make styles for spaces around the coupon component rendered.
 */
const useStyles = makeStyles((theme) => ({
  addcoupon: {
    padding: "30px",
    marginTop: 55,
  },
}));
/**
 * Function to render the component usig the styles above and the Addcoupon component from the components page.
 */
function AddCouponPage() {
  const classes = useStyles();

  return (
    <div className={classes.addcoupon}>
      <AddCoupon />
      <ToastMessageContainer />
    </div>
  );
}
/**
 * The function above is exported as add coupon page
 */
export default AddCouponPage;
