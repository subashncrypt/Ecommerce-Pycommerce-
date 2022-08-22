/*
* @author: Indu Munagapati
* Component of Forgot password page
*/

import {
    Typography,
    Grid,
    FormHelperText,
    TextField,
    Button,
    Paper,
    Dialog,
    Container,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions
} from "@material-ui/core";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from 'axios';

function ForgotPassword() {

    const [emailAddress, setEmailAddress] = useState("");
    const [emailSuccess, setEmailSuccess] = useState(false);
    const [emailAddressError, setEmailAddressError] = useState("");
    const [securityQuestionOne, setSecurityQuestionOne] = useState("");
    const [q1Success, setQ1Success] = useState(false);
    const [securityQuestionOneError, setSecurityQuestionOneError] = useState("");
    const [securityQuestionTwo, setSecurityQuestionTwo] = useState("");
    const [q2Success, setQ2Success] = useState(false);
    const [securityQuestionTwoError, setSecurityQuestionTwoError] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [passwordSuccess, setPasswordSuccess] = useState(false);
    const [newPasswordError, setNewPasswordError] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const [conPasswordSuccess, setConPasswordSuccess] = useState(false);
    const [confirmNewPasswordError, setConfirmNewPasswordError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [openDialog, setOpenDialog] = useState(false);
    const navigate = useHistory();

    function onHandleEmailAddress(event) {
        setPasswordError("");
        let emailAddressName = event.target.value;
        let emailAddressRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        let err = "";
        if(!emailAddressName.trim()) {
            err = "Email Address cannot be empty";
            setEmailSuccess(false);
        } else if(!emailAddressRegex.test(emailAddressName)) {
            err = "Email Address doesn't match criteria, ex: xyz@outlook.com";
            setEmailSuccess(false);
        } else {
            setEmailSuccess(true);
        }
        setEmailAddress(emailAddressName);
        setEmailAddressError(err);
    }

    function onHandlePassword(event) {
        setPasswordError("");
        let passwordValue = event.target.value;
        let passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        let err = "";
        if(!passwordValue.trim()) {
            err = "Password cannot be empty";
            setPasswordSuccess(false);
        } else if(!passwordRegex.test(passwordValue)) {
            err = "Password doesn't match the criteria, \n" + 
                  "at least eight characters,\n" +
                  "at least one number,\n" +
                  "at least one lowercase letter,\n" +
                  "at least one uppercase letter, \n" +
                  "at least one special character ";
            setPasswordSuccess(false);
        } else {
            setPasswordSuccess(true);
        }
        setNewPassword(passwordValue);
        setNewPasswordError(err);
    }

    function onHandleConfirmPassword(event) {
        setPasswordError("");
        let cPassword = event.target.value;
        let err = "";
        if(!cPassword.trim()) {
            err = "Confirm Password cannot be empty";
            setConPasswordSuccess(false);
        } else if(newPassword !== cPassword) {
            err = "Passwords doesn't match";
            setConPasswordSuccess(false);
        } else {
            setConPasswordSuccess(true);
        }
        setConfirmNewPassword(cPassword);
        setConfirmNewPasswordError(err);
    }

    function onHandleSecurityQuestionOne(event) {
        setPasswordError("");
        let sqOne = event.target.value;
        let sqOneRegex = /^[a-zA-Z ]+$/;
        let err = "";
        if(!sqOne.trim()) {
            err = "Security Question Answer cannot be empty";
            setQ1Success(false);
        } else if(!sqOneRegex.test(sqOne)) {
            err = "Security Question Answer should only have alphabets";
            setQ1Success(false);
        } else {
            setQ1Success(true);
        }
        setSecurityQuestionOne(sqOne);
        setSecurityQuestionOneError(err);
    }

    function onHandleSecurityQuestionTwo(event) {
        setPasswordError("");
        let sqTwo = event.target.value;
        let sqTwoRegex = /^[a-zA-Z ]+$/;
        let err = "";
        if(!sqTwo.trim()) {
            err = "Security Question Answer cannot be empty";
            setQ2Success(false);
        } else if(!sqTwoRegex.test(sqTwo)) {
            err = "Security Question Answer should only have alphabets";
            setQ2Success(false);
        } else {
            setQ2Success(true);
        }
        setSecurityQuestionTwo(sqTwo);
        setSecurityQuestionTwoError(err);
    }

    function onHandleSubmit() {
        if((emailSuccess && passwordSuccess && conPasswordSuccess && q1Success && q2Success) 
            && ((emailAddress && newPassword && confirmNewPassword && securityQuestionOne && securityQuestionTwo) !== "")) {
                axios.post("/forgotpassword", {
                    emailAddress: emailAddress,
                    password : newPassword,
                    securityQuestionOne : securityQuestionOne,
                    securityQuestionTwo : securityQuestionTwo}).
                then(response => {
                    if(response.status === 201) {
                        setOpenDialog(true);
                    } else {
                        setPasswordError(response.date.message);
                    }
                }).catch(err => {
                    setPasswordError("Email or Security questions are wrong");
                });
        } else {
            setPasswordError("All fields are mandatory");
        }
    }

    function onHandleClose() {
        setPasswordError("");
        setOpenDialog(false);
        setEmailAddress("");
        setEmailSuccess(false);
        setEmailAddressError("");
        setNewPassword("");
        setPasswordSuccess(false);
        setNewPasswordError("");
        setConfirmNewPassword("");
        setConPasswordSuccess(false);
        setConfirmNewPasswordError("");
        setSecurityQuestionOne("");
        setQ1Success(false);
        setSecurityQuestionOneError("");
        setSecurityQuestionTwo("");
        setQ2Success(false);
        setSecurityQuestionTwoError("");
        navigate.push("/login");
    }

    function onHandleReset() {
        setPasswordError("");
        setEmailAddress("");
        setEmailSuccess(false);
        setEmailAddressError("");
        setNewPassword("");
        setPasswordSuccess(false);
        setNewPasswordError("");
        setConfirmNewPassword("");
        setConPasswordSuccess(false);
        setConfirmNewPasswordError("");
        setSecurityQuestionOne("");
        setQ1Success(false);
        setSecurityQuestionOneError("");
        setSecurityQuestionTwo("");
        setQ2Success(false);
        setSecurityQuestionTwoError("");
    }

    return (
        <div>
            <Container maxWidth= "sm">
            <Grid item style= {{padding:"10%"}}>
                <Paper elevation={18}>
                    <form style= {{margin : "5%"}} >
                        <Typography variant="h5" style={{padding:"2%"}}>
                            <b>Forgot Password</b>
                        </Typography>
                        <FormHelperText style={{color:"red"}}>
                        {passwordError}
                        </FormHelperText>
                        <TextField style ={{backgroundColor: "#fff"}}
                        fullWidth
                        variant="filled"
                        size="small"
                        margin="normal"
                        name="emailaddress"
                        label="Email Address"
                        type="email"
                        value={emailAddress}
                        onChange={onHandleEmailAddress}
                        required/>
                        <FormHelperText style={{color:"red"}}>
                        {emailAddressError}
                        </FormHelperText>
                        <TextField style ={{backgroundColor: "#fff"}}
                        fullWidth
                        variant="filled"
                        size="small"
                        margin="normal"
                        name="securityquestionone"
                        label="Security Question - Favourite City"
                        type="text"
                        value={securityQuestionOne}
                        onChange={onHandleSecurityQuestionOne}
                        required/>
                        <FormHelperText style={{color:"red"}}>
                        {securityQuestionOneError}
                        </FormHelperText>
                        <TextField style ={{backgroundColor: "#fff"}}
                        fullWidth
                        variant="filled"
                        size="small"
                        margin="normal"
                        name="securityquestiontwo"
                        label="Security Question - Favourite Animal"
                        type="text"
                        value={securityQuestionTwo}
                        onChange={onHandleSecurityQuestionTwo}
                        required/>
                        <FormHelperText style={{color:"red"}}>
                        {securityQuestionTwoError}
                        </FormHelperText>
                        <TextField style ={{backgroundColor: "#fff"}}
                        fullWidth
                        variant="filled"
                        size="small"
                        margin="normal"
                        name="password"
                        label="Password"
                        type="password"
                        value={newPassword}
                        onChange={onHandlePassword}
                        required/>
                        <FormHelperText style={{color:"red", whiteSpace:"pre-line"}}>
                        {newPasswordError}
                        </FormHelperText>
                        <TextField style ={{backgroundColor: "#fff"}}
                        fullWidth
                        variant="filled"
                        size="small"
                        margin="normal"
                        name="confirmpassword"
                        label="Confirm Password"
                        type="password"
                        value={confirmNewPassword}
                        onChange={onHandleConfirmPassword}
                        required/>
                        <FormHelperText style={{color:"red"}}>
                        {confirmNewPasswordError}
                        </FormHelperText>
                        <Button variant="contained" color = "success"
                        onClick={onHandleSubmit} style = {{ marginBottom:"5%", border:"5px",backgroundColor: "#FFBB38", width:"45%"}}>
                           <b>Submit</b> 
                        </Button>
                        <Dialog
                        open={openDialog}
                        onClose={onHandleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                        >
                        <DialogTitle id="alert-dialog-title">
                            Password changed successfully !!!
                        </DialogTitle>
                        <DialogContent style={{padding:"5%"}}>
                            <DialogContentText id="alert-dialog-description">
                                Click ok to Login
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button variant="contained" size="small" onClick={onHandleClose} style={{backgroundColor: "blue", color:"white"}}>
                                <b>ok</b>
                            </Button>
                        </DialogActions>
                        </Dialog>
                        <Button variant="contained" style = {{backgroundColor: "#D3D3D3", marginLeft: "5%", marginBottom:"5%", width:"50%"}}
                        onClick={onHandleReset}>
                           <b>Reset</b> 
                        </Button>
                    </form>
                </Paper>
            </Grid>
            </Container>
        </div>
    )
}

export default ForgotPassword;
