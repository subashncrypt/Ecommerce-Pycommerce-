import React from "react";
import { Grid, makeStyles } from "@material-ui/core";
import { Route, Switch } from "react-router";

import Favorites from "../components/favorites/favorites";
import ToastMessageContainer from "../components/toast";
import Sidebar from "../components/profile/sidebar";
import OrderHistory from "./order-history";
import DeliveryStatus from "./delivery-status";
import AddressForm from "../components/payment/address-form";

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
}));

function ProfilePage() {
  const classes = useStyles();

  return (
    <div>
      <Grid container className={classes.component}>
        <Grid
          item
          lg={3}
          md={3}
          sm={12}
          xs={12}
          className={classes.leftComponent}>
          <Sidebar />
        </Grid>
        <Grid style={{ background: "#fff" }} item lg={9} md={9} sm={12} xs={12}>
          <Switch>
            <Route exact path="/favorites">
              <Favorites />
            </Route>
            <Route exact path="/orderHistory">
              <OrderHistory />
            </Route>
            <Route exact path="/deliveryStatus">
              <DeliveryStatus />
            </Route>
            <Route exact path="/updateDelivery">
              <AddressForm />
            </Route>
          </Switch>
        </Grid>
      </Grid>
      <ToastMessageContainer />
    </div>
  );
}

export default ProfilePage;
