import React from "react";
import classes from "./Spinner.module.css";

function Spinner(props) {
  return (
    <div
      className={classes.loader}
      style={{ width: props.size + "em", height: props.size + "em" }}
    ></div>
  );
}

export default Spinner;
