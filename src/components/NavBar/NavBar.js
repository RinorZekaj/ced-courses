import React, { useState } from "react";
import { connect } from "react-redux";

import classes from "./NavBar.module.css";
import User from "../../assets/social.png";
import Arrow from "../../assets/multimedia.png";
import { NavLink } from "react-router-dom";
import Logo from '../../assets/logo.png'

function NavBar(props) {
  const [toogle, setToogle] = useState(false);
  const [showSideDrawer, setShowSideDrawer] = useState(true);

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
    <div className={classes.container}>
      <div
        className={classes.drawer}
        style={{ width: showSideDrawer ? "0" : "300px" }}
      >
        <div className={classes.drawerContainer}>
          <div className={classes.logoContainer}>
            <img src={Logo} />
            <h2>CEDX</h2>
          </div>
          <div className={classes.links}>
            <NavLink exact to="/" style={style} activeStyle={activeStyle}>
              Courses
            </NavLink>
            {props.isAuth ? (
              <NavLink to="/archived" style={style} activeStyle={activeStyle}>
                Archived
              </NavLink>
            ) : null}
            {props.isAuth ? (
              <NavLink to="/earnings" style={style} activeStyle={activeStyle}>
                Earnings
              </NavLink>
            ) : null}
            {props.isAuth ? (
              <NavLink to="/costs" style={style} activeStyle={activeStyle}>
                Costs
              </NavLink>
            ) : null}
          </div>
        </div>
      </div>

      <div className={classes.hamburgerMenu}>
        <div
          id={classes.navIcon4}
          onClick={() => setShowSideDrawer((prevState) => !prevState)}
          className={!showSideDrawer ? classes.open : ""}
          
        >
          <span style={{background: showSideDrawer ? "#4b96ca" : "white"}}></span>
          <span style={{background: showSideDrawer ? "#4b96ca" : "white"}}></span>
          <span style={{background: showSideDrawer ? "#4b96ca" : "white"}}></span>
        </div>
      </div>
      <div className={classes.login}>
        {!props.isAuth ? (
          <div className={classes.createAcc}>
            <NavLink className={classes.signup} to="/auth">
              SIGN UP
            </NavLink>
          </div>
        ) : (
          <div className={classes.userContainer}>
            <div className={classes.accInfo}>
              <img className={classes.user} src={User} />
              <p>USER</p>
              <img
                style={{ transform: toogle ? "scaleY(-1)" : "scaleY(1)" }}
                className={classes.arrow}
                src={Arrow}
                onClick={() => setToogle((prevState) => !prevState)}
              />
            </div>
            <div
              className={classes.dropdown}
              style={{ opacity: toogle ? "1" : "0", display: toogle ? "block" : "none" }}
            >
              <NavLink className={classes.logout} to="/logout">
                Log Out
              </NavLink>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default NavBar;
