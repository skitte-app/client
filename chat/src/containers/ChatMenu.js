import React from "react";
import { connect } from "react-redux";
import * as actions from "../store/actions/auth";
import { ReactComponent as HomeIcon } from "../icons/home.svg";
import { ReactComponent as MessageIcon } from "../icons/message.svg";
import { ReactComponent as PersonIcon } from "../icons/person.svg";
import { ReactComponent as LayersIcon } from "../icons/layers.svg";
import { ReactComponent as SettingsIcon } from "../icons/cog.svg";
import { ReactComponent as ChatLogoIcon } from "../icons/skt-chat-logo.svg";

class ChatMenu extends React.Component {
  render() {
    return (
      <div className="w-14 h-screen flex flex-col items-center justify-between">
        <div class="w-14 p-2 flex flex-col items-center text-sm" id="chat_logo">
          <ChatLogoIcon />
          <span class="pointer-events-none text-sm font-semibold">SKITTE</span>
        </div>
        <div className="flex flex-col">
          <div className="py-3 w-5 flex justify-center items-center flex-col">
            <HomeIcon />
            <div className="w-1 h-1 bg-blue-500 none rounded-full"></div>
          </div>
          <div className="py-3 w-5 flex justify-center items-center flex-col">
            <MessageIcon />
            <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
          </div>
          <div className="py-3 w-5 flex justify-center items-center flex-col">
            <PersonIcon />
            <div className="w-1 h-1 bg-blue-500 none rounded-full"></div>
          </div>
        </div>
        <div className="flex flex-col">
          <LayersIcon className="py-3 w-5" />
          <SettingsIcon className="py-3 w-5" />
        </div>
        {this.props.username ? `@${this.props.username}` : `error ohh`}
        <button onClick={this.props.logout}>Logout</button>
      </div>
    );
  }
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
const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(actions.logout()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ChatMenu);
