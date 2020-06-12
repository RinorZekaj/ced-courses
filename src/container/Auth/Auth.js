import React, { useState } from "react";
import { connect } from "react-redux";

import classes from "./Auth.module.css";
import { auth } from "../../redux/actions/authActions";
import Spinner from "../../components/UI/Spinner/Spinner";
import Layout from "../../container/Layout/Layout";
import { Redirect } from "react-router-dom";

function Auth(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isSignup, setIsSignup] = useState(true);
  const [newError, setNewError] = useState("");

  const validate = () => {
    let errorEmail = "";
    let passwordError = "";

    if (email.length === 0) {
      errorEmail = "Please fill out this field as it is required.";
    }
    if (password.length === 0) {
      passwordError = "Please fill out this field as it is required.";
    }
    if (password.length < 6 && password.length > 0) {
      passwordError = "Password is to short";
    }

    if (errorEmail || passwordError) {
      setEmailError(errorEmail);
      setPasswordError(passwordError);
      return false;
    }
    return true;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const isValid = validate();
    if (isValid) {
      props.onAuth(email, password, isSignup);
      // clear
      setEmailError("");
      setPasswordError("");
    }
  };

  const switchAuthModeHandler = () => {
    setIsSignup((prevState) => !prevState);
    setEmail("");
    setPassword("");
    setEmailError("");
    setPasswordError("");
  };

  let redirect = null;
  if (props.isAuth) {
    redirect = <Redirect to="/" />;
  }

  return (
    <div className={classes.container}>
      <Layout height="100vh">
        {redirect}
        <div className={classes.formWrapper}>
          <h1>{isSignup ? "Sign up" : "Sign in"}</h1>
          <form className={classes.form} onSubmit={(e) => handleSubmit(e)}>
            <input
              className={classes.input}
              value={email}
              type="text"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            {emailError && <p className={classes.error}>{emailError}</p>}
            {props.error && (
              <p className={classes.error}>
                {props.error.message === "INVALID_EMAIL"
                  ? "Email is invalid"
                  : null}
              </p>
            )}
            {props.error && (
              <p className={classes.error}>
                {props.error.message === "EMAIL_EXISTS"
                  ? "This email address is already being used"
                  : null}
              </p>
            )}
            {props.error && (
              <p className={classes.error}>
                {props.error.message === "EMAIL_NOT_FOUND"
                  ? "This email doesn't exist"
                  : null}
              </p>
            )}
            <input
              className={classes.input}
              value={password}
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            {passwordError && (
              <div className={classes.error}>{passwordError}</div>
            )}
            {props.error && (
              <p className={classes.error}>
                {props.error.message === "INVALID_PASSWORD"
                  ? "Your password is incorrect"
                  : null}
              </p>
            )}
            <input
              type="submit"
              className={classes.submit}
              value={isSignup ? "Sign up" : "Sign in"}
            />
            {props.error && (
              <p className={classes.error}>
                {props.error.message === "TOO_MANY_ATTEMPTS_TRY_LATER : Too many unsuccessful login attempts. Please try again later."
                  ? "Too many unsuccessful login attempts. Please try again later."
                  : null}
              </p>
            )}
            {/* {props.error ? <p className={classes.error}>{props.error.message}</p> : null} */}
            {props.error && console.log(props.error.message)}
          </form>
          <div style={{ display: "flex" }}>
            <p style={{ fontSize: "14px" }}>
              {isSignup ? "Already have an account?" : "Don't have an account?"}
            </p>
            <button
              onClick={() => switchAuthModeHandler()}
              className={classes.switchAuth}
            >
              {isSignup ? "Sign in" : "Sign up"}
            </button>
          </div>
          {props.loading ? <Spinner /> : null}
        </div>
      </Layout>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuth: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, password, isSignup) =>
      dispatch(auth(email, password, isSignup)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
