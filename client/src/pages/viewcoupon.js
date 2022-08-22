/**
 * Author: Hemanth Nadipineni
 * Banner ID: B00899473
 */
import React, { useState, useEffect } from "react";
import {
  Grid,
  makeStyles,
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
} from "@material-ui/core";
import { red } from "@material-ui/core/colors";
import Sidebar from "../components/profile/seller-sidebar";
import { useHistory } from "react-router-dom";
/**
 * The useStyles variable will make styles for spaces around the coupons listing rendered.
 */
const useStyles = makeStyles((theme) => ({
  component: {
    marginTop: 55,
    padding: "30px 6%",
    display: "flex",
  },
  leftComponent: {
    paddingRight: 15,
    [theme.breakpoints.between(0, 960)]: {
      paddingRight: 0,
      marginBottom: 20,
    },
  },
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: "56.25%",
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
}));
/**
 * Funtion to view the coupons extracted from the storage. This function will have all the variables required
 * and the functions required to perfrom when edit or delete button is pressed.
 */
function ViewCoupon(props) {
  const [data, setData] = useState([]);

  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const navigate = useHistory();
  /**
   * This function will fetch all the coupons from the storage.
   */
  useEffect(() => {
    fetch("/coupons/list-coupons", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((result) => {
        setData(result);
      });
  });

  /**
   * Funtion to handle the event when edit coupon is clicked
   */
  const editCoupon = (id) => {
    console.log(id);
    navigate.push("/edit-coupon/" + id);
  };
  /**
   * Function to handle the event when delete coupon is clicked
   */
  const deleteCoupon = (id) => {
    fetch(`/coupons/delete-coupon/` + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((result) => console.log(result));
  };

  /**
   * The Card items with coupon data on each card will be rendered.
   */
  return (
    <Grid container className={classes.component}>
      <Grid
        item
        lg={3}
        md={3}
        sm={12}
        xs={12}
        className={classes.leftComponent}
      >
        <Sidebar />
      </Grid>{" "}
      <Grid
        style={{
          background: "#fff",
        }}
        item
        lg={9}
        md={9}
        sm={12}
        xs={12}
      >
        <Grid container className={classes.component} spacing={3}>
          {" "}
          {data.map((item, index) => (
            <Grid
              key={index}
              style={{
                background: "#fff",
              }}
              item
              lg={4}
              md={4}
              sm={6}
              xs={12}
            >
              <div classname="">
                <Card className={classes.root}>
                  <CardContent>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      Coupon Code: {item.couponCode}{" "}
                    </Typography>{" "}
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      Coupon Condition: {item.couponCondition}{" "}
                    </Typography>{" "}
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      Discount Percentage: {item.couponDiscount}{" "}
                    </Typography>{" "}
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      Maximum Off: {item.maximumOff}{" "}
                    </Typography>{" "}
                  </CardContent>{" "}
                  <CardActions disableSpacing className="">
                    <div className="mx-2">
                      <Button
                        style={{
                          backgroundColor: "#EB853B",
                          marginTop: 20,
                          color: "#222",
                          fontWeight: 600,
                          marginRight: 10,
                        }}
                        size="small"
                        variant="contained"
                        type="submit"
                        color="primary"
                        className=""
                        onClick={() => deleteCoupon(item._id)}
                      >
                        DELETE{" "}
                      </Button>{" "}
                    </div>{" "}
                    <div className="mx-2">
                      <Button
                        style={{
                          backgroundColor: "#FFBB38",
                          marginTop: 20,
                          color: "#222",
                          fontWeight: 600,
                          marginRight: 10,
                        }}
                        size="small"
                        variant="contained"
                        type="submit"
                        color="primary"
                        className=""
                        onClick={() => editCoupon(item._id)}
                      >
                        MODIFY{" "}
                      </Button>{" "}
                    </div>{" "}
                  </CardActions>{" "}
                </Card>{" "}
              </div>{" "}
            </Grid>
          ))}{" "}
        </Grid>{" "}
      </Grid>{" "}
    </Grid>
  );
}
/**
 * The function above is exported as view coupons page
 */
export default ViewCoupon;
