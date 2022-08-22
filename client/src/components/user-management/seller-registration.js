/*
 * @author: Indu Munagapati
 * Component of Seller Registration page
 */

import {
  Typography,
  Grid,
  FormHelperText,
  TextField,
  Button,
  Paper,
  Container,
  Dialog,
  DialogTitle,
  DialogActions,
} from "@material-ui/core";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

function SellerRegistration() {
  const [companyName, setCompanyName] = useState("");
  const [cNameSuccess, setCNameSuccess] = useState(false);
  const [companyNameError, setCompanyNameError] = useState("");
  const [companyRegistrationNumber, setCompanyRegistrationNumber] = useState("");
  const [regSuccess, setRegSuccess] = useState(false);
  const [companyRegistrationNumberError, setCompanyRegistrationNumberError] = useState("");
  const [location, setLocation] = useState("");
  const [locSuccess, setLocSuccess] = useState(false);
  const [locationError, setLocationError] = useState("");
  const [registerError, setRegisterError] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useHistory();

  function onHandleCompanyName(event) {
    setRegisterError("");
    let name = event.target.value;
    let err = "";
    if (!name.trim()) {
      err = "Company Name cannot be empty";
      setCNameSuccess(false);
    } else {
      setCNameSuccess(true);
    }
    setCompanyName(name);
    setCompanyNameError(err);
  }

  function onHandleNumber(event) {
    setRegisterError("");
    let number = event.target.value;
    let err = "";
    if (!number.trim()) {
      err = "Company's Registration Number cannot be empty";
      setRegSuccess(false);
    } else {
      setRegSuccess(true);
    }
    setCompanyRegistrationNumber(number);
    setCompanyRegistrationNumberError(err);
  }

  function onHandleLocation(event) {
    setRegisterError("");
    let location = event.target.value;
    let err = "";
    if (!location.trim()) {
      err = "Company operating city cannot be empty";
      setLocSuccess(false);
    } else {
      setLocSuccess(true);
    }
    setLocation(location);
    setLocationError(err);
  }

  function onHandleSubmit() {
    if (cNameSuccess && regSuccess && locSuccess && (companyName && companyRegistrationNumber && location) !== "") {
      const jwt = localStorage.getItem("jwtoken");
      if(jwt != null) {
        axios.post("/sellerregistration",
          {
            emailAddress: localStorage.getItem("emailAddress"),
            companyName: companyName,
            companyRegistrationNumber: companyRegistrationNumber,
            location: location,
          }, { headers: { token: localStorage.getItem("jwtoken") } })
          .then((response) => {
            if (response.status === 201) {
              localStorage.setItem("seller", true);
              setOpenDialog(true);
            }
          }).catch((err) => {
            setRegisterError("Seller registration failed");
          });
      } else {
        navigate.push("/login");
      }
    }   
  }

  function onHandleClose() {
    setRegisterError("");
    setOpenDialog(false);
    setCompanyName("");
    setCNameSuccess(false);
    setCompanyNameError("");
    setCompanyRegistrationNumber("");
    setRegSuccess(false);
    setCompanyRegistrationNumberError("");
    setLocation("");
    setLocSuccess(false);
    setLocationError("");
    navigate.push("/add-product");
    window.location.reload();
  }

  function onHandleReset() {
    setRegisterError("");
    setCompanyName("");
    setCNameSuccess(false);
    setCompanyNameError("");
    setCompanyRegistrationNumber("");
    setRegSuccess(false);
    setCompanyRegistrationNumberError("");
    setLocation("");
    setLocSuccess(false);
    setLocationError("");
  }

  return (
    <div>
      <Container maxWidth="sm">
        <Grid item style={{ padding: "10%" }}>
          <Paper elevation={18}>
            <form style={{ margin: "5%" }}>
              <Typography variant="h5" style={{ padding: "2%" }}>
                <b>Seller Registration Page</b>
              </Typography>
              <FormHelperText style={{ color: "red" }}>
                {registerError}
              </FormHelperText>
              <TextField
                style={{ backgroundColor: "#fff" }}
                fullWidth
                variant="filled"
                size="small"
                margin="normal"
                name="companyname"
                label="Company Name"
                type="text"
                value={companyName}
                onChange={onHandleCompanyName}
                required
              />
              <FormHelperText style={{ color: "red" }}>
                {companyNameError}
              </FormHelperText>
              <TextField
                style={{ backgroundColor: "#fff" }}
                fullWidth
                variant="filled"
                size="small"
                margin="normal"
                name="registrationnumber"
                label="Company Registration Number"
                type="text"
                value={companyRegistrationNumber}
                onChange={onHandleNumber}
                required
              />
              <FormHelperText style={{ color: "red" }}>
                {companyRegistrationNumberError}
              </FormHelperText>
              <TextField
                style={{ backgroundColor: "#fff" }}
                fullWidth
                variant="filled"
                size="small"
                margin="normal"
                name="location"
                label="Company Operating City"
                type="text"
                value={location}
                onChange={onHandleLocation}
                required
              />
              <FormHelperText style={{ color: "red" }}>
                {locationError}
              </FormHelperText>
              <Button
                variant="contained"
                color="success"
                onClick={onHandleSubmit}
                style={{
                  marginBottom: "5%",
                  border: "5px",
                  backgroundColor: "#FFBB38",
                  width: "45%",
                }}
              >
                <b>Register</b>
              </Button>
              <Dialog
                open={openDialog}
                onClose={onHandleClose}
                aria-labelledby="alert-dialog-title"
              >
                <DialogTitle id="alert-dialog-title">
                  Successfully Registered as Seller 🥳
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
              <Button
                variant="contained"
                style={{
                  backgroundColor: "#D3D3D3",
                  marginLeft: "5%",
                  marginBottom: "5%",
                  width: "50%",
                }}
                onClick={onHandleReset}
              >
                <b>Reset</b>
              </Button>
            </form>
          </Paper>
        </Grid>
      </Container>
    </div>
  );
}

export default SellerRegistration;
