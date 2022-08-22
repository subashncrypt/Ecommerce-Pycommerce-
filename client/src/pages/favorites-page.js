/*
* @author: Adesh Nalpet Adimurthy
*/

import React from "react";
import { makeStyles } from "@material-ui/core";

import Favorites from "../components/favorites/favorites";
import ToastMessageContainer from "../components/toast";

const useStyles = makeStyles((theme) => ({
  favorites: {
    padding: "30px",
    marginTop: 55
  },
}));

function FavoritesPage() {
  const classes = useStyles();

  return (
    <div className={classes.favorites}>
      <Favorites />
      <ToastMessageContainer />
    </div>
  );
}

export default FavoritesPage;
