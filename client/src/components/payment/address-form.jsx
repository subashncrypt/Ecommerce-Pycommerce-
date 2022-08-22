import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Box, Button, Collapse, IconButton, TextField, Select, FormControl, InputLabel, MenuItem, Paper, Container, makeStyles, Checkbox, withStyles, FormControlLabel, Dialog, DialogTitle, DialogActions } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { Close } from '@material-ui/icons';
import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addShippingDetails } from '../../actions/order-action';
import axios from 'axios';

export default function AddressForm() {
    const useStyles = makeStyles((theme) => ({
        root: {
            width: '100%',
        },
        header: {
            padding: "20px 40px",
            fontSize: 18,
            fontWeight: 500,
            borderBottom: "1px solid #e0e0e0",
        },
        heading: {
            fontSize: theme.typography.pxToRem(15),
            flexBasis: '80%',
            flexShrink: 0,
        },
        secondaryHeading: {
            fontSize: theme.typography.pxToRem(15),
            color: theme.palette.text.secondary,
        },
    }));
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const history = useHistory();
    const dispatch = useDispatch();
    const location = useLocation();

    const [checkBoxValue, setCheckBoxValue] = React.useState(false)
    const [firstName, setFirstName] = React.useState(location.state?.shippingDetails.contactDetails.firstName ?? "")
    const [lastName, setLastName] = React.useState(location.state?.shippingDetails.contactDetails.lastName ?? "")
    const [email, setEmail] = React.useState(location.state?.shippingDetails.contactDetails.email ?? "")
    const [phone, setPhone] = React.useState(location.state?.shippingDetails.contactDetails.phoneNumber ?? "")
    const [address1, setAddress1] = React.useState(location.state?.shippingDetails.address.addressLine1 ?? "")
    const [address2, setAddress2] = React.useState(location.state?.shippingDetails.address.addressLine2 ?? "")
    const [city, setCity] = React.useState(location.state?.shippingDetails.address.city ?? "")
    const [province, setProvince] = React.useState(location.state?.shippingDetails.address.state ?? "")
    const [zip, setZip] = React.useState(location.state?.shippingDetails.address.zip ?? "")
    const [emailError, setEmailError] = React.useState("")
    const [openDialog, setOpenDialog] = React.useState(false);
  
    const onCheckout = (event, formData) => {
        if (firstName && lastName && validateEmail(email) && address1 && city && validateZipCode(zip) && province) {
            dispatch(addShippingDetails({
                contactDetails: {
                    email: email,
                    firstName: firstName,
                    lastName: lastName,
                    phoneNumber: phone,
                },
                address: {
                    addressLine1: address1,
                    addressLine2: address2,
                    city: city,
                    state: province,
                    zip: zip
                }
            }))
            history.push('/payment');
        } else {
            alert("Invalid Form details")
        }
    }

    const goBack = () => {
        history.push('/')
    }

    const updateShipping = () => {
        const order = location.state
        order.shippingDetails = {
            contactDetails: {
                email: email,
                firstName: firstName,
                lastName: lastName,
                phoneNumber: phone,
            },
            address: {
                addressLine1: address1,
                addressLine2: address2,
                city: city,
                state: province,
                zip: zip
            }
        }
        axios.post('/order/update-order', order).then(response=>{
            setOpenDialog(true)
        })
    }

    function onHandleClose() {
        setOpenDialog(false);
        history.push("/orderHistory");
    }
    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    }

    const validateZipCode = (zipcode) => {
        return String(zipcode)
            .toLowerCase()
            .match(
                /[ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z][ -]?\d[ABCEGHJ-NPRSTV-Z]\d$/i
            )
    }

    const handleChange = (e) => {
        setOpen(false)
        const { name, value } = e.target
        if (name === 'firstName') {
            const result = value.replace(/[^a-z]/i, '');
            setFirstName(result);
        }
        if (name === 'lastName') {
            const result = value.replace(/[^a-z]/i, '');
            setLastName(result);
        }
        if (name === 'email') {
            setEmail(value)
            if (!value) {
                setEmailError("Email is Required")
                setOpen(true)
            }
            else if (!validateEmail(value)) {
                setEmailError('Invalid Email')
                setOpen(true)
            } else {
                setEmailError("")
            }
        }
        if (name === 'zip') {
            setZip(value)
            if (!value) {
                setEmailError("Zip/Postal Code is Required")
                setOpen(true)
            }
            else if (!validateZipCode(value)) {
                setEmailError('Invalid Zip/Postal Code')
                setOpen(true)
            } else {
                setEmailError("")
            }
        }
    }
    const CustomCheckbox = withStyles({
        root: {
            color: "#FFBB38",
            '&$checked': {
                color: "#EB853B",
            },
        },
        checked: {},
    })((props) => <Checkbox color="default" {...props} />);

    return (
        <React.Fragment>
            <Container component="main" maxWidth="sm" style={{ marginBottom: 40 }} >
                <Paper variant="outlined" style={{ marginTop: 30, marginBottom: 30, paddingBottom: 25 }}>
                    <Typography className={classes.header}>
                        {location.state ? 'Update Address' : 'Checkout'}
                    </Typography>
                    {/* <FormControlLabel
                        control={<CustomCheckbox checked={checkBoxValue} onChange={(e) => setCheckBoxValue(!checkBoxValue)} name="checkedG" />}
                        label="Use saved address"
                    /> */}
                    {!checkBoxValue && (
                        <>
                            <Collapse in={open}>
                                <Alert
                                    severity="error"
                                    action={
                                        <IconButton
                                            aria-label="close"
                                            color="inherit"
                                            size="small"
                                            onClick={() => {
                                                setOpen(false);
                                            }}
                                        >
                                            <Close fontSize="inherit" />
                                        </IconButton>
                                    }
                                    sx={{ mb: 2 }}
                                >
                                    {emailError}
                                </Alert>
                            </Collapse>
                            <Box m={1} mb={3} style={{ paddingLeft: 25, paddingRight: 25 }}>
                                <Grid container spacing={3}>
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            id="email"
                                            name="email"
                                            label="Email"
                                            fullWidth
                                            autoComplete="email"
                                            variant="filled"
                                            error={email === ""}
                                            helperText={email === "" ? "Email is Required" : ""}
                                            value={email}
                                            onChange={handleChange} />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            required
                                            id="firstName"
                                            name="firstName"
                                            label="First name"
                                            fullWidth
                                            autoComplete="given-name"
                                            variant="filled"
                                            error={firstName === ""}
                                            helperText={firstName === "" ? "First Name is Required" : ""}
                                            value={firstName}
                                            onChange={handleChange} />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            required
                                            id="lastName"
                                            name="lastName"
                                            label="Last name"
                                            fullWidth
                                            autoComplete="family-name"
                                            variant="filled"
                                            error={lastName === ""}
                                            helperText={lastName === "" ? "Last Name is Required" : ""}
                                            value={lastName}
                                            onChange={handleChange} />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            id="phone"
                                            name="phone"
                                            label="Phone Number (xxx)xxx-xxx"
                                            type="number"
                                            fullWidth
                                            autoComplete="email"
                                            variant="filled"
                                            error={phone === ""}
                                            helperText={phone === "" ? "Phone is Required" : ""}
                                            value={phone}
                                            onChange={e => setPhone(e.target.value)} />
                                    </Grid>
                                </Grid>
                            </Box>

                            <Box m={1} style={{ paddingLeft: 25, paddingRight: 25 }}>
                                <Grid container spacing={3}>
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            id="address1"
                                            name="address1"
                                            label="Address line 1"
                                            fullWidth
                                            autoComplete="shipping address-line1"
                                            variant="filled"
                                            error={address1.length === 0}
                                            helperText={address1 === "" ? "Address is Required" : ""}
                                            value={address1}
                                            onChange={e => setAddress1(e.target.value)} />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            id="address2"
                                            name="address2"
                                            label="Address line 2"
                                            fullWidth
                                            autoComplete="shipping address-line2"
                                            variant="filled"
                                            value={address2}
                                            onChange={e => setAddress2(e.target.value)} />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            required
                                            id="city"
                                            name="city"
                                            label="City"
                                            fullWidth
                                            autoComplete="shipping address-level2"
                                            variant="filled"
                                            error={city.length === 0}
                                            helperText={city === "" ? "City is Required" : ""}
                                            value={city}
                                            onChange={e => setCity(e.target.value)} />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <FormControl required fullWidth>
                                            <InputLabel id="demo-simple-select-required-label">State/Province/Region</InputLabel>
                                            <Select
                                                variant="filled"
                                                labelId="demo-simple-select-required-label"
                                                id="demo-simple-select-required"
                                                required
                                                value={province}
                                                error={province.length === 0}
                                                helperText={province === "" ? "State/Province/Region is Required" : ""}
                                                onChange={e => setProvince(e.target.value)}
                                            >
                                                <MenuItem value={'Ontario'}>Ontario</MenuItem>
                                                <MenuItem value={'Quebec'}>Quebec</MenuItem>
                                                <MenuItem value={'Nova Scotia'}>Nova Scotia</MenuItem>
                                                <MenuItem value={'New Brunswick'}>New Brunswick</MenuItem>
                                                <MenuItem value={'Manitoba'}>Manitoba</MenuItem>
                                                <MenuItem value={'British Columbia'}>British Columbia</MenuItem>
                                                <MenuItem value={'Prince Edward Island'}>Prince Edward Island</MenuItem>
                                                <MenuItem value={'Saskatchewan'}>Saskatchewan</MenuItem>
                                                <MenuItem value={'Alberta'}>Alberta</MenuItem>
                                                <MenuItem value={'Newfoundland and Labrador'}>Newfoundland and Labrador</MenuItem>
                                                <MenuItem value={'Northwest Territories'}>Northwest Territories</MenuItem>
                                                <MenuItem value={'Yukon'}>Yukon</MenuItem>
                                                <MenuItem value={'Nunavut'}>Nunavut</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            required
                                            id="zip"
                                            name="zip"
                                            label="Zip / Postal code"
                                            fullWidth
                                            autoComplete="shipping postal-code"
                                            variant="filled"
                                            error={zip.length === 0}
                                            helperText={zip === "" ? "Zip is Required" : ""}
                                            value={zip}
                                            onChange={e => handleChange(e)} />
                                    </Grid>

                                </Grid>
                            </Box>
                        </>
                    )}
                    <Grid container spacing={3}>
                        <Grid item xs={12}
                            display="flex"
                            justifyContent="flex-end"
                            alignItems="flex-end">
                            {location.state &&
                                <>
                                    <Button variant="contained" style={{ backgroundColor: "#FFBB38", marginLeft: 10, fontWeight: 600 }}
                                        onClick={updateShipping}>Update Shipping Address</Button>
                                </>
                            }
                            {!location.state &&
                                <>
                                    <Button variant="contained" style={{ backgroundColor: "#FFBB38", marginLeft: 10, fontWeight: 600 }}
                                        onClick={goBack}>Continue Shopping</Button>
                                    <Button variant="contained" style={{ backgroundColor: "#EB853B", marginLeft: 10, fontWeight: 600 }}
                                        type='button' onClick={onCheckout}>Proceed to Checkout</Button>
                                </>
                            }
                        </Grid>
                    </Grid>
                </Paper>
            </Container>
            <Dialog
                open={openDialog}
                onClose={onHandleClose}
                aria-labelledby="alert-dialog-title"
              >
                <DialogTitle id="alert-dialog-title">
                  Successfully Updated shipping details
                </DialogTitle>
                <DialogActions>
                  <Button
                    variant="contained"
                    size="small"
                    onClick={onHandleClose}
                    style={{ backgroundColor: "#FFBB38", color: "#222" }}
                  >
                    <b>ok</b>
                  </Button>
                </DialogActions>
              </Dialog>
        </React.Fragment>
    );
}

