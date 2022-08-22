/**
 * Author: Hemanth Nadipineni
 * Banner ID: B00899473
 */
import React, { useState, useEffect } from "react";
import { Grid, makeStyles } from "@material-ui/core";
import Sidebar from "../components/profile/seller-sidebar";
import validateInput from "../validations/validationAddCoupon";
import { useHistory, useParams } from "react-router-dom";
import { TextField, FormControl, Button } from "@material-ui/core";
/**
 * The useStyles variable will make styles for spaces around the add coupon component rendered.
 */
const useStyles = makeStyles((theme) => ({
  component: {
    marginTop: 55,
    padding: "30px 6%",
    display: "flex",
  },
  leftComponent: {
    paddingRight: 15,
    [theme.breakpoints.between(0, 960)]: {
      paddingRight: 0,
      marginBottom: 20,
    },
  },
}));
/**
 * The AddCoupon function is to create a form and its functionalities.
 */
function AddCoupon() {
  const navigate = useHistory();
  const classes = useStyles();
  const [category, setCategory] = useState("");

  const [couponCode, setCouponCode] = useState("");
  const [couponCondition, setCouponCondition] = useState("");
  const [couponDiscount, setDiscount] = useState("");
  const [maximumOff, setMaximumOff] = useState("");

  const [data, setData] = useState([]);
  const [errors, setErrors] = useState("");

  const { id } = useParams("");
  /**
   *  The variables for coupon details declared above into localStorage as couponData using useEffect function.
   */
  useEffect(() => {
    if (id) {
      fetch("/coupons/list-coupon/" + id, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((result) => {
          if (!category) {
            setCategory(result?.category ?? "");
            setCouponCode(result?.couponCode ?? "");
            setCouponCondition(result?.couponCondition ?? "");
            let couponDiscountNumeric = result?.couponDiscount ?? "";
            let maximumOffNumeric = result?.maximumOff ?? "";
            setDiscount(couponDiscountNumeric.toString());
            setMaximumOff(maximumOffNumeric.toString());
          }
        });
    } else {
    }
  });
  /**
   *  The variable of coupon details from the form inputs are set below.
   */
  const onChange = (ev) => {
    setCategory("Coupon");
    if (ev.target.name === "couponCode") {
      setCouponCode(ev.target.value);
    } else if (ev.target.name === "couponCondition") {
      setCouponCondition(ev.target.value);
    } else if (ev.target.name === "discount") {
      setDiscount(ev.target.value);
    } else if (ev.target.name === "maximumOff") {
      setMaximumOff(ev.target.value);
    }
  };
  /**
   * The isValid Function will check for any errors in the inputs submitted through forms.
   */
  const isValid = () => {
    const { errors, isValid } = validateInput({
      category,
      couponCode,
      couponCondition,
      couponDiscount,
      maximumOff,
    });
    if (!isValid) {
      setErrors(errors);
    }
    return isValid;
  };
  /**
   * The events like validations, initilization of variables will be performed on submission of the form
   * using hadleSubmit function.
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    let data = {
      category,
      couponCode,
      couponCondition,
      couponDiscount,
      maximumOff,
      // id: id ? id : Math.round(Math.random() * 100000),
    };
    /**
     * The conditions to check if the inputs filled in the form are valid. If they are valid,
     *  then store it in localStorage. Else show the errors.
     */
    console.log(isValid(data));
    if (isValid(data)) {
      if (id) {
        fetch("/coupons/update-coupon/" + id, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            category,
            couponCode,
            couponCondition,
            couponDiscount,
            maximumOff,
          }),
        })
          .then((response) => response.json())
          .then((result) => {
            console.log(result);
          });
        navigate.push("/view-coupon");
      } else {
        console.log(data);


        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
      };

      fetch('/coupons/add-coupon', requestOptions)
          .then(response => console.log(response))
          .then(data => console.log(data));
  }

      navigate.push("/view-coupon");
    } else {
      console.log("Errors");
    }
  };

  /**
   * The page renders the form for the user to give inputs for the coupon data.
   */
  return (
    <Grid container className={classes.component}>
      <Grid
        item
        lg={3}
        md={3}
        sm={12}
        xs={12}
        className={classes.leftComponent}
      >
        <Sidebar />
      </Grid>
      <Grid style={{ background: "#fff" }} item lg={9} md={9} sm={12} xs={12}>
        <form onSubmit={handleSubmit} style={{ padding: 40 }}>
          <div className="box">
            <div className="border-bottom py-3 text-center">
              <h2>{id ? "Update " : "Add "} Coupon</h2>
              <br />
            </div>
            <div className="p-5">
              <FormControl>
                <TextField
                  style={{ backgroundColor: "#fff", width: 500 }}
                  error={errors.couponCode ? true : false}
                  fullWidth
                  variant="filled"
                  size="small"
                  margin="normal"
                  helperText={errors.couponCode}
                  id="standard-basic"
                  label="Coupon Code"
                  value={couponCode}
                  onChange={(e) => onChange(e)}
                  name="couponCode"
                />
              </FormControl>

              <FormControl fullWidth className="w-50">
                <TextField
                  style={{ backgroundColor: "#fff", width: 500 }}
                  id="standard-basic"
                  fullWidth
                  variant="filled"
                  size="small"
                  margin="normal"
                  error={errors.couponCondition ? true : false}
                  helperText={errors.couponCondition}
                  label="Coupon Condition"
                  value={couponCondition}
                  name="couponCondition"
                  onChange={(e) => onChange(e)}
                />
              </FormControl>

              <FormControl fullWidth>
                <TextField
                  style={{ backgroundColor: "#fff", width: 500 }}
                  id="standard-basic"
                  fullWidth
                  variant="filled"
                  size="small"
                  margin="normal"
                  label="Discount"
                  value={couponDiscount}
                  name="discount"
                  error={errors.couponDiscount ? true : false}
                  helperText={errors.couponDiscount}
                  onChange={(e) => onChange(e)}
                />
              </FormControl>

              <FormControl fullWidth>
                <TextField
                  style={{ backgroundColor: "#fff", width: 500 }}
                  id="standard-basic"
                  fullWidth
                  variant="filled"
                  size="small"
                  margin="normal"
                  label="Maximum Off"
                  value={maximumOff}
                  error={errors.maximumOff ? true : false}
                  helperText={errors.maximumOff}
                  onChange={(e) => onChange(e)}
                  name="maximumOff"
                />
              </FormControl>

              <div className="mt-5 w-100">
                <Button
                  style={{
                    backgroundColor: "#EB853B",
                    marginTop: 20,
                    color: "#222",
                    fontWeight: 600,
                    marginRight: 10,
                  }}
                  variant="contained"
                  type="submit"
                  color="primary"
                  className="w-100"
                >
                  {id ? "Update " : "Add "} Coupon
                </Button>
              </div>
            </div>
          </div>
        </form>
      </Grid>
    </Grid>
  );
}
/**
 * The function above is exported as add coupons page
 */
export default AddCoupon;
