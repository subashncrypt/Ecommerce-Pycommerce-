/**
 * Author: Hemanth Nadipineni
 * Banner ID: B00899473
 */
import React from "react";
import { makeStyles } from "@material-ui/core";

import EditCoupon from "../../components/coupon-management/EditCoupon";
import ToastMessageContainer from "../../components/toast";
/**
 * The useStyles variable will make styles for spaces around the edit coupon component rendered.
 */
const useStyles = makeStyles((theme) => ({
  editcoupon: {
    padding: "30px",
    marginTop: 55,
  },
}));
/**
 * Function to render the component usig the styles above and the EditCoupon component from the components page.
 */
function EditCouponPage() {
  const classes = useStyles();

  return (
    <div className={classes.editcoupon}>
      <EditCoupon />
      <ToastMessageContainer />
    </div>
  );
}
/**
 * The function above is exported as edit coupon page
 */
export default EditCouponPage;
