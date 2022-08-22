/**
 * Author: Hemanth Nadipineni
 * Banner ID: B00899473
 */
/*
Referenced from the tutorial on freecodecamp: https://www.freecodecamp.org/news/react-crud-app-how-to-create-a-book-management-app-from-scratch/
*/
import React from "react";
import { Card } from "react-bootstrap";
import { Button, makeStyles, Box, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";


/**
 * The useStyles variable will make styles for the button used in the card body below.
 */
const useStyles = makeStyles((theme) => ({
  btn: {
    color: "#222",
    fontWeight: 600,
    textTransform: "capitalize",
    cursor: "pointer",
    borderRadius: 2,
    height: 35,
    padding: "5px 35px",
    border: "1px solid #FFBB38",
    boxShadow: "none",
  },
}));

/*
Component of a coupon on list page.
Referenced from the tutorial on https://medium.com/free-code-camp/crud-using-react-41d047224e26
*/
const Coupon = ({
  id,
  couponcode,
  condition,
  discountpercentage,
  maxdiscount,
  date,
  handleRemoveCoupon,
}) => {
  const classes = useStyles();
  const history = useHistory();

  /**
   *  The Title card with details of coupon + Edit and Delete options are rendered and returned.
   */
  return (
    <Card style={{ width: "18rem" }} className="coupon">
      <Card.Body>
        <Card.Title className="copoun-ti"> {couponcode} </Card.Title>{" "}
        <div className="copoun-de">
          <div> Condition: {condition} </div>{" "}
          <div> Maximum_Amount_OFF: {maxdiscount} </div>{" "}
          <div> Discount_Percentage: {discountpercentage} </div>{" "}
          <div> Date: {new Date(date).toDateString()} </div>{" "}
        </div>{" "}
        <Button
          className={classes.btn}
          onClick={() => history.push(`/edit/${id}`)}
        >
          Edit{" "}
        </Button>{" "}
        <Button className={classes.btn} onClick={() => handleRemoveCoupon(id)}>
          Delete{" "}
        </Button>{" "}
      </Card.Body>{" "}
    </Card>
  );
};
/**
 * The function above is exported as Coupon component
 */
export default Coupon;
