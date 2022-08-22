/*
 * @author: Subash Narayanan
 * Comments component page that listsouts comments
 */
import React from "react";
import Avatar from "@mui/material/Avatar";
import Rating from "@mui/material/Rating";
import Card from "@mui/material/Card";
import { Stack } from "@mui/material";

function Comment(props) {
  const rate = props.rating;

  return (
    <div style={{ paddingTop: "10px" }}>
      <Card style={{ paddingTop: "10px" }}>
        <Stack direction="row" spacing={3} mt={2} ml={2}>
          <Avatar>{props.avatar}</Avatar>
          <h4 style={{ marginLeft: "10px", paddingTop: "1%" }}>
            {" "}
            {props.name}
          </h4>
          <Rating
            style={{ marginLeft: "10px", paddingTop: "1%" }}
            value={Number(rate)}
            readOnly
          />
          <h4 style={{ marginLeft: "10px", float: "right", paddingTop: "1%" }}>
            {new Intl.DateTimeFormat("en-GB", {
              year: "numeric",
              month: "long",
              day: "2-digit",
            }).format(props.cdate)}
          </h4>
        </Stack>
        <Stack>
          <h4
            style={{
              paddingLeft: "2%",
              paddingTop: "2%",
            }}
          >
            {props.title}
          </h4>
          <p
            style={{
              marginBottom: "30px",
              paddingLeft: "2%",
              paddingTop: "10px",
            }}
          >
            {props.commnet}
          </p>
        </Stack>
      </Card>
    </div>
  );
}

export default Comment;
