/*
* @author: Adesh Nalpet Adimurthy
* Generic product image slider component used in home page and cart page.
*/

import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import clsx from "clsx";
import { Button, Box, makeStyles } from "@material-ui/core";
import { ShoppingCart as Cart, FlashOn as Flash } from "@material-ui/icons";
import FavoriteIcon from "@material-ui/icons/Favorite";
import toastMessage from "../../utils/toast-message";
import { addToFavorites, getFavoritesItems, removeFromFavorites } from "../../actions/favorite-action";
import { addToCart } from "../../actions/cart-action";


const useStyle = makeStyles((theme) => ({
  leftContainer: {
    minWidth: "40%",
    textAlign: "center",
    padding: "20px 40px 20px 20px",
    [theme.breakpoints.down("md")]: {
      padding: "20px 40px",
    },
  },
  imageBox: {
    padding: "10px",
    border: "1px solid #f0f0f0",
    width: "100%",
    height: 350,
  },
  image: {
    objectFit: "contain",
    height: "90%",
    width: "90%",
  },
  favorite: {
    cursor: "pointer",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    left: "91%",
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    border: "1px solid #f0f0f0",
    background: "#fff",
    color: "#c2c2c2",
  },
  button: {
    width: "40%",
    borderRadius: 2,
    height: 50,
  },
  addToCart: {
    background: "#696969",
    color: "#FFF",
  },
  buyNow: {
    background: "#222",
    color: "#FFF",
  },
  red: {
    color: "#ff4343",
  },
}));

const ProductImageSlider = ({ product }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const classes = useStyle();
  const dispatch = useDispatch();
  const { favoritesItems } = useSelector((state) => state.favoritesReducer);
  const { id } = useParams();

  useEffect(() => {
    dispatch(getFavoritesItems());
  }, [dispatch]);

  useEffect(() => {
    favoritesItems.map((item) => {
      if (item._id == id) {
        setIsFavorite(true);
      }
    });
  }, [favoritesItems]);

  const [cartButton, setCartButton] = useState("ADD TO CART")

  const addItemToCart = () => {
    dispatch(addToCart(product));
    setCartButton("ADDED")
    // history.push("/cart");
  };

  const handleFavorites = () => {
    if(localStorage.getItem('id') === null) {
      toastMessage("Login to add!", "error");
    } else {
      if (isFavorite) {
        dispatch(removeFromFavorites(product._id));
        setIsFavorite(false);
        toastMessage("Removed from favorites", "success");
      } else {
        dispatch(addToFavorites(product));
        setIsFavorite(true);
        toastMessage("Added to favorites", "success");
      }
    }
    
  };

  return (
    <Box className={classes.leftContainer}>
      <Box className={classes.imageBox}>
        <Box className={classes.favorite} onClick={handleFavorites}>
          <FavoriteIcon
            className={isFavorite ? classes.red : ""}
            style={{ fontSize: 18 }}
          />
        </Box>
        <img
          src={product.url}
          className={classes.image}
          alt={product.title.longTitle}
        />
      </Box>
      <br />
        <Button
          className={clsx(classes.button, classes.addToCart)}
          style={{ marginRight: 10, backgroundColor: "#FFC046", color: "#222", fontWeight: 600 }}
          variant="contained"
          onClick={() => addItemToCart()}>
          <Cart />
          {cartButton}
        </Button>
      
      <Link to="/cart">
        <Button
          className={clsx(classes.button, classes.buyNow)}
          variant="contained"
          style={{ backgroundColor: "#EB853B", fontWeight: 600, color: "#222", }}>
          <Flash /> Buy Now
        </Button>
      </Link>
    </Box>
  );
};

export default ProductImageSlider;
