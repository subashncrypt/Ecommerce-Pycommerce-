/*
* @author: Indu Munagapati
* Component of Profile Information page
*/

import {
    Typography,
    Grid,
    Card,
    Button,
    CardContent,
    FormHelperText,
    TextField,
    Snackbar,
    makeStyles,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions
} from "@material-ui/core";
import { useEffect, useState } from "react";
import Sidebar from "./sidebar";
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    component: {
        marginTop: 55,
        padding: "30px 6%",
        display: "flex",
    },
    header: {
        padding: "20px 40px",
        fontSize: 18,
        fontWeight: 500,
        borderBottom: "1px solid #e0e0e0",
    },
    leftComponent: {
        paddingRight: 15,
        [theme.breakpoints.between(0, 960)]: {
            paddingRight: 0,
            marginBottom: 20,
        },
    },
}));
function ProfileInformation() {

    const classes = useStyles();
    const emailAddress = localStorage.getItem('emailAddress');
    const [name, setName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [phoneNumberError, setPhoneNumberError] = useState("");
    const [numError, setNumError] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [newPasswordError, setNewPasswordError] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const [confirmNewPasswordError, setConfirmNewPasswordError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [openSnackBar, setOpenSnackBar] = useState(false);
    const [open, setOpen] = useState(false);
    const vertical = "bottom";
    const horizontal = "center";
    
    function onHandlePhoneNumber(event) {
        setNumError("");
        let phNumber = event.target.value;
        let phNumberRegex = /^[0-9]{10}$/;
        let err = "";
        if(!phNumberRegex.test(phNumber)) {
            err = "Phone Number should only have ten digits";
        }
        setPhoneNumber(phNumber);
        setPhoneNumberError(err);
    }

    function onHandleClose(event) {
        event.preventDefault();
        if (phoneNumberError === "" && phoneNumber) {
            axios.post("/updatephonenumber", {phoneNumber: phoneNumber, emailAddress: emailAddress}
            , { headers: { token: localStorage.getItem("jwtoken") } }).then(
                (response) => {
                    if(response.status === 201) { 
                        setOpen(false);
                        window.location.reload(); }
            });
        } else {
            setNumError("Cannot update the phone number");
        }
    }

    function onHandlePassword(event) {
        let passwordValue = event.target.value;
        let passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        let err = "";
        if (!passwordValue.trim()) {
            err = "Password cannot be empty";
        } else if (!passwordRegex.test(passwordValue)) {
            err = "Password doesn't match the criteria, \n" +
                "at least eight characters,\n" +
                "at least one number,\n" +
                "at least one lowercase letter,\n" +
                "at least one uppercase letter, \n" +
                "at least one special character ";
        }
        setNewPassword(passwordValue);
        setNewPasswordError(err);
    }

    function onHandleConfirmPassword(event) {
        let cPassword = event.target.value;
        let err = "";
        if (!cPassword.trim()) {
            err = "Confirm Password cannot be empty";
        } else if (newPassword !== cPassword) {
            err = "Passwords doesn't match";
        }
        setConfirmNewPassword(cPassword);
        setConfirmNewPasswordError(err);
    }

    function onHandleSubmit() {
        if ((newPasswordError === "" && confirmNewPasswordError === "") && ((newPassword && confirmNewPassword) !== "")) {
            axios.post("/changepassword",{
                emailAddress : emailAddress,
                password : newPassword
            }, { headers: { token: localStorage.getItem("jwtoken") } }).then((response) => {
                if(response.status === 201) {
                    setOpenSnackBar(true);
                    setNewPassword("");
                    setNewPasswordError("");
                    setConfirmNewPassword("");
                    setConfirmNewPasswordError("");
                    setPasswordError("");
                }
            }).catch(err => {
                setPasswordError("Couldn't update the password");
            })
        } else {
            setPasswordError("All fields are mandatory or resolve the errors displayed");
        }
    }
    
    function onHandlePhoneNumberButton(){
        setOpen(true);
    }

    function onHandleReset() {
        setOpenSnackBar("");
        setNewPassword("");
        setNewPasswordError("");
        setConfirmNewPassword("");
        setConfirmNewPasswordError("");
        setPasswordError("");
        setPhoneNumberError("");
        setNumError("");
        setOpen(false);
        window.location.reload();
    }

    useEffect(() => {
        axios.get("/userinfo/" + emailAddress, { headers: { token: localStorage.getItem("jwtoken") } }).then(
            (response) => {
                setName(response.data.name);
                if(response.data?.phoneNumber != null && response.data?.phoneNumber != "undefined" ){
                    setPhoneNumber(response.data?.phoneNumber);
                }
            })
    },[]);

    return (
        <div>
            <Grid container className={classes.component}>
                <Grid item lg={3} md={3} sm={12} xs={12} className={classes.leftComponent}>
                    <Sidebar />
                </Grid>
                <Grid style={{ background: "#fff" }} item lg={9} md={9} sm={12} xs={12}>
                    <Card elevation={0}>
                        <Typography className={classes.header}>
                            My Profile
                        </Typography>
                        <CardContent style={{ paddingLeft: 50 }}>
                            <Typography
                                variant="h6"
                                style={{ padding: "1%" }}
                                align="left">
                                <b>{`Name : ${name}`}</b>
                            </Typography>
                            <Typography
                                variant="h6"
                                style={{ padding: "1%" }}
                                align="left">
                                <b>{`Email : ${emailAddress}`}</b>
                            </Typography>
                            <Typography
                                variant="h6"
                                style={{ padding: "1%" }}
                                align="left">
                                <b>{`Phone Number : ${phoneNumber}`}</b>
                            </Typography>
                            <Button variant="contained" color="success"
                                onClick={() => onHandlePhoneNumberButton()} style={{ border: "2px", marginBottom: "4%", backgroundColor: "#FFBB38", marginLeft:"18%" }}>
                                <b>Edit Phone number</b> 
                            </Button>
                            <h3>Change Password</h3>
                            <FormHelperText style={{ color: "red", whiteSpace: "pre-line" }}>
                                {passwordError}
                            </FormHelperText>
                            <TextField style={{ backgroundColor: "#fff", width: "40%" }}
                                variant="filled"
                                size="small"
                                margin="normal"
                                name="password"
                                label="Password"
                                type="password"
                                value={newPassword}
                                onChange={onHandlePassword}
                                required />
                            <FormHelperText style={{ color: "red", whiteSpace: "pre-line" }}>
                                {newPasswordError}
                            </FormHelperText>
                            <TextField style={{ backgroundColor: "#fff", width: "40%" }}
                                variant="filled"
                                size="small"
                                margin="normal"
                                name="confirmpassword"
                                label="Confirm Password"
                                type="password"
                                value={confirmNewPassword}
                                onChange={onHandleConfirmPassword}
                                required />
                            <FormHelperText style={{ color: "red" }}>
                                {confirmNewPasswordError}
                            </FormHelperText>
                            <br />
                            <Button variant="contained" color="success"
                                onClick={() => onHandleSubmit()} style={{ border: "5px", marginBottom: "4%", backgroundColor: "#FFBB38" }}>
                                <b>Change Password</b>
                            </Button>
                            <Snackbar style={{ backgroundColor: "green", color: "white" }}
                                open={openSnackBar}
                                message={`password changed successfully`}
                                action={<Button variant="contained" size="small" onClick={onHandleReset}>
                                    close
                                </Button>}
                                anchorOrigin={{ vertical, horizontal }}
                                key={vertical + horizontal}
                            />
                            <Button variant="contained" style={{ backgroundColor: "#D3D3D3", marginLeft: "5%", marginBottom: "4%", width: "15%" }}
                                onClick={onHandleReset}>
                                <b>Reset</b>
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
            <Dialog open={open} onClose={onHandleClose}>
                <DialogTitle>Phone Number</DialogTitle>
                <DialogContent>
                <FormHelperText style={{ color: "red", whiteSpace: "pre-line" }}>
                    {numError}
                </FormHelperText>
                <TextField style={{ backgroundColor: "#fff", width: "90%", margin : "4%" }}
                    autoFocus
                    variant="filled"
                    fullWidth
                    size="small"
                    margin="dense"
                    label ="Phone Number"
                    name= "phoneNumber"
                    type="text"
                    value={phoneNumber}
                    onChange={onHandlePhoneNumber} />
                <FormHelperText style={{ color: "red", whiteSpace: "pre-line" }}>
                    {phoneNumberError}
                </FormHelperText>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" style={{ backgroundColor: "#D3D3D3", marginLeft: "5%", marginBottom: "4%", width: "15%" }}onClick={onHandleReset}>Cancel</Button>
                    <Button variant="contained" color="success" style={{ border: "5px", marginBottom: "4%", backgroundColor: "#FFBB38" }} onClick={onHandleClose}>Update</Button>
                </DialogActions>
            </Dialog>    
        </div>
    );
}

export default ProfileInformation;
