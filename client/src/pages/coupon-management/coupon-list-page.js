/**
 * Author: Hemanth Nadipineni
 * Banner ID: B00899473
 */
import React from "react";
import { makeStyles } from "@material-ui/core";

import CouponsList from "../../components/coupon-management/CouponsList";
import ToastMessageContainer from "../../components/toast";
/**
 * The useStyles variable will make styles for spaces around the coupons list component rendered.
 */
const useStyles = makeStyles((theme) => ({
  couponslist: {
    padding: "30px",
    marginTop: 55,
  },
}));
/**
 * Function to render the component usig the styles above and the Coupons List component from the components page.
 */
function CouponsListPage() {
  const classes = useStyles();

  return (
    <div className={classes.couponslist}>
      <CouponsList />
      <ToastMessageContainer />
    </div>
  );
}
/**
 * The function above is exported to list coupons page
 */
export default CouponsListPage;
