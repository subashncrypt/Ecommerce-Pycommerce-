import { Box, Button, Container, CssBaseline, Grid, makeStyles, Paper, Typography } from '@material-ui/core'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { retrieveOrder, placeOrder, addDeliveryDetails, addPaymentDetails } from '../actions/order-action';
import { clearCart } from '../actions/cart-action';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
    },
    main: {
        marginTop: theme.spacing(15),
        marginBottom: theme.spacing(6),
    },
    footer: {
        padding: theme.spacing(3, 2),
        marginTop: 'auto',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[800],
    },
}));

function OrderConfirmed() {
    const classes = useStyles();
    const history = useHistory();

    const goBack = () => {
        history.push('/')
    }
    const dispatch = useDispatch()
    dispatch(retrieveOrder())
    const { orderDetails } = useSelector((state) => state.orderReducer)

    useEffect(() => {
        return () => {
            dispatch(addPaymentDetails({
                amount: orderDetails.totalPrice,
                currency: 'CAD',
                paymentType: 'Stripe',
                paymentStatus: 'Success'
            }))
            dispatch(addDeliveryDetails({
                deliveryStatus: 'Order Placed'
            }))
            dispatch(placeOrder())
            dispatch(clearCart())
        }
    }, [])


    return (
        <div className={classes.root}>
            <CssBaseline />
            <Container component="main" className={classes.main} maxWidth="lg">
                <Paper elevation={3} style={{ padding: 30 }}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Typography variant="h2" gutterBottom>
                                Order placed successfully
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="h5" component="h2" gutterBottom>
                                {'Thank you for purchasing with us.'}
                                {'You will be receiving a confirmation mail with the order details.'}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                            <Box>
                                <Button variant="contained" style={{ backgroundColor: "#FFBB38", marginLeft: 10 }}
                                    onClick={goBack}>Continue Shopping</Button>
                            </Box>
                        </Grid>
                    </Grid>
                </Paper>
            </Container>
        </div>
    )
}

export default OrderConfirmed