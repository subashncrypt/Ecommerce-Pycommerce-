/*
* @author: Meghdoort Ojha
*/
import React, { useState, useEffect } from "react";
import { Grid, makeStyles, Form } from "@material-ui/core";
import Sidebar from "../components/profile/seller-sidebar";
import validateInput from "../validations/validationAddProduct";
import { useHistory, useParams } from "react-router-dom";
import { addInventoryProduct, getInventoryProductById, updateProductById } from "../actions/inventory-action.js"

import {
  InputLabel,
  TextField,
  MenuItem,
  Select,
  FormControl,
  Button,
} from "@material-ui/core";

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

function AddProduct() {
  const navigate = useHistory();
  const classes = useStyles();
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [serialNo, setSerialNo] = useState("");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [quantity, setQuantity] = useState("");
  const [image, setImage] = useState("");
  const [data, setData] = useState([]);
  const [errors, setErrors] = useState("");

  const { id } = useParams("");
  useEffect(async () => {
if(!id){
  setCategory("");
  setName("");
  setImage("");
  setDiscount("");
  setQuantity("");
  setSerialNo("");
  setPrice("");
}
  },[id])

  useEffect(async () => {
    // Update the document title using the browser API

    if (id) {
      // let localData = JSON.parse(localStorage.getItem("productData"));
      // if (JSON.stringify(data) != JSON.stringify(localData)) {
      //   setData(localData);
      // }

      // let value = localData.find((x) => +x.id == +id);

      // if (!category) {

      // }
      let result = await getInventoryProductById(id)
      console.log(result)
      setCategory(result.data.product?.productCategory);
      setName(result.data.product?.productName);
      setImage(result.data.product?.image);
      setDiscount(result.data.product?.discount.toString());
      setQuantity(result.data.product?.quantity.toString());
      setSerialNo(result.data.product?.productSerial.toString());
      setPrice(result.data.product?.price.toString());
    } else {
      
    }
  }, []);

  const onChange = (ev) => {
    if (ev.target.name == "category") {
      console.log(ev.target);
      setCategory(ev.target.value);
    } else if (ev.target.name == "name") {
      setName(ev.target.value);
    } else if (ev.target.name == "serialNo") {
      setSerialNo(ev.target.value);
    } else if (ev.target.name == "price") {
      setPrice(ev.target.value);
    } else if (ev.target.name == "discount") {
      setDiscount(ev.target.value);
    } else if (ev.target.name == "quantity") {
      setQuantity(ev.target.value);
    }
  };
  const onChangeFile = (ev) => {
    const reader = new FileReader();
    reader.readAsDataURL(ev.target.files[0]);
    reader.onload = () => {
      setImage(reader.result);
    };
  };
  const isValid = () => {
    const { errors, isValid } = validateInput({
      category,
      name,
      serialNo,
      price,
      discount,
      quantity,
      image,
    });
    if (!isValid) {
      setErrors(errors);
    }
    return isValid;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    let data = {
      productCategory: category,
      productName: name,
      productSerial: serialNo.toString(),
      price: price.toString(),
      discount: discount.toString(),
      quantity: quantity.toString(),
      image: image,
    };


    if (isValid(data)) {
      if (id) {
        let result = await updateProductById(id, data)
       
        if (result.status == 200) {
          navigate.push("/view-product");
        }
        else {
          alert(result.data.error)
        }
      } else {
        let result = await addInventoryProduct(data)
        console.log(result)
        if (result.status == 200) {
          navigate.push("/view-product");
        }
        else {
          alert(result.data.error)
        }

      }
    } else {

      console.log("Errors");
    }
  };

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
              <h2>{id ? "Update " : "ADD "} Product</h2>
              <br />
            </div>
            <div className="p-5">
              <FormControl fullWidth style={{ backgroundColor: "#fff", width: 500 }}>
                <InputLabel id="demo-simple-select-label"
                  style={{ backgroundColor: "#fff" }}
                  fullWidth
                  variant="filled"
                  size="small"
                  margin="normal">

                  Product Category
                </InputLabel>
                <Select
                  fullWidth
                  variant="standard"
                  size="small"
                  margin="normal"
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={category ?? ""}
                  // value={category ?? ""}

                  label="Product Category"
                  error={errors.category ? true : false}
                  helperText={errors.category}
                  onChange={(e) => onChange(e)}
                  name="category"
                >
                  <MenuItem value="Grocery">Grocery</MenuItem>
                  <MenuItem value="Mobile">Mobile</MenuItem>
                  <MenuItem value="Fashion">Fashion</MenuItem>
                  <MenuItem value="Electronics">Electronics</MenuItem>
                  <MenuItem value="Home">Home</MenuItem>
                  <MenuItem value="Appliances">Appliances</MenuItem>
                  <MenuItem value="Travel">Travel</MenuItem>
                  <MenuItem value="Toys">Toys</MenuItem>
                </Select>
              </FormControl>

              <FormControl >
                <TextField style={{ backgroundColor: "#fff", width: 500 }}
                  error={errors.name ? true : false}
                  fullWidth
                  variant="filled"
                  size="small"
                  margin="normal"
                  helperText={errors.name}
                  id="standard-basic"
                  label="Product Name"
                  value={name}

                  onChange={(e) => onChange(e)}
                  name="name"

                />

              </FormControl>

              <FormControl fullWidth className="w-50">
                <TextField style={{ backgroundColor: "#fff", width: 500 }}
                  id="standard-basic"
                  fullWidth
                  variant="filled"
                  size="small"
                  margin="normal"
                  error={errors.serialNo ? true : false}
                  helperText={errors.serialNo}
                  label="Serial Number"
                  value={serialNo}
                  // value={serialNo}

                  name="serialNo"
                  onChange={(e) => onChange(e)}

                />
              </FormControl>

              <FormControl fullWidth>
                <TextField style={{ backgroundColor: "#fff", width: 500 }}
                  id="standard-basic"
                  fullWidth
                  variant="filled"
                  size="small"
                  margin="normal"
                  label="Price"
                  error={errors.price ? true : false}
                  helperText={errors.price}
                  value={price}
                  price={price}
                  // value={price}
                  name="price"
                  onChange={(e) => onChange(e)}


                />
              </FormControl>

              {!image ? (
                <FormControl fullWidth>
                  <TextField style={{ backgroundColor: "#fff", width: 500 }}
                    fullWidth
                    //variant="filled"
                    size="small"
                    margin="normal"
                    label="Image"
                    type="file"
                    value={image}
                    // value={image}

                    error={errors.image ? true : false}
                    helperText={errors.image}
                    onChange={(e) => onChangeFile(e)}
                    name="image"

                  />
                </FormControl>
              ) : (
                <label>
                  <img src={image} width="150" height="150" onClick={() => setImage('')}></img>
                </label>
              )}

              <FormControl fullWidth>
                <TextField style={{ backgroundColor: "#fff", width: 500 }}
                  id="standard-basic"
                  fullWidth
                  variant="filled"
                  size="small"
                  margin="normal"
                  label="Discount"
                  value={discount}
                  // value={discount}
                  name="discount"
                  error={errors.discount ? true : false}
                  helperText={errors.discount}
                  onChange={(e) => onChange(e)}

                />
              </FormControl>

              <FormControl fullWidth>
                <TextField style={{ backgroundColor: "#fff", width: 500 }}
                  id="standard-basic"
                  fullWidth
                  variant="filled"
                  size="small"
                  margin="normal"
                  label="Quantity"
                  value={quantity}
                  // value={quantity}

                  error={errors.quantity ? true : false}
                  helperText={errors.quantity}
                  onChange={(e) => onChange(e)}
                  name="quantity"

                />
              </FormControl>

              <div className="mt-5 w-100">
                <Button style={{ backgroundColor: "#EB853B", marginTop: 20, color: "#222", fontWeight: 600, marginRight: 10 }}
                  variant="contained"
                  type="submit"
                  color="primary"
                  className="w-100"
                >
                  {id?'Update':'Add'} Product
                </Button>
              </div>
            </div>
          </div>
        </form>
      </Grid>
    </Grid>
  );
}

export default AddProduct;
