import React from "react";
// import { ReactComponent as VerifedIcon } from "../icons/verifed.svg";
import { MEDIA_URL } from "../config";

export function UserLink(props) {
  const { username, withImage } = props;
  const handleUserLink = (e) => {
    e.preventDefault();
    window.location.href = `/profile/${username}`;
  };
  return (
    <span
      className={withImage ? `pointer` : `pointer my-3`}
      onClick={handleUserLink}
    >
      {props.children}
    </span>
  );
}

export function UserDisplay(props) {
  const { user, includeFullName, hideLink, className, date } = props;
  const nameDisplay =
    includeFullName === true && user.first_name !== null && user.last_name !== null && user.show_full_name === true ? `${user.first_name} ${user.last_name} `
      : "";
  const Usercontent = className ? (
    <>
      <div className={className}>
        <div className="flex-1 flex items-center pointer-events-auto">
          <h3 className="mr-2 font-bold hover:underline">
            <UserLink username={user.username}>
              {user.first_name && user.last_name
                ? nameDisplay
                : `@${user.username}`}
            </UserLink>
          </h3>
          {/* <span className="mr-2">
            <VerifedIcon />
          </span> */}
          {user.first_name && user.last_name ? (
            <>
              <span className="text-gray-600 text-sm mr-1">
                {hideLink === true ? (
                  `@${user.username}`
                ) : (
                  <UserLink username={user.username}>@{user.username}</UserLink>
                )}
              </span>
              <span className="text-gray-600 text-sm mr-1">·</span>
            </>
          ) : null}
          {date ? (
            <span className="text-gray-600 text-sm capi">{date}</span>
          ) : null}
        </div>
        {/* {user.is_user === true && !user.is_user === false ? (
          <div className="text-grey-600">
            <a
              href="#edit"
              className="flex w-6 h-6 bg-transparent rounded-full items-center justify-center skt-edit-icon"
            >
              <svg className="w-3 h-3 fill-current" viewBox="0 0 512 512">
                <path d="M290.74 93.24l128.02 128.02-277.99 277.99-114.14 12.6C11.35 513.54-1.56 500.62.14 485.34l12.7-114.22 277.9-277.88zm207.2-19.06l-60.11-60.11c-18.75-18.75-49.16-18.75-67.91 0l-56.55 56.55 128.02 128.02 56.55-56.55c18.75-18.76 18.75-49.16 0-67.91z" />
              </svg>
            </a>
          </div>
        ) : null} */}
      </div>
    </>
  ) : hideLink === true ? (
    `${nameDisplay} @${user.username}`
  ) : (
    <UserLink username={user.username}>
      {nameDisplay}@{user.username}
    </UserLink>
  );
  return <React.Fragment>{Usercontent}</React.Fragment>;
}

export function UserImage(props) {
  const { user, hideLink, friend, className } = props;
  const userImage = className ? (
    <figure
      className="rounded-full skt-skeleton-load skt-skeleton-load-op w-12 h-12 object-cover bg-cover flex items-center justify-center overflow-hidden mr-3"
      style={{
        backgroundImage: `url(${
          friend
            ? friend[1]
            : user && user.image
            ? user.image
            : `${MEDIA_URL}/static/media/invalid_img.jpg`
        }), url(${MEDIA_URL}/static/media/invalid_img.jpg)`,
      }}
    >
      <img
        className={`${className} none`}
        src={
          friend
            ? friend[1]
            : user && user.image
            ? user.image
            : `${MEDIA_URL}/static/media/invalid_img.jpg`
        }
        alt=""
      />
    </figure>
  ) : (
    <figure
      className="mx-1 py-2 rounded-circle pointer profile-image"
      style={{
        backgroundImage: `url(${
          friend ? friend[1] : user && user.image ? user.image : null
        }), url(${MEDIA_URL}/static/media/invalid_img.jpg)`,
      }}
    ></figure>
  );
  return hideLink === true ? (
    userImage
  ) : (
    <UserLink
      username={
        friend ? friend[0] : user && user.image ? user.username : null
      }
      withImage
    >
      {userImage}
    </UserLink>
  );
}

export function UserPicture(props) {
  const { user, hideLink, friend } = props;
  const userIdSpan = (
    <span className={"mx-2 px-5 py-4 rounded-full bg-green-200 text-dark"}>
      {friend ? friend[0] : user && user.username ? user.username[0] : "?"}
    </span>
  );
  return hideLink === true ? (
    userIdSpan
  ) : (
    <UserLink
      username={
        friend ? friend : user && user.username ? user.username[0] : "null"
      }
    >
      {userIdSpan}
    </UserLink>
  );
}
