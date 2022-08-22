/*
* @author: Adesh Nalpet Adimurthy
*/

import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Button,
  CircularProgress,
  makeStyles,
  Typography,
} from "@material-ui/core";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import { useEffect } from "react";
import { getProductsByCategory } from "../../actions/product-action";

import "../../styles/product-page.css";

const useStyles = makeStyles({
  row_wrapper: {
    width: "100%",
    minWidth: 960,
    margin: "5px 3px",
    padding: 5,
    backgroundColor: "#ffffff",
  },
  row_container: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    padding: "10px 1%",
  },
  row_title: {
    fontSize: 30,
    fontWeight: 500,
  },
  row_header_subtitle: {
    fontSize: 14,
    opacity: 0.7,
    fontWeight: 400,
  },
  products_wrapper: {
    flex: "85%",
    width: "85%",
    margin: "5px 10px",
    padding: 5,
    backgroundColor: "#ffffff",
  },
  leftContainer: {
    textAlign: "center",
  },
  product_title: {
    fontSize: 14,
    fontWeight: 600,
    marginTop: 10,
    color: "#212F3D",
  },
  product_discount: {
    fontSize: 14,
    color: "#222",
    paddingTop: 5,
  },
  product_tagline: {
    fontSize: 14,
    opacity: 0.7,
    paddingTop: 5,
    color: "#212F3D",
  },
});

function ProductRow({ categoryName, title }) {
  useEffect(() => {
    getProductsByCategory(categoryName).then((data) => {
      setLoadedProducts(data);
      setIsLoading(false);
    });
  }, [categoryName]);

  const [loadedProducts, setLoadedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const classes = useStyles();
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

  return (
    <Box
      className={classes.row_wrapper}>
      <Box className={classes.row_container}>
        <Box className={classes.leftContainer}>
          <h2 className={classes.row_title}>{title}</h2>
          <Link to={`products/${categoryName}`}>
          <Button
            style={{ backgroundColor: "#EB853B", marginTop: 20, color: "#222", fontWeight: 600 }}
            variant="contained"
            color="primary">
            View All
          </Button>
          </Link>
        </Box>
        <Box className={classes.products_wrapper} textAlign="center">
          {isLoading ? (
            <CircularProgress style={{ color: "#222" }} />
          ) : (
            <Carousel
              swipeable={true}
              draggable={false}
              showDots={false}
              responsive={responsive}
              ssr={true}
              infinite={true}
              autoPlay={true}
              autoPlaySpeed={2500}
              keyBoardControl={true}
              customTransition="all 200ms"
              transitionDuration={500}
              containerClass="carousel-container"
              removeArrowOnDeviceType={["mobile"]}
              dotListClass="custom-dot-list-style"
              itemClass="carousel-item-padding-40-px">
              {loadedProducts?.map((product, index) => (
                <Box key={index}>
                  <Link to={`product/${product._id}`}>
                    <img
                      className={`product_img reduce_margin`}
                      src={product.url}
                      alt="banner"/>
                    <Typography className={classes.product_title}>
                      {product.title.shortTitle}
                    </Typography>
                    <Typography className={classes.product_discount}>
                      {product.discount}
                    </Typography>
                    <Typography className={classes.product_tagline}>
                      {product.tagline}
                    </Typography>
                  </Link>
                </Box>
              ))}
            </Carousel>
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default ProductRow;
