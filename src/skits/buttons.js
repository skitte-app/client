import React, { useState } from "react";

import { ReactComponent as Hearts } from "../icons/heart.svg";
import { ReactComponent as FullHearts } from "../icons/heart-full.svg";
import { ReactComponent as RepostIcon } from "../icons/repost.svg";

import { DisplayCount } from "../utils";
import { apiSkitAction } from "./lookup";

export function ActionBtn(props) {
  const { skit, action, didPerformAction, checkLike, index, isRepost } = props;
  const [likes, setLikes] = useState(skit.likes ? skit.likes : 0);
  const [reposts, setReposts] = useState(skit.reposts ? skit.reposts : 0);
  const [status, setStatus] = useState(200);
  const [userLike, setUserLike] = useState(
    skit.didlike === true ? true : false
  );
  const className = props.className
    ? props.className
    : "text-gray-500 flex hover:text-blue-500 items-center mr-6";
  const actionDisplay = action.display ? action.display : "Action";

  const handleActionBackendEvent = (response, status) => {
    setStatus(status);
    if ((status === 200 || status === 201) && didPerformAction) {
      didPerformAction(response, status);
    }
  };

  // console.log(didPerformAction);

  const handleClick = (event) => {
    if (action.type === "like" && status) {
      event.preventDefault();
      if (userLike === true) {
        setLikes(likes - 1);
        setUserLike(false);
      } else {
        setLikes(likes + 1);
        setUserLike(true);
      }
    } else if (action.type === "repost") {
      event.preventDefault();
      setReposts(reposts + 1);
    }
    apiSkitAction(props.id, action.type, handleActionBackendEvent);
  };
  const display = (
    <>
      <button
        className={
          action.type === "like"
            ? `hover:text-red-400 hover:bg-red-100 w-8 h-8 rounded-full flex items-center justify-center like-${index}${
                userLike === true ? `-liked` : ""
              }`
            : action.type === "repost"
            ? `hover:text-green-400 hover:bg-green-100 w-8 h-8 rounded-full flex items-center justify-center`
            : ""
        }
        onClick={handleClick}
      >
        {action.type === "like" ? (
          <Like likes={likes} didlike={userLike} />
        ) : action.type === "repost" ? (
          <Repost />
        ) : (
          actionDisplay
        )}
      </button>
      {action.type === "like" ? (
        <DisplayCount className="ml-2" type={action.type}>
          {likes && action.type === "like" ? likes : 0}
        </DisplayCount>
      ) : null}

      {action.type === "repost" ? (
        <DisplayCount className="ml-2" type={action.type}>
          {reposts && action.type === "repost" ? reposts : 0}
        </DisplayCount>
      ) : null}
    </>
  );

  return (
    <div
      className={
        checkLike && userLike
          ? `${className}-liked`
          : isRepost && checkLike && userLike
          ? `${className}-liked`
          : className
      }
    >
      {display}
    </div>
  );
}

function Like(props) {
  return (
    <>
      {props.didlike === false ? (
        <Hearts className="w-5 h-5 hover:fill-red-200" />
      ) : (
        <FullHearts className="w-5 h-5 hover:fill-red-200" />
      )}
    </>
  );
}
function Repost(props) {
  return (
    <>
      <RepostIcon className="w-5 h-5 fill:green hover:fill-green-200" />
    </>
  );
}
