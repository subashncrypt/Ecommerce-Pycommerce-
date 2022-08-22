import React, { useState, useEffect } from "react";
import { Grid, makeStyles, Form } from "@material-ui/core";
import Sidebar from "../components/profile/seller-sidebar";
import Header from "../components/header/seller-header";
import Inventory from "../components/inventory-stock-manufacturing-assets-goods-concept.jpg";
import {
  Box,
} from "@material-ui/core";
import { Autorenew, CenterFocusStrong, FullscreenExit } from "@material-ui/icons";


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

function SellerDashboard() {
  const classes = useStyles();

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
      </Grid>
      <Grid style={{ background: "#fff" }} item lg={9} md={9} sm={12} xs={12} >
      
      <Box
        component="img"
        sx={{
          height: 500,
          width: 800,
          padding:50,
          marginLeft:80,
          
          
          maxHeight: { xs: 500, md: 500 },
          maxWidth: { xs: 5000, md: 1000 },
        }}
        
        src={Inventory}
      />
      </Grid>
    </Grid>
  );
}

export default SellerDashboard;
