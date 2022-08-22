import { Box, makeStyles } from '@material-ui/core';
import React from 'react'
import ToastMessageContainer from '../components/toast';
import ShippingPage from './shipping-page';


const useStyles = makeStyles((theme) => ({
  component: {
    marginTop: 70,
    // padding: "30px 6%",
    // display: "flex",
  },
  leftComponent: {
    paddingRight: 15,
    [theme.breakpoints.between(0, 960)]: {
      paddingRight: 0,
      marginBottom: 20,
    },
  },
}));

function PaymentPage() {
  const classes = useStyles();
  return (
    <div>
      <Box className={classes.component}>
        <ShippingPage />
      </Box>
      <ToastMessageContainer />
    </div>
  )
}

export default PaymentPage