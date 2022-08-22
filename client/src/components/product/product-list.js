/*
* @author: Adesh Nalpet Adimurthy
*/

import React, { useState } from "react";
import { Box, Typography, makeStyles } from "@material-ui/core";
import "react-multi-carousel/lib/styles.css";
import { Link } from "react-router-dom";
import { LocalOffer as Badge } from "@material-ui/icons";
import { emptyFavorites } from "../../constants/data";

import { useEffect } from "react";
import { getProductsByCategory } from "../../actions/product-action";

import "../../styles/product-page.css";
import StarIcon from "@material-ui/icons/Star";

const useStyle = makeStyles({
    component: {
        padding: "20px 20px",
        borderBottom: "1px solid #e0e0e0",
        borderRadius: 0,
        display: "flex",
    },
    products: {
        backgroundColor: "#fff"
    },
    emptyContainer: {
        height: 500,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
    },
    badge: {
        marginRight: 10,
        color: "#222",
        fontSize: 15,
    },
    itemWrapper: {
        display: "flex",
        alignItems: "center",
        color: "#000",
        "&:hover": {
            cursor: "pointer",
            "& $itemTitle": {
                color: "#222",
            },
        },
    },
    itemTitle: {
        color: "#000",
    },
    image: {
        height: 210,
        width: 210,
        marginRight: 120,
        objectFit: "contain",
    },
    mid: {
        margin: 20,
    },
    greyTextColor: {
        color: "#000",
        fontSize: 14,
        marginLeft: 5,
    },
    smallText: {
        fontSize: 14,
    },
    price: {
        fontSize: 22,
        fontWeight: 500,
    },
    remove: {
        opacity: "0.4",
        cursor: "pointer",
    },
    rightComponent: {
        marginLeft: "auto",
    },
    rate: {
        display: "flex",
        alignItems: "center",
        color: "#fff",
        padding: "2px 5px",
        borderRadius: 5,
        fontWeight: 600,
        fontSize: 12,
        backgroundColor: "#4BBC57",
    },
});

function ProductList({ categoryName }) {
    const classes = useStyle();
    useEffect(() => {
        getProductsByCategory(categoryName).then((data) => {
            setLoadedProducts(data);
        });
    }, [categoryName]);

    var rate = (Math.random() * 5).toFixed(1);
    var reviewCount = Math.round(Math.random() * 10000 + 1);
    if (rate < 3) {
        rate = 3.4;
    }

    const [loadedProducts, setLoadedProducts] = useState([]);

    return (
        <>
            <div className={classes.products}>
                {loadedProducts?.length > 0 ? (
                    loadedProducts?.map((item, index) => (
                        <Box className={classes.component} key={index}>
                            <Link to={`/product/${item._id}`}>
                                <Box className={classes.itemWrapper}>
                                    <img src={item.url} className={classes.image} />
                                    <Box className={classes.itemInfo}>
                                        <Typography className={classes.itemTitle}>
                                            {item.title.longTitle && item.title.longTitle}
                                        </Typography>
                                        <Box style={{ display: "flex", alignItems: "center" }}>
                                            <Typography className={classes.rate}>
                                                {rate} <StarIcon style={{ fontSize: 12, marginLeft: 3 }} />
                                            </Typography>
                                            <Typography className={classes.greyTextColor}>
                                                ({reviewCount})
                                            </Typography>
                                        </Box>
                                        <Typography style={{ margin: "15px 0" }}>
                                            <span className={classes.price}>${item.price.cost}</span>
                                            &nbsp;&nbsp;&nbsp;
                                            <span className={classes.greyTextColor}>
                                                <strike>${item.price.mrp}</strike>
                                            </span>
                                            &nbsp;&nbsp;&nbsp;
                                            <span style={{ color: "#222" }}>
                                                {item.price.discount}% off
                                            </span>
                                        </Typography>
                                        <Box>
                                            <Typography style={{ fontSize: "14px" }}>
                                                <Badge className={classes.badge} />
                                                Offer of {item.price.discount}% off valid for the next 48 hours
                                            </Typography>
                                            <Typography style={{ fontSize: "14px" }}>
                                                <Badge className={classes.badge} />
                                                Bank Offer {item.price.discount}% Unlimited Cashback on PyCommerce Scotia Bank Credit Card
                                            </Typography>
                                            <Typography style={{ fontSize: "14px" }}>
                                                <Badge className={classes.badge} />
                                                Bank Offer {item.price.discount / 2}% Off on TD bank Mastercard debit card first time
                                                transaction, Terms and Condition apply
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Box>
                            </Link>
                        </Box>
                    ))) : (<Box className={classes.emptyContainer}>
                        <img src={emptyFavorites} alt="Empty" />
                        <Typography className={classes.heading}>No products under <b>{categoryName}</b> yet!</Typography>
                    </Box>)}
            </div>
        </>
    );
}

export default ProductList;
