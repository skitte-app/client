import React, { useState, useEffect } from "react";
import * as actions from "../store/actions/auth";
import { connect } from "react-redux";
import { useMutation } from "@apollo/client";
import { LOGIN_USER_MUTATION } from "../GraphQL/Mutations";
import { useDispatch } from "react-redux";

import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

import { useStyles } from "../assets/style";

function Login(props) {
  const classes = useStyles();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [authUser] = useMutation(LOGIN_USER_MUTATION);
  const dispatch = useDispatch();
  var App = document.getElementById("app");

  const handleForm = (e) => {
    e.preventDefault();

    dispatch(actions.authLogin(authUser, username, password));
  };
  useEffect(() => {
    if (App) {
      let user = App.dataset;
      setUsername(user.username);
    }
  }, [App]);
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" varient="h5">
          Enter Your Password
        </Typography>
        <form noValidate className={classes.form} onSubmit={handleForm}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            placeholder="****"
            name="password"
            autoFocus
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <Button
            type="submit"
            fullWidth
            varient="contained"
            className={classes.submit}
          >
            Continue
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" varient="body2">
                Forgot Password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/login?notMe=yes" varient="body2">
                {`Not ${username}?`}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
    loading: state.auth.loading,
    token: state.auth.token,
    username: state.auth.username,
    image: state.auth.image,
  };
};
export default connect(mapStateToProps)(Login);
