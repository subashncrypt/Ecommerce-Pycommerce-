/**
 * @Author: Dhruvrajsinh Vansia
 * Banner ID: B00891415
 * cart page 
 */

import React, { useEffect } from "react";

import { Box, makeStyles, Typography, Grid, Button } from "@material-ui/core";
import CartItem from "../components/cart/CartItem";
import TotalView from "../components/cart/TotalView";
import Carousel from "react-material-ui-carousel";
import ProductRow from "../components/product/product-grid";
import { useSelector, useDispatch } from "react-redux";
import { getCartItems } from "../actions/cart-action";

import "../styles/home-page.css";
import "react-toastify/dist/ReactToastify.min.css";
import { useHistory } from "react-router-dom";

const useStyle = makeStyles((theme) => ({
  component: {
    marginTop: 65,
    display: "flex",
  },
  RightComponent: {
    paddingRight: 15,
  },
  header: {
    padding: "15px 24px",
    background: "#fff",
  },
  bottom: {
    padding: "16px 22px",
    background: "#fff",
    borderTop: "1px solid #f0f0f0",
  },
  placeOrder: {
    display: "flex",
    marginLeft: "auto",
    background: "#222",
    color: "#fff",
    borderRadius: 2,
    width: 250,
    height: 51,
  },
  placeOrderViewAll: {
    display: "flex",
    background: "#222",
    color: "#fff",
    borderRadius: 2,
    width: 250,
    height: 51,
  },
  banner: {
    margin: "20px 10px 0px 10px",
    minWidth: 960,
    textAlign: "center",
  },
  banner_img: {
    width: "70%",
    height: 480,
    cursor: "pointer",
  },
}));

function CartPage() {
  const classes = useStyle();
  const history = useHistory();

  const user = localStorage.getItem("id");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCartItems());
  }, []);

  const { cartItems } = useSelector((state) => state.cartReducer);


  const sliderItems = cartItems.length > 2 ? 2 : cartItems.length;
  const items = [];

  let categories = {};

  for (let i = 0; i < cartItems.length; i += 1) {
    categories[cartItems[i].disc.category] = categories[
      cartItems[i].disc.category
    ]
      ? categories[cartItems[i].disc.category] + cartItems[i].qty
      : cartItems[i].qty;
  }

  let category,
    maxValue = 0;

  for (const [key, value] of Object.entries(categories)) {
    if (value > maxValue) {
      maxValue = value;
      category = key;
    }
  }

  for (let i = 0; i < cartItems.length; i += sliderItems) {
    if (i % sliderItems === 0) {
      items.push(
        <Grid container key={i}>
          {cartItems.slice(i, i + sliderItems).map((da, i) => {
            return <CartItem key={i.toString()} item={da} />;
          })}
        </Grid>
      );
    }
  }

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 7,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  let title = "";

  if (cartItems?.length == 0) {
    title = "Top deals";
    category = "top_deals";
  } else {
    title = "Frequently bought together";
  }

  return (
    <>
      <br />
      {cartItems?.length == 0 ? (
        <>
          <br />
          <br />
          <Box>
            <Typography
              style={{
                fontWeight: 600,
                fontSize: 24,
                paddingTop: "20px",
                paddingBottom: "20px",
                paddingLeft: "20px",
                width: "75%",
              }}
            >
              Your Cart is Empty.
            </Typography>
            <Grid>
              <ProductRow title="Trending" categoryName="top_offers" />
            </Grid>
            <br/>
            <br/>
          </Box>
        </>
      ) : (
        <Grid container className={classes.component}>
          <Grid
            style={{ paddingBottom: "30px", paddingLeft: "20px", width: "75%" }}
          >
            <Box className={classes.header}>
              <Typography style={{ fontWeight: 600, fontSize: 18 }}>
                My Cart
              </Typography>
            </Box>

            <Grid
              container
              spacing={0}
              direction="column"
              alignItems="center"
              justifyContent="center"
              style={{
                backgroundColor: "#fff",
              }}
            >
              <Carousel
                swipeable={true}
                draggable={false}
                showDots={false}
                responsive={responsive}
                ssr={true}
                infinite={true}
                autoPlay={false}
                autoPlaySpeed={2500}
                keyBoardControl={true}
                customTransition="all 200ms"
                transitionDuration={500}
                containerClass="carousel-container"
                removeArrowOnDeviceType={["mobile"]}
                dotListClass="custom-dot-list-style"
                itemClass="carousel-item-padding-40-px"
              >
                {items}
              </Carousel>
            </Grid>
          </Grid>
          <Grid style={{ paddingLeft: "2em" }} display="flex">
            <TotalView cartItems={cartItems} />
          </Grid>
        </Grid>
      )}
      <Grid>
        <ProductRow title={title} categoryName={category} />
      </Grid>
    </>
  );
}

export default CartPage;
