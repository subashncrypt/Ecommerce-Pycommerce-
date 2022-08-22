/*
 * @author: Subash Narayanan
 * Comment Area contains comments stores it and send it to backend to store
 */

import React, { useState } from "react";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import toastMessage from "../../utils/toast-message";
import axios from "axios";

function CreateArea(props) {
  const [note, setNote] = useState({
    avatar: "CU",
    name: localStorage.getItem("emailAddress"),
    rating: "",
    title: "",
    comment: "",
    cdate: Date.now,
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setNote((prevNote) => {
      return {
        ...prevNote,
        [name]: value,
      };
    });
  }

  function submitNote(event) {
    if (note.title === "") {
      toastMessage("Please have a title before submitting", "error");
    } else if (note.rating === "" || Number(note.rating) === 0) {
      toastMessage("Please Rate before submitting", "error");
    } else {
      axios
        .post("/addcomment", {
          emailAddress: localStorage.getItem("emailAddress"),
          userId: localStorage.getItem("id"),
          productId: props.product_id,
          name: note.name,
          rating: note.rating,
          title: note.title,
          comment: note.comment,
          cdate: note.cdate,
        })
        .then((response) => {
          if (response.status === 201) {
            props.onAdd(note);

            setNote({
              avatar: "",
              name: localStorage.getItem("emailAddress"),
              rating: "",
              title: "",
              comment: "",
              cdate: Date.now,
            });
            toastMessage("Review has been added Sucessfully", "success");
          }
        })
        .catch((err) => {
          toastMessage("Review failed internal server error", "error");
          props.close();
        });

      event.preventDefault();
    }
  }

  return (
    <div>
      <form>
        <h2 style={{ alignSelf: "center" }}> REVIEW </h2>
        <Stack spacing={1}>
          <h4 style={{ paddingTop: "10px" }}>Title</h4>
          <input
            name="title"
            onChange={handleChange}
            value={note.title}
            placeholder="Title"
            style={{
              color: "#646E78",
              padding: "6px",
            }}
          />
          <h4 style={{ paddingTop: "10px" }}>Rate the product</h4>
          <Rating
            style={{ paddingBottom: "10px", paddingTop: "5px" }}
            name="rating"
            value={Number(note.rating)}
            onChange={handleChange}
          />
          <h4 style={{ paddingTop: "10px" }}>Your Experience </h4>
          <textarea
            name="comment"
            onChange={handleChange}
            value={note.comment}
            placeholder="Please add your experince about the product"
            rows="3"
            style={{
              color: "#646E78",
              padding: "6px",
            }}
          />

          <Button
            onClick={submitNote}
            variant="contained"
            style={{
              backgroundColor: "#FFBB38",
              color: "black",
              paddingTop: "6px",
            }}
          >
            Add Review
          </Button>
        </Stack>
      </form>
    </div>
  );
}

export default CreateArea;
