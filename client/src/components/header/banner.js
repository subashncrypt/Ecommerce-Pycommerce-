/*
* @author: Adesh Nalpet Adimurthy
* Home page banner carousel component.
*/

import React from "react";
import { Box, makeStyles } from "@material-ui/core";
import Carousel from "react-material-ui-carousel";
import { bannerData } from "../../constants/data";
const useStyle = makeStyles({
  banner: {
    margin: "20px 10px 0px 10px",
    minWidth: 960
  },
  banner_img: {
    width: "100%",
    height: 280,
    cursor: "pointer"
  }
});

function Banner() {
  const classes = useStyle();
  return <Box className={classes.banner}>
    <Carousel animation="slide" interval={3000} navButtonsAlwaysVisible={true} indicators={false} navButtonsProps={{
      style: {
        backgroundColor: "#ffffff",
        borderRadius: 0,
        color: "#222",
        margin: 0,
        height: 47
      }
    }}>
      {bannerData.map((url, i) => <img src={url} className={classes.banner_img} alt="Offers" key={i} />)}
    </Carousel>
  </Box>;
}

export default Banner;