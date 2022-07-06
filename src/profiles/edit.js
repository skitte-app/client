import React, { useState, useEffect } from "react";
import axios from "axios";

//MaterialUI
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Avatar from "@material-ui/core/Avatar";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { getCookie } from "../lookup";
import { HOST } from "../config";

const csrftoken = getCookie("csrftoken");
const config = {
  headers: {
    "Content-Type": "application/json",
    "X-CSRFToken": csrftoken,
  },
};

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  view_profile: {
    margin: theme.spacing(3, 0.5, 2),
  },
}));

export function ProfileEdit(props) {
  const [didLookup, setDidLookup] = useState(false);
  const initialFormData = Object.freeze({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    website: "",
    bio: "",
  });

  const [formData, updateFormData] = useState(initialFormData);

  useEffect(() => {
    if (didLookup === false) {
      if (props.username) {
        var username = formData.username ? formData.username : props.username;
        axios
          .get(HOST + "/api/profiles/" + username + "/")
          .then((res) => {
            updateFormData({
              ...formData,
              // eslint-disable-next-line
              ["first_name"]: res.data.first_name,
              // eslint-disable-next-line
              ["last_name"]: res.data.last_name,
              // eslint-disable-next-line
              ["username"]: res.data.username,
              // eslint-disable-next-line
              ["email"]: res.data.email,
              // eslint-disable-next-line
              ["website"]: res.data.website,
              // eslint-disable-next-line
              ["bio"]: res.data.bio,
            });
          })
          .catch((err) => {
            var status = `${err}`;
            if (status.endsWith("403")) {
              window.location.href = "/login/?next=/profiles/u/edit/";
            } else if (status.endsWith("404")) {
              window.location.reload();
            } else {
              console.log(status);
            }
          });
        setDidLookup(true);
      }
    }
  }, [updateFormData, props.username, formData, didLookup]);

  const handleChange = (e) => {
    updateFormData({
      ...formData,
      // Trimming any whitespace
      [e.target.name]: e.target.value.trim(),
    });
  };

  const handleProfileView = (e) => {
    e.preventDefault();
    window.location.href = `/profiles/${formData.username}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (didLookup === true) {
      axios
        .put(
          HOST + "/api/profiles/edit/" + props.username + "/",
          formData,
          config
        )
        .then((res) => {
          if (res.status === 200) {
            console.log(res.data);
          }
        })
        .catch((err) => {
          var status = `${err}`;
          if (status.endsWith("403")) {
            window.location.href = "/login/?next=/profiles/u/edit/";
          } else if (status.endsWith("404")) {
            window.location.reload();
          } else {
            console.log(status);
          }
        });
      var a = document.getElementById("skitte-profile-edit");
      var c = document.getElementsByClassName("hide-view")[0];
      var d = document.querySelector(".update-profile-btn");
      a.setAttribute("data-username", formData.username);
      c.style.display = "block";
      d.style.display = "none";
    }
  };

  const classes = useStyles();

  return didLookup === true ? (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}></Avatar>
        <Typography component="h1" variant="h5">
          Edit Profile
        </Typography>
        <form className={classes.form}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                id="first_name"
                label="First"
                name="first_name"
                autoComplete="first_name"
                value={formData.first_name}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                id="last_name"
                label="Last"
                name="last_name"
                autoComplete="last_name"
                value={formData.last_name}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="username"
                label="username"
                name="username"
                autoComplete="username"
                value={formData.username}
                onChange={handleChange}
                rows={8}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="email"
                type="email"
                name="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                id="website"
                label="website"
                type="link"
                name="website"
                autoComplete="website"
                value={formData.website}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                id="bio"
                label="bio"
                name="bio"
                autoComplete="bio"
                value={formData.bio}
                onChange={handleChange}
                multiline
                rows={8}
              />
            </Grid>
          </Grid>
          <div className="hide-view">
            <Button
              variant="contained"
              color="secondary"
              className={classes.view_profile}
              onClick={handleProfileView}
            >
              View
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.view_profile}
              onClick={handleSubmit}
            >
              Update
            </Button>
          </div>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={`${classes.submit} ${classes.view_profile} update-profile-btn`}
            onClick={handleSubmit}
          >
            Update
          </Button>
        </form>
      </div>
    </Container>
  ) : (
    "Loading..."
  );
}
