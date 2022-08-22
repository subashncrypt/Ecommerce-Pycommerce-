/**
 * @Author: Dhruvrajsinh Vansia
 * Banner ID: B00891415
 * Billing section of the cart
 */

import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  makeStyles,
  Grid,
  Button,
  Card,
  FormControl,
  TextField,
} from "@material-ui/core";
import clsx from "clsx";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addCost } from "../../actions/checkout-action";
import { addDiscount } from "../../actions/order-action";
import { getCartItems } from "../../actions/cart-action";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';


const useStyle = makeStyles({
  header: {
    padding: "15px 24px",
    background: "#fff",
  },
  greyTextColor: {
    color: "#000",
  },
  container: {
    "& > *": {
      marginBottom: 13,
      fontSize: 14,
    },
  },
  price: {
    float: "right",
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: 600,
    borderTop: "1px dashed #e0e0e0",
    padding: "20px 0",
    borderBottom: "1px dashed #e0e0e0",
  },
});

const TotalView = ({ cartItems }) => {
  const classes = useStyle();
  const dispatch = useDispatch();
  const history = useHistory();


  let couponDiscount = 0;

  const onChange = (ev) => {
    if (ev.target.name == "couponCode") {
      setCouponCode(ev.target.value);
    }
  };

  
  useEffect(() => {
    dispatch(getCartItems());
}, []);

  
    let totalCost = 0;
    let totalMrp = 0;
    let totalItems = 0;
    for (let i = 0; i < cartItems.length; i += 1) {
      totalItems += cartItems[i]["qty"];
      totalCost += cartItems[i]["qty"] * cartItems[i]["disc"]["price"]["cost"];
      totalMrp += cartItems[i]["qty"] * cartItems[i]["disc"]["price"]["mrp"];
    }
    const discount = totalMrp - totalCost;
 
    const [couponExist, setCouponExist] = useState(0);
    const [couponApply, setCouponApply] = useState(false);
    const [finalCost, setFinalCost] = useState(totalCost);
    const [totalMrpValue, setTotalMrpValue] = useState(totalMrp);
    const [totalItemsValue, setTotalItemsValue] = useState(totalItems);
    const [discoutValue, setDiscountValue] = useState(discount);
    const [couponCode, setCouponCode] = useState("");
    
  useEffect(() => {
    setTotalItemsValue(totalItems);
    setTotalMrpValue(totalMrp);
    setFinalCost(totalCost);
    setDiscountValue(discount);
  }, [totalCost, totalItems]);

  const handleOnClick = (ev) => {
    fetch("/coupons/list-couponcode/" + couponCode, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((result) => {
        if(result.length > 0){
          couponDiscount = result[0].couponDiscount;
        let maxOff = result[0].maximumOff;
        let x = (finalCost * couponDiscount) / 100;
        if (x > maxOff) {
          setFinalCost(finalCost - maxOff);
          dispatch(addDiscount(maxOff+discount));
        } else {
          setFinalCost(finalCost - x);
          dispatch(addDiscount(x+discount));
        } setCouponExist(0);
        setCouponApply(true);
        }else{
          setCouponExist(1);
        }
      });
  };

  const placeOrder = () => {
    dispatch(addCost(finalCost));
    history.push("/shipping");
  };

  return (
    <>
        <Box>
          <Box
            className={classes.header}
            style={{
              paddingTop: "9px",
              paddingBottom: "9px",
            }}
          >
            <Typography className={classes.greyTextColor}>
              PRICE DETAILS
            </Typography>
          </Box>
          <Box
            className={clsx(classes.header, classes.container)}
            style={{ paddingTop: "2px" }}
          >
            <Typography>
              Price ({totalItemsValue} item)
              <span className={classes.price}>${totalMrpValue}</span>
            </Typography>
            <Typography>
              Discount<span className={classes.price}>-${discoutValue}</span>
            </Typography>
            <Typography>
              Delivery Charges
              <span className={classes.price}>FREE</span>
            </Typography>

            <Typography
              className={classes.totalAmount}
              style={{ paddingTop: "2px" }}
            >
              Total Payable
              <span className={classes.price}>${finalCost}</span>
            </Typography>
            <Typography
              style={{
                fontSize: 16,
                color: "green",
              }}
            >
              Total saving on this order is ${discoutValue}.
            </Typography>
            <Grid
              container
              style={{
                backgroundColor: "#fff",
                // padding: "2px 10px 2px 2px",
              }}
            >
              <>
                {couponApply ? (
                  <>
                    <Typography
                      style={{
                        color: "#222",
                        fontWeight: 600,
                        width: 50,
                        marginLeft: "100px",
                        marginRight: "20px",
                      }}
                    >
                      <span className={classes.price}>{couponCode}</span>
                    </Typography>
                  </>
                ) : (
                  <>
                    <FormControl>
                      <TextField
                        style={{ backgroundColor: "#fff", width: 100 }}
                        variant="filled"
                        size="small"
                        label="Coupon"
                        value={couponCode}
                        onChange={(e) => onChange(e)}
                        name="couponCode"
                      />
                    </FormControl>

                    <Button
                      variant="contained"
                      style={{
                        backgroundColor: "#EB853B",
                        color: "#222",
                        fontWeight: 600,
                        width: 50,
                        marginLeft: "6px",
                      }}
                      onClick={(ev) => handleOnClick(ev)}
                    >
                      Apply
                    </Button>
                    
                  </>
                )}
                <Button
                  variant="contained"
                  style={{
                    backgroundColor: "#EB853B",
                    color: "#222",
                    fontWeight: 600,
                    //marginTop: "10px",
                    marginLeft: "5px",
                    width: 50,
                  }}
                  onClick={placeOrder}
                >
                  Buy
                </Button>
              </>
            </Grid>
            
          </Box>
        </Box>
        <br/>
        <>{ couponExist == 1 ? ( <Alert severity="error">
        {/* <AlertTitle>Error</AlertTitle> */}
         <strong>Coupon does not exist.</strong>
      </Alert>) : (<></>)}
                    </>
                    <br/>

    </>
  );
};

export default TotalView;
