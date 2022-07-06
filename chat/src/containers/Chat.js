import React, { Component } from "react";
import { connect } from "react-redux";
import WebSocketInstance from "../websocket";

import { ReactComponent as SearchIcon } from "../icons/skt-search-icon.svg";
import { ReactComponent as SendIcon } from "../icons/send.svg";
import { ReactComponent as MoreIcon } from "../icons/more.svg";

export class Chat extends Component {
  state = { message: "" };

  initialiseChat() {
    this.waitForSocketConnection(() => {
      WebSocketInstance.fetchMessages(
        this.props.username,
        this.props.match.params.chatID
      );
    });
    WebSocketInstance.connect(this.props.match.params.chatID);
  }

  constructor(props) {
    super(props);
    this.initialiseChat();
  }

  waitForSocketConnection(callback) {
    const component = this;
    setTimeout(function () {
      if (WebSocketInstance.state() === 1) {
        console.log("Connection is made");
        callback();
        return;
      } else {
        console.log("wait for connection...");
        component.waitForSocketConnection(callback);
      }
    }, 100);
  }

  messageChangeHandler = (event) => {
    this.setState({ message: event.target.value });
  };

  sendMessageHandler = (e) => {
    e.preventDefault();
    const messageObject = {
      from: this.props.username,
      content: this.state.message,
      chatId: this.props.match.params.chatID,
    };
    WebSocketInstance.newChatMessage(messageObject);
    this.setState({ message: "" });
  };

  renderTimestamp = (timestamp) => {
    let prefix = "";
    const timeDiff = Math.round(
      (new Date().getTime() - new Date(timestamp).getTime()) / 60000
    );
    if (timeDiff <= 1) {
      // less than one minute ago
      prefix = "just now...";
    } else if (timeDiff < 60 && timeDiff > 1) {
      // less than sixty minutes ago
      prefix = `${timeDiff} minutes ago`;
    } else if (timeDiff < 24 * 60 && timeDiff > 60) {
      // less than 24 hours ago
      prefix = `${Math.round(timeDiff / 60)} hours ago`;
    } else if (timeDiff < 31 * 24 * 60 && timeDiff > 24 * 60) {
      // less than 7 days ago
      prefix = `${Math.round(timeDiff / (60 * 24))} days ago`;
    } else {
      prefix = `${new Date(timestamp)}`;
    }
    return prefix;
  };

  renderMessages = (messages) => {
    const currentUser = this.props.username;
    return messages.map((message, i, arr) => (
      <li
        key={message.id}
        style={{ marginBottom: arr.length - 1 === i ? "300px" : "15px" }}
        className={message.author === currentUser ? "sent" : "replies"}
      >
        {message.author === currentUser ? (
          <section className="flex justify-end">
            <div className="flex items-start justify-end sm:w-4/6 w-5/6 m-8 mr-1 break-words sm:break-all">
              <div className="p-3 bg-yellow-200 rounded-tl-lg shadow rounded-tr-lg rounded-bl-lg">
                <div className="text-xs text-gray-600">{message.content}</div>
                <div className="text-gray-400" style={{ fontSize: "8pt" }}>
                  {this.renderTimestamp(message.timestamp)}
                </div>
              </div>
              {/* <!-- <img src="./img.jpg" className="w-8 h-8 rounded-full m-3"> --> */}
            </div>
          </section>
        ) : (
          <section className="sm:w-4/6 w-5/6">
            <div className="flex m-8 ml-1 break-words sm:break-all w-full">
              <img
                src="http://localhost:8000/sktmedia/profile-image-placeholder.png"
                className="w-8 h-8 sticky top-2 rounded-full m-3"
                alt=""
              />
              <div className="p-3 bg-gray-100 shadow rounded-tl-lg rounded-tr-lg break-all rounded-br-lg">
                <div className="text-sm">Divine Ikhuoria</div>
                <div className="text-xs text-gray-600">{message.content}</div>
                <div className="text-gray-400" style={{ fontSize: "8pt" }}>
                  {this.renderTimestamp(message.timestamp)}
                </div>
              </div>
            </div>
          </section>
        )}
      </li>
    ));
  };
  sendMessageHandler = (e) => {
    e.preventDefault();
    const messageObject = {
      from: this.props.username,
      content: this.state.message,
      chatId: this.props.match.params.chatID,
    };
    WebSocketInstance.newChatMessage(messageObject);
    this.setState({ message: "" });
  };

  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  };

  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  componentWillReceiveProps(newProps) {
    if (this.props.match.params.chatID !== newProps.match.params.chatID) {
      WebSocketInstance.disconnect();
      this.waitForSocketConnection(() => {
        WebSocketInstance.fetchMessages(
          this.props.username,
          newProps.match.params.chatID
        );
      });
      WebSocketInstance.connect(newProps.match.params.chatID);
    }
  }

  render() {
    return (
      <div className="flex-grow h-screen flex flex-col">
        {/* <!-- CHAT USER VIEW --> */}
        <div className="w-full h-14 flex justify-between">
          <div className="flex items-center">
            <div className="p-3">
              <img
                className="w-8 h-8 border p-1 border-blue-200 rounded-full"
                src="http://localhost:8000/sktmedia/profile-image-placeholder.png"
                alt=""
              />
              <div className="flex justify-center items-center w-3 h-3 relative left-6 bottom-3 bg-white rounded-full">
                <div className="w-2 h-2 bg-green-600 rounded-full"></div>
              </div>
            </div>
            <div className="mb-3">
              <div className="text-sm">Divine</div>
              <div className="text-xs">online</div>
            </div>
          </div>
          <div className="flex items-center p-3">
            <SearchIcon className="w-5 h-5 mr-2" />
            <MoreIcon className="w-4 h-4" />
          </div>
        </div>

        {/* <!-- CHAT AREA --> */}
        <div className="w-full flex-grow overflow-auto bg-blue-100">
          {/* <!-- CHAT --> */}
          {this.props.messages && this.renderMessages(this.props.messages)}
          <div
            style={{ float: "left", clear: "both" }}
            ref={(el) => {
              this.messagesEnd = el;
            }}
          />
        </div>
        <form
          className="w-full h-14 flex p-3"
          onSubmit={this.sendMessageHandler}
        >
          <input
            onChange={this.messageChangeHandler}
            value={this.state.message}
            required
            placeholder="Aa"
            type="text"
            className="flex-grow focus:outline-none bg-transparent"
          />
          {/* <button
              type="button"
              className="p-1 hover:bg-green-200 flex justify-center bg-transparent rounded-lg mr-1"
            >
              <img
                src="./icons/attachment.svg"
                className="w-6 transform rotate-45"
              />
            </button> */}
          <div style={{ width: "1px" }} className="h-full bg-gray-200"></div>
          <button
            type="submit"
            className="p-1 hover:bg-green-200 flex justify-center bg-transparent rounded-lg ml-1"
          >
            <SendIcon className="w-6" />
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
    loading: state.auth.loading,
    messages: state.message.messages,
    username: state.auth.username,
    ChatId: state.message.currentChatId,
  };
};

export default connect(mapStateToProps)(Chat);
