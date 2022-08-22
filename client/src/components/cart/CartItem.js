/**
 * @Author: Dhruvrajsinh Vansia
 * Banner ID: B00891415
 * cart item component
 */


import {
  Card,
  makeStyles,
  Box,
  Typography,
  Button,
  Grid,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import clsx from "clsx";
import { Shorten } from "../../utils/string-util";
import CounterButton from "./CounterButton";
import AlertDialogBox from "../alert-box";
import { useState } from "react";

const useStyle = makeStyles({
  component: {
    display: "flex",
    justifyContent: "space-between",
    height: "100%",
    position: "relative",
  },
  leftComponent: {
    margin: 20,
    display: "flex",
    flexDirection: "column",
  },
  itemTitle: {
    color: "#000",
  },
  image: {
    height: 110,
    width: 110,
    objectFit: "contain",
  },
  mid: {
    margin: 0,
  },
  greyTextColor: {
    color: "#000",
  },
  smallText: {
    fontSize: 14,
  },
  price: {
    fontSize: 18,
    fontWeight: 600,
  },
  remove: {
    marginTop: 12,
    fontSize: 16,
  },
});

const CartItem = ({ item }) => {
  const classes = useStyle();
  const [isOpenDialog, setIsOpenDialog] = useState(false);

  const dialogClose = () => {
    setIsOpenDialog(false);
  };

  const dialogOpen = () => {
    setIsOpenDialog(true);
  };

  return (
    <>
    <Grid style={{paddingRight:'0px', paddingLeft:'10px', marginRight:'10px', paddingBottom:'10px', paddingTop: '10px'}} >
      
        <Card className={classes.component} raised elevation={5} style={{paddingLeft: '15px', paddingRight: '15px'}}>
          <Box className={classes.leftComponent}>
            <img src={item.disc.url} className={classes.image} />
            <CounterButton product={item} />
          </Box>
          <Box style={{marginRight:'20px'}} >
            <Link to={`/product/${item.disc._id}`}>
          
              <Typography className={classes.itemTitle}  style={{
                  marginTop: '10px',
                }}>
                {item.disc.title.longTitle && Shorten(item.disc.title.longTitle)}
              </Typography>
              <Typography
                className={clsx(classes.greyTextColor, classes.smallText)}
                style={{
                  marginTop: 5,
                }}
              >
                Seller: PyCommerce
              </Typography>
              <Typography
                style={{
                  margin: "20px 0",
                  color: "#000",
                }}
              >
                <span className={classes.price}>${item.disc.price.cost}</span>
                &nbsp;&nbsp;
                <span className={classes.greyTextColor}>
                  <strike>${item.disc.price.mrp}</strike>
                </span>
                &nbsp;&nbsp;
                <span
                  style={{
                    color: "#222",
                  }}
                >
                  {item.disc.price.discount}% off
                </span>
              </Typography>
             </Link>
          
            <Button className={classes.remove} onClick={dialogOpen}>
              Remove
            </Button>
          </Box>
        </Card>
      </Grid>
      <AlertDialogBox
        isOpenDialog={isOpenDialog}
        handleClose={dialogClose}
        itemId={item.disc._id}
        type="cart"
      />
    </>
  );
};

export default CartItem;
