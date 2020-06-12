import React from "react";
import { connect } from 'react-redux'

import classes from './Layout.module.css'
import SideBar from "../../components/SideBar/SideBar";
import NavBar from "../../components/NavBar/NavBar";

function Layout(props) {
  return (
    <div className={classes.container} style={{height: props.height}}>
      <SideBar isAuth={props.isAuth}/>
      <div className={classes.mainPage}>
        <NavBar isAuth={props.isAuth} />
        {props.children} 
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    isAuth: state.auth.token !== null
  }
}

export default connect(mapStateToProps, null)(Layout);
