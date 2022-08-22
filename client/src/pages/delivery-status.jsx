import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Typography from '@material-ui/core/Typography';
import { Box } from '@material-ui/core';
import { useLocation } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    "& .MuiStepIcon-active": { color: "#4BBC57" },
    "& .MuiStepIcon-completed": { color: "#4BBC57" }
  },
  header: {
    padding: "20px 40px",
    fontSize: 18,
    fontWeight: 500,
    borderBottom: "1px solid #e0e0e0",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '35%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function getSteps() {
  return ['Order Placed', 'Order Confirmed', 'Order in transit', 'Order Delivered'];
}

function getStep(step) {
  switch (step) {
    case 'Order Placed':
      return 0;
    case 'Order Confirmed':
      return 1;
    case 'Order in transit':
      return 2;
    case 'Order Delivered':
      return 3;
    default:
      return 0;
  }
}

export default function DeliveryStatus() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(2);
  const [order, setOrder] = React.useState({});
  const steps = getSteps();
  const location = useLocation();
  
  useEffect(() => {
    setOrder(location.state)
    setActiveStep(getStep(location.state.deliveryDetails.deliveryStatus))
  }, [])
  
  return (
    <>
      <div className={classes.root}>
        <Typography className={classes.header}>
          Track Package
        </Typography>
        <Box style={{ display: 'flex', justifyContent: "space-between", alignItems: "space-between", padding: 40 }}>

          <Typography className={classes.heading}>
            <b>Order Placed</b>: {order.paymentDetails?.transactionTime} <b>Order Total</b>: $  {order.totalPrice}
          </Typography>
          <Typography className={classes.secondaryHeading}>Order ID: {order._id}</Typography>
        </Box>
        <Stepper activeStep={activeStep} alternativeLabel style={{ iconColor: "red" }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </div>
    </>
  );
}
