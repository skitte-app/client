import React from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import BaseRouter from "./routes";
import ChatMenu from "./containers/ChatMenu";
import ChatsPanel from "./containers/ChatsPanel";
import * as actions from "./store/actions/auth";
import "./assets/style.css";

import { w3cwebsocket as W3CWebSocket } from "websocket";

import { withStyles } from "@material-ui/core/styles";
import { useStyles } from "./assets/style";
import { SOCKET_URL } from "./settings";
import Login from "./containers/Auth";

class App extends React.Component {
  state = {
    isLoggedIn: this.props.authenticated,
    messages: [],
    value: "",
    name: "",
    room: "vacad",
  };
  client = new W3CWebSocket(`${SOCKET_URL}/ws/chat/${this.state.room}/`);
  componentDidMount() {
    this.props.onTryAutoSignup();
    this.client.onopen = () => {
      console.log("WebSocket Client Connected");
    };
    this.client.onmessage = (message) => {
      const dataFromServer = JSON.parse(message.data);
      if (dataFromServer) {
        this.props.message((state) =>
        ({
          messages: [...state.messages,
          {
            content: dataFromServer.message,
            name: dataFromServer.name
          }]
        }))
      }
      console.log(dataFromServer)
    }
  }
  render() {
    const { classes } = this.props;
    return (
      <Router>
        <div id="skt-chat" className="flex">
          {this.props.authenticated ? (
            <>
              <ChatMenu />
              <ChatsPanel />
              <BaseRouter />
            </>
          ) : (
            <Login classes={classes} />
          )}
        </div>
      </Router>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    authenticated: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
  withStyles(useStyles)(App);
