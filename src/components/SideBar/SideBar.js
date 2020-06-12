import React from "react";
import { NavLink } from "react-router-dom";

import classes from "./SideBar.module.css";
import Logo from "../../assets/logo.png";

function SideBar(props) {
  const style = {
    textDecoration: "none",
    color: "white",
    display: "block",
    marginTop: "20px",
    marginBottom: "15px",
    paddingLeft: "45px",
    paddingTop: "30px",
    paddingBottom: "30px",
  };

  const activeStyle = {
    backgroundColor: "#0D4871",
    borderLeft: "6px solid #47A0C8",
  };

  return (
    <div className={classes.container} style={{ width: props.width }}>
      <div className={classes.logoContainer}>
        <img src={Logo} />
        <h2>CEDX</h2>
      </div>
      <div className={classes.links}>
        <NavLink exact to="/" style={style} activeStyle={activeStyle}>
          Courses
        </NavLink>
        {props.isAuth ? <NavLink to="/archived" style={style} activeStyle={activeStyle}>
          Archived
        </NavLink> : null}
        {props.isAuth ? <NavLink to="/earnings" style={style} activeStyle={activeStyle}>
          Earnings
        </NavLink> : null}
        {props.isAuth ? <NavLink to="/costs" style={style} activeStyle={activeStyle}>
          Costs
        </NavLink> : null}
      </div>
    </div>
  );
}

export default SideBar;
