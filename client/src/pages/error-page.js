/*
* @author: Adesh Nalpet Adimurthy
* Generic Error page.
*/

import React from "react";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";

function ErrorPage() {
  return (
    <div
      style={{
        textAlign: "center",
        fontSize: "14px",
        padding: "20px",
        marginTop: "100px",
      }}
    >
      <div>
        <img
          style={{ width: "450px", maxWidth: "100%" }}
          src="/images/404.png"
          alt=""
        />
        <div
          style={{
            fontSize: "1.3em",
            paddingTop: "10px",
            marginBottom: "35px",
          }}
        >
          Unfortunately the page you are looking for has been moved or deleted or else login to access.
        </div>
        <Button
          style={{ backgroundColor: "#222" }}
          variant="contained"
          color="primary"
        >
          <Link to="/">GO TO HOMEPAGE</Link>
        </Button>
      </div>
    </div>
  );
}

export default ErrorPage;
