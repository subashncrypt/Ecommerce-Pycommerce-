/**
 * @Author: Dhruvrajsinh Vansia
 * Banner ID: B00891415
 * Counter functionality of the cart item
 */


import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ButtonGroup, Button, makeStyles } from "@material-ui/core";
import { updateQty, getCartItems } from "../../actions/cart-action";

const useStyle = makeStyles({
  component: {
    marginTop: 30
  },
  button: {
    borderRadius: "50%"
  }
});

const CounterButton = ({product}) => {
  const classes = useStyle();
  const dispatch = useDispatch();

  const [counter, setCounter] = useState(product.qty);

  useEffect(() => {
      dispatch(getCartItems());
  }, []);

  const handleIncrement = () => {
      setCounter(counter => counter + 1);
      let qty = counter + 1
      dispatch(updateQty(product, qty ));
  };

  const handleDecrement = () => {
    setCounter(counter => counter - 1);
    let qty = counter - 1
    dispatch(updateQty(product, qty));
  };


  return <>
      <ButtonGroup className={classes.component}>
        <Button className={classes.button} onClick={() => handleDecrement()} disabled={counter == 1}>
          -
        </Button>
        <Button disabled style={{color: "#000"}}>{counter}</Button>
        <Button className={classes.button} onClick={() => handleIncrement()}>
          +
        </Button>
      </ButtonGroup>
    </>;
};

export default CounterButton;