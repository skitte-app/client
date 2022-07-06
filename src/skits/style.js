
import { makeStyles } from "@material-ui/core/styles";
export const useStyles = makeStyles((theme) => ({
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
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  media: {
    width: "380px",
    textAlign: "center",
    borderRadius: "18px",
    height: "400px",
    position: "relative",
  },
  skitte_like_heart_container: {
    width: "100%",
    height: "100%",
    textAlign: "center",
    animation: "heartBeat .6s infinite",
    // display: "none",
    zIndex: "10",
  },
  skitte_like_heart: {
    pointerEvents: "none",
    width: "150px",
    fill: "#e91e63 !important",
    stroke: "none",
  },
}));