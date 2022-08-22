/*
* @author: Adesh Nalpet Adimurthy
*/

import React from "react";

import { Box, makeStyles } from "@material-ui/core";
import Navbar from "../components/navbar";
import HomeBanner from "../components/header/banner";
import PosterRow from "../components/poster-grid";
import ProductRow from "../components/product/product-grid";
import Footer from "../components/footer/footer";
import { posterLinks } from "../constants/data";

import "../styles/home-page.css";
import "react-toastify/dist/ReactToastify.min.css";

const useStyles = makeStyles({
  homePage: {
    marginTop: 60,
  },
});
function HomePage() {
  const classes = useStyles();

  return (
    <Box className={classes.homePage}>
      <Navbar />
      <HomeBanner />
      <div>
        <ProductRow
          categoryName="top_deals"
          title="Top deals"
        />
      </div>
      <PosterRow
        imgUrls={posterLinks.links2}
      />
      <ProductRow
        title="Summer '22"
        categoryName="summer_deals"
      />
      <PosterRow
        imgUrls={posterLinks.links3}
      />
      <ProductRow title="Trending" categoryName="top_offers" />
      <PosterRow
        imgUrls={posterLinks.links4}
      />
      <Footer />
    </Box>
  );
}

export default HomePage;
