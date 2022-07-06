import React from "react";
import { NavLink } from "react-router-dom";
export const renderTimestamp = (timestamp) => {
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
    console.log(timeDiff);
    return prefix;
  };
const Contact = (props) => (
  <NavLink to={`${props.chatURL}`}>
    <div class="cursor-pointer">
      <div class="flex m-3 hover:bg-gray-200 hover:p-0 bg-white rounded-lg p-2">
        <div>
          <img class="w-14 h-14 rounded-full" src={props.picURL} alt="" />
          {props.status === "online" ? (
            <div class="flex justify-center items-center ml-7 left-3 w-3 h-3 relative left-3 bottom-3 bg-white rounded-full">
              <div class="w-2 h-2 bg-green-600 rounded-full"></div>
            </div>
          ) : null}
        </div>
        <div class="flex-grow p-3">
          <div class="flex text-xs justify-between">
            <div>{props.name}</div>
            <div class="text-gray-400">{renderTimestamp(props.timestamp)}</div>
          </div>
          <div class="text-xs text-gray-400">{props.preview}</div>
        </div>
      </div>
    </div>
  </NavLink>
);

export default Contact;
