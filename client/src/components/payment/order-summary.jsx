import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import { Divider, Paper, Container, makeStyles } from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';

import ListItemText from '@material-ui/core/ListItemText';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { addProducts, addShippingDetails, addPaymentDetails, addDeliveryDetails } from '../../actions/order-action';

export default function OrderSummary() {
    const useStyles = makeStyles((theme) => ({
        header: {
            padding: "20px 40px",
            fontSize: 18,
            fontWeight: 500,
            borderBottom: "1px solid #e0e0e0",
        }
    }));
    const classes = useStyles();
    const dispatch = useDispatch();
    const { cartItems } = useSelector((state) => state.cartReducer);
    dispatch(addProducts(cartItems.map(item=>{ 
        return { 
            product: item.disc,
            qty: item.qty
        }
    })));
    
    const { orderDetails } = useSelector((state) => state.orderReducer)

    return (
        <React.Fragment>
            <Container component="main" maxWidth="sm" style={{ marginBottom: 40 }}>
                <Paper variant="outlined" style={{ marginTop: 30, marginBottom: 30 }}>

                <Typography className={classes.header}>
                        Order Summary
                    </Typography>
                    <List disablePadding
                        sx={{
                            bgcolor: 'background.paper',
                            overflow: 'auto',
                            maxHeight: 420,
                        }}>
                        {orderDetails.products.map((product) => (
                            <ListItem key={product.product._id} alignItems={'flex-start'} sx={{ py: 1, px: 0 }}>
                                <img style={{ padding: 10 }} width={100} height={100} src={product.product.url ?? "/images/default.jpg"} alt="product" />
                                <ListItemText primary={product.product.title.shortTitle} secondary={'Qty: '+product.qty} />
                                <Typography variant="body2">${product.product.price.cost}</Typography>
                            </ListItem>
                        ))}
                    </List>
                    <Divider />
                    <List dense>
                        <ListItem>
                            <ListItemText primary="Net Price" />
                            <Typography variant="body2">
                                ${orderDetails.netPrice}
                            </Typography>
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="Tax" />
                            <Typography variant="body2">
                                ${orderDetails.tax}
                            </Typography>
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="Discount" />
                            <Typography variant="body2">
                                -${orderDetails.discount}
                            </Typography>
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="Shipping Charge" />
                            <Typography variant="body2">
                                ${orderDetails.shippingCharges}
                            </Typography>
                        </ListItem>
                    </List>
                    <Divider />
                    <List>
                        <ListItem>
                            <ListItemText primary="Total" />
                            <Typography variant="body2" fontWeight={600}>
                                ${orderDetails.totalPrice}
                            </Typography>
                        </ListItem>
                    </List>
                </Paper>
            </Container>
        </React.Fragment>
    );
}
