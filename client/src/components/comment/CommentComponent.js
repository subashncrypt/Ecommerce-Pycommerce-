/*
 * @author: Subash Narayanan
 * Comments component that performs adding comments sorting and rendring comments
 */

import React, { useState, useEffect } from "react";
import axios from "axios";
import CreateArea from "./CreateArea";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Grid from "@material-ui/core/Grid";
import data from "./mockData";
import Comment from "./Comment";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Fade from "@mui/material/Fade";
import Backdrop from "@mui/material/Backdrop";
import toastMessage from "../../utils/toast-message";
import ToastMessageContainer from "../toast";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 350,
  padding: "10px",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function createComment(object) {
  return (
    <Comment
      key={object.name + object.title}
      avatar=""
      name={object.name}
      commnet={object.comment}
      rating={object.rating}
      date={object.cdate}
      title={object.title}
    />
  );
}

const state = {
  FiveStar: true,
  FourStar: false,
  ThreeStar: false,
  TwoStar: false,
  OneStar: false,
};

function CommentComponent({ product, userLogged }) {
  const [commentData, setcommentData] = React.useState([]);
  const [sort, setAge] = React.useState(10);

  const renderComments = () => {
    return commentData
      .sort((a, b) => {
        if (sort === 10) {
          return a.cdate < b.cdate ? 1 : -1;
        } else if (sort === 20) {
          return a.cdate > b.cdate ? 1 : -1;
        } else if (sort === 30) {
          return a.rating > b.rating ? 1 : -1;
        } else if (sort === 40) {
          return a.rating < b.rating ? 1 : -1;
        }
      })
      .map(createComment);
  };

  const getProducts = async (id) => {
    try {
      const data = await axios.get(`/getcomment/${id}`);

      var com = data.data;

      for (var i = 0; i < Object.keys(com).length; i++) {
        setcommentData((prevData) => {
          return [...prevData, com[i]];
        });
      }
    } catch (error) {}
  };

  useEffect(() => {
    getProducts(product._id);
  }, []);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    userLogged !== null
      ? setOpen(true)
      : toastMessage("Please Log in to Post a review", "error");
  };
  const handleClose = () => setOpen(false);

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const form = () => {
    return (
      <FormControl variant="standard" sx={{ minWidth: 120 }}>
        <InputLabel id="demo-simple-select-helper-label">SORT</InputLabel>
        <Select value={sort} label="sort" onChange={handleChange}>
          <MenuItem value={10}>MOST RECENT</MenuItem>
          <MenuItem value={20}>OLDEST FIRST</MenuItem>
          <MenuItem value={30}>LOW TO HIGH</MenuItem>
          <MenuItem value={40}>HIGH TO LOW</MenuItem>
        </Select>
      </FormControl>
    );
  };

  function addNote(Data) {
    setcommentData((prevData) => {
      return [...prevData, Data];
    });
    handleClose();
  }

  return (
    <Box sx={{ marginTop: "10px" }}>
      <Grid
        container
        spacing={2}
        style={{ paddingTop: "2%", marginTop: "1%" }}
        justifyContent="flex-end"
      >
        <Grid item xs={12} md={8}>
          <h2> REVIEWS AND RATINGS</h2>
        </Grid>
        <Grid item xs={12} md={2} sm={6}>
          <Button
            onClick={handleOpen}
            style={{
              paddingTop: "10px",
              marginTop: "5px",
              backgroundColor: "#FFBB38",
              color: "black",
            }}
            variant="contained"
          >
            POST REVIEW
          </Button>
          <Modal
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={open}>
              <Box sx={style}>
                <CreateArea
                  onAdd={addNote}
                  product_id={product._id}
                  close={handleClose}
                />
              </Box>
            </Fade>
          </Modal>
          <ToastMessageContainer />
        </Grid>
        <Grid item xs={12} md={2} sm={6}>
          {form()}
        </Grid>
      </Grid>

      <Grid container spacing={5} sm={12}>
        <Grid item xs={12}>
          {sort === 10 ? renderComments() : renderComments()}
        </Grid>
      </Grid>
    </Box>
  );
}

export default CommentComponent;
