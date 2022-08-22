import { Divider, Grid } from '@material-ui/core'
import { Route, Switch } from 'react-router-dom'
import AddressForm from '../components/payment/address-form'
import OrderSummary from '../components/payment/order-summary'
import Payment from '../components/payment/payment'

function ShippingPage() {
    return (
        <>
            <Grid container>
                <Grid item lg={7} xs={12}>
                    <Switch>
                        <Route exact path="/shipping">
                            <AddressForm />
                        </Route>
                        <Route exact path="/payment">
                            <Payment />
                        </Route>
                    </Switch>
                </Grid>
                <Grid item lg={4} xs={12}>
                    <OrderSummary />
                </Grid>
            </Grid>
        </>
    )
}

export default ShippingPage