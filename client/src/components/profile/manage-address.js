/*
* @author: Indu Munagapati
* Component of Manage Addresses page
*/

import {
  Typography,
  Grid,
  Card,
  CardContent,
  makeStyles,
  IconButton,
  Button,
  FormHelperText,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from "@material-ui/core";
import Sidebar from "./sidebar";
import axios from "axios";
import { useState, useEffect } from "react";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

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
  card: {
    justifyContent: 'space-between',
    borderRadius: '15px',
    height: '100%',
    position: 'relative',
    margin: "2%",
    width: "40%"
  }
}));

function ManageAddress() {

  const classes = useStyles();
  const [addresses, setAddresses] = useState([]);
  const [address, setAddress] = useState("");
  const [addressError, setAddressError] = useState("");
  const [addressSuccess, setAddressSuccess] = useState(false);
  const [openAdd, setOpenAdd] = useState (false);
  const [openModify, setOpenModify] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [id, setId] = useState("");

  
  useEffect(async () => {
    if (localStorage.getItem("jwtoken") != null) {
      const jwt = localStorage.getItem("jwtoken");
      const emailAddress = localStorage.getItem("emailAddress");
          await axios.get("/view-addresses/"+ emailAddress, {headers: {"token": jwt}}).then(
              (response) => {
                  setAddresses(response.data.getAddress);

              });
      }
    //eslint-disable-next-line
  }, []);

  function onHandleModify(data)
  {
    setOpenModify(true);
    setAddress(data.address);
    setId(data._id);
  }

  function onHandleModifyAddress(event)
  {
    if (address != null && !addressError && addressSuccess)
    {
      if (localStorage.getItem("jwtoken") != null) {
        const jwt = localStorage.getItem("jwtoken");
        axios.post("/modify-address", {
        id: id,
        address: address
      }, {headers: {"token"
      : jwt}}).then((response) => {
        setOpenModify(false);
        window.location.reload();
      })
    } else {
      setAddressError(" cannot modify please login")
    }
  } else {
    setAddressError(" cannot modify address")
  }
      
  }

  function onHandleDelete(id)
  {
    setId(id);
    setOpenDelete(true);
  }

  function onHandleDeleteAddress()
  {
    if (localStorage.getItem("jwtoken") != null) {
      const jwt = localStorage.getItem("jwtoken");
      axios.delete("/delete-address/" + id, {headers: {"token"
      : jwt}}).then((response) => {
        setOpenDelete(false);
        window.location.reload();
      })
      
    } else {
      setAddressError(" cannot delete please login")
    }
  }
  function onHandleAddAddress()
  {
      setOpenAdd(true);
  }

  function onHandleAddAddressSubmit()
  {
    if (address != null && !addressError && addressSuccess)
    { 
      if (localStorage.getItem("jwtoken") != null) {
        const jwt = localStorage.getItem("jwtoken");
        const emailAddress = localStorage.getItem("emailAddress");
        axios.post("/add-address", {
        emailAddress: emailAddress,
        address: address
      }, {headers: {"token"
      : jwt}}).then((response) => {
        setOpenAdd(false);
        window.location.reload();
      })
    }else {
      setAddressError("Cannot Add Address please login");
    }  
    }else {
      setAddressError (" Address cannot be empty")
    }
  }

  function onHandleReset()
  {
    setAddress("");
    setId("");
    setOpenModify(false);
    setOpenDelete(false);
    setAddressSuccess(false);
    setAddressError("");
    window.location.reload();
  }

  function onHandleAddress(event) {
    let addressValue = event.target.value;
    let err = "";
    if(addressValue.length <= 10) {
        err = "Address is too short";
        setAddressSuccess(false);
    } else {
        setAddressSuccess(true);
    }
    setAddress(addressValue);
    setAddressError(err);
  }

  return (
    <div>
      <Grid container className={classes.component}>
        <Grid item lg={3} md={3} sm={12} xs={12} className={classes.leftComponent}>
          <Sidebar />
        </Grid >
        <Grid style={{ background: "#fff" }} item lg={9} md={9} sm={12} xs={12}>
          <Card elevation={0}>
            <Typography className={classes.header}>
              My Addresses
            </Typography>
            <CardContent>
            <Button variant="contained" color="success"
                  onClick={() => onHandleAddAddress()} style={{ border: "5px", marginBottom: "4%", backgroundColor: "#FFBB38" }}>
                  <b>Add Address</b>
            </Button>
            {addresses.map((data, i) => {
                return (
                <Card  key={data._id} className={classes.card} elevation={6}>
                <CardContent>
                  <Typography
                    align="left"
                    gutterBottom
                    variant="body2"
                  > {`Address : ${data.address}`}</Typography>
                </CardContent>
                <div style = {{justifyContent:"flex-end", }}>
                  <IconButton 
                    variant="contained"
                    onClick= {()=>onHandleModify(data)}>
                      <EditIcon style={{ color: '#154001' }}>
                    Modify
                    </EditIcon>
                  </IconButton>
                  <IconButton
                    variant="contained"  onClick = {()=>onHandleDelete(data._id)}>
                      <DeleteIcon style={{ color: '#F44336' }}>
                    Delete
                    </DeleteIcon>
                  </IconButton>
                </div>
              </Card>
            )})}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Dialog open={openAdd} onClose={onHandleAddAddressSubmit}>
                <DialogTitle>Address</DialogTitle>
                <DialogContent>
                <TextField style={{ backgroundColor: "#fff", width: "90%", margin : "4%" }}
                    autoFocus
                    variant="filled"
                    fullWidth
                    size="small"
                    margin="dense"
                    label ="Address"
                    name= "address"
                    type="text"
                    multiline
                    rows={4}
                    value={address}
                    onChange={onHandleAddress} />
                <FormHelperText style={{ color: "red", whiteSpace: "pre-line" }}>
                    {addressError}
                </FormHelperText>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" style={{ backgroundColor: "#D3D3D3", marginLeft: "5%", marginBottom: "4%", width: "15%" }}onClick={onHandleReset}>Cancel</Button>
                    <Button variant="contained" color="success" style={{ border: "5px", marginBottom: "4%", backgroundColor: "#FFBB38" }} onClick={onHandleAddAddressSubmit}>Add</Button>
                </DialogActions>
            </Dialog> 
            <Dialog open={openModify} onClose={onHandleModifyAddress}>
                <DialogTitle>Address</DialogTitle>
                <DialogContent>
                <TextField style={{ backgroundColor: "#fff", width: "90%", margin : "4%" }}
                    autoFocus
                    variant="filled"
                    fullWidth
                    size="small"
                    margin="dense"
                    label ="Address"
                    name= "address"
                    type="text"
                    multiline
                    rows={4}
                    value={address}
                    onChange={onHandleAddress} />
                <FormHelperText style={{ color: "red", whiteSpace: "pre-line" }}>
                    {addressError}
                </FormHelperText>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" style={{ backgroundColor: "#D3D3D3", marginLeft: "5%", marginBottom: "4%", width: "15%" }}onClick={onHandleReset}>Cancel</Button>
                    <Button variant="contained" color="success" style={{ border: "5px", marginBottom: "4%", backgroundColor: "#FFBB38" }} onClick={onHandleModifyAddress}>Update</Button>
                </DialogActions>
            </Dialog>   
            <Dialog open={openDelete} onClose={onHandleDeleteAddress}>
                <DialogTitle>Address</DialogTitle>
                <DialogContent>
                  Are you sure you want to delete address?
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" style={{ backgroundColor: "#D3D3D3", marginLeft: "5%", marginBottom: "4%", width: "15%" }}onClick={onHandleReset}>Cancel</Button>
                    <Button variant="contained" color="success" style={{ border: "5px", marginBottom: "4%", backgroundColor: "#FFBB38" }} onClick={onHandleDeleteAddress}>Confirm</Button>
                </DialogActions>
            </Dialog>

    </div>
  );
}

export default ManageAddress;