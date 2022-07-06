import { Button, ButtonGroup } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import NavbarComponent from "../NavBar";
import { SkitsList } from "./list";

import { UserDisplay, UserPicture } from "./components";

import {
  apiAcceptFriendRequest,
  apiProfileDetail,
  apiProfileFollowToggle,
  apiProfileFriendToggle,
} from "./lookup";
import { DisplayCount } from "../utils";

function ProfileBadge(props) {
  const {
    user,
    didFollowToggle,
    profileLoading,
    profileLoading2,
    profileLoading3,
    isFriendToggle,
    handleIgnoreRequest,
    handleAcceptRequest,
    handleEdit,
    handleFriend,
  } = props;
  let followbtn = user && user.is_following ? "Unfollow" : "Follow";
  let friendbtn =
    user && user.is_friend === "requested"
      ? "Cancel Request"
      : user && user.is_friend === "none"
      ? "Friend"
      : user && user.is_friend === "not_friend"
      ? "Add Friend"
      : null;
  followbtn =
    profileLoading && followbtn === "Follow"
      ? "Following"
      : profileLoading && followbtn === "Unfollow"
      ? "Unfollowing"
      : followbtn;

  let accept_rqbtn = "Accept";
  let ignore_rqbtn = "Ignore";

  accept_rqbtn = profileLoading && accept_rqbtn ? "Accept" : accept_rqbtn;
  ignore_rqbtn = profileLoading3 && ignore_rqbtn ? "Ignore" : ignore_rqbtn;

  // Friend Request Btn Conditions
  friendbtn =
    profileLoading2 && friendbtn === "Add Friend"
      ? "Sending Request..."
      : profileLoading2 && friendbtn === "Cancel Request"
      ? "Cancelling Request"
      : friendbtn;

  const handleFollowToggle = (event) => {
    event.preventDefault();
    console.log(event.target);
    if (didFollowToggle && !profileLoading) {
      didFollowToggle(followbtn);
    }
  };

  const handleFriendToggle = (event) => {
    event.preventDefault();
    if (isFriendToggle && !profileLoading2) {
      isFriendToggle(friendbtn);
    }
  };
  return user.is_user || !user.is_user ? (
    <div id="skt-profile">
      <header className="flex flex-wrap items-center p-4 md:py-8">
        <div className="md:w-3/12 md:ml-16">
          {/* <!-- profile image --> */}
          {user.image ? (
            <img
              className="w-20 h-20 md:w-40 md:h-40 object-cover rounded-full p-1"
              src={user.image}
              alt="profile"
            />
          ) : (
            <UserPicture user={user} hideLink />
          )}
        </div>

        {/* <!-- profile meta --> */}
        <div className="w-8/12 md:w-7/12 ml-3">
          <div className="md:flex md:flex-wrap md:items-center mb-4">
            <h2 className="text-3xl inline-block font-light md:mr-2 mb-2 sm:mb-0">
              <UserDisplay user={user} hideLink />
            </h2>

            {/* <!-- badge --> */}
            <span
              className="inline-block fas fa-certificate fa-lg text-blue-500 
                               relative mr-6 text-xl transform -translate-y-2"
              aria-hidden="true"
            >
              <i
                className="fas fa-check text-white text-xs absolute inset-x-0
                               ml-1 mt-px"
              ></i>
            </span>

            {/* <!-- follow button --> */}
            {user && user.is_user ? (
              <ButtonGroup>
                <Button onClick={handleEdit} variant="outlined">
                  Edit
                </Button>
                <Button
                  onClick={handleFriend}
                  color="primary"
                  variant="contained"
                >
                  Friends
                </Button>
              </ButtonGroup>
            ) : user.is_friend === "requesting" ? (
              <>
                <ButtonGroup>
                  <Button
                    onClick={handleFollowToggle}
                    color="primary"
                    variant="contained"
                    className={"capi"}
                  >
                    {followbtn}
                  </Button>
                  <Button
                    onClick={handleAcceptRequest}
                    className={"font-semibold capi"}
                    color="primary"
                    variant="outlined"
                  >
                    {accept_rqbtn}
                  </Button>
                  <Button
                    onClick={handleIgnoreRequest}
                    className={"font-semibold text-red-400 capi"}
                    color="secondary"
                    variant="contained"
                  >
                    {ignore_rqbtn}
                  </Button>
                </ButtonGroup>
              </>
            ) : (
              <>
                <ButtonGroup>
                  <Button
                    onClick={handleFollowToggle}
                    color="primary"
                    variant="contained"
                    className={"capi"}
                  >
                    {followbtn}
                  </Button>
                  <Button
                    onClick={handleFriendToggle}
                    className={"font-semibold capi"}
                    color="primary"
                    variant="outlined"
                  >
                    {friendbtn}
                  </Button>
                </ButtonGroup>
              </>
            )}
          </div>

          {/* <!-- post, following, followers list for medium screens --> */}
          <ul className="hidden md:flex space-x-8 mb-4">
            <li>
              <span className="font-semibold post_count">
                <DisplayCount>{user.post_count}</DisplayCount>{" "}
              </span>
              {user.post_count === 1 ? "post" : "posts"}
            </li>

            <li>
              <span className="font-semibold">
                <DisplayCount>{user.follower_count}</DisplayCount>{" "}
              </span>
              {user.follower_count === 1 ? "follower" : "followers"}
            </li>
            <li>
              <span className="font-semibold">
                <DisplayCount>{user.following_count}</DisplayCount>{" "}
              </span>
              following
            </li>
            <li>
              <span className="font-semibold">
                <DisplayCount>{user.likes}</DisplayCount>{" "}
              </span>
              {user.likes === 1 ? "like" : "likes"}
            </li>
          </ul>

          {/* <!-- user meta form medium screens --> */}
          <div className="hidden md:block">
            <h1 className="font-semibold">
              {user.first_name} {user.last_name}
            </h1>
            <span>
              {user.location && user.location !== "Earth"
                ? `From ${user.location}`
                : null}
            </span>
            <br />
            {/* <span>Travel, Nature and Music</span> */}
            <p>{user.bio}</p>
          </div>
        </div>

        {/* <!-- user meta form small screens --> */}
        <div className="md:hidden text-sm my-2">
          <h1 className="font-semibold">
            {user.first_name} {user.last_name}
          </h1>
          {/* <span>Travel, Nature and Music</span> */}
          <p>{user.bio}</p>
          <span>
            {!user.website === "" ? (
              <p>
                {user.website[0] === "h" &&
                user.website[1] === "t" &&
                user.website[2] === "t" &&
                user.website[3] === "p" &&
                user.website[4] === ":" &&
                user.website[5] === "/" &&
                user.website[6] === "/" ? (
                  <a
                    href={`${user.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {user.website}
                  </a>
                ) : user.website[0] === "h" &&
                  user.website[1] === "t" &&
                  user.website[2] === "t" &&
                  user.website[3] === "p" &&
                  user.website[4] === "s" &&
                  user.website[5] === ":" &&
                  user.website[6] === "/" &&
                  user.website[7] === "/" ? (
                  <a
                    href={`${user.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {user.website}
                  </a>
                ) : (
                  <a
                    href={`//${user.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {user.website}
                  </a>
                )}
              </p>
            ) : null}
          </span>
          {!user.is_user === true &&
          user.followed_by &&
          user.is_following === false ? (
            <em style={{ marginRight: "0px" }}> Followed By </em>
          ) : null}
          {!user.is_user === true &&
          user.followed_by &&
          user.is_following === false
            ? user.followed_by.map((qs) => {
                return (
                  <em
                    style={{ marginRight: "0px" }}
                    key={user.followed_by.indexOf(qs)}
                  >
                    <a
                      href={`/profiles/${qs}`}
                      className="ml-2 fol-by p-3 rounded-full bg-green-400 text-white"
                    >
                      {qs}
                    </a>{" "}
                  </em>
                );
              })
            : null}
        </div>
      </header>
    </div>
  ) : null;
}
export function ProfileBadgeComponent(props) {
  const { username } = props;
  // Lookup
  const [didlookup, setDidLookup] = useState(false);
  const [profile, setProfile] = useState(null);
  const [profileLoading, setProfileLoading] = useState(false);
  const [profileLoading2, setProfileLoading2] = useState(false);
  const [profileLoading3, setProfileLoading3] = useState(false);
  const handleBackendLookup = (response, status) => {
    if (status === 200) {
      setProfile(response);
    }
  };
  useEffect(() => {
    if (didlookup === false) {
      apiProfileDetail(username, handleBackendLookup);
      setDidLookup(true);
    }
  }, [username, didlookup, setDidLookup]);

  const handleNewFollow = (actionVerb) => {
    apiProfileFollowToggle(username, actionVerb, (response, status) => {
      if (status === 200) {
        setProfile(response);
      }
      setProfileLoading(false);
    });
    setProfileLoading(true);
  };
  const handleNewFriend = (actionVerb) => {
    apiProfileFriendToggle(username, actionVerb, (response, status) => {
      if (status === 200) {
        setProfile(response);
      }
      setProfileLoading2(false);
    });
    setProfileLoading2(true);
  };

  const handleAcceptRequest = (e) => {
    apiAcceptFriendRequest(username, "accepting", (response, status) => {
      if (status === 200) {
        setProfile(response);
      }
      setProfileLoading2(false);
    });
    setProfileLoading2(true);
  };
  const handleIgnoreRequest = () => {
    apiAcceptFriendRequest(username, "ignoring", (response, status) => {
      if (status === 200) {
        setProfile(response);
      }
      setProfileLoading3(false);
    });
    setProfileLoading3(true);
  };
  const handleFriend = (event) => {
    event.preventDefault();
    window.location.href = `/profiles/${username}/friends`;
  };
  const handleEdit = (event) => {
    event.preventDefault();
    window.location.href = "/profiles/u/edit";
  };
  const [newSkits, setNewSkits] = useState([]);
  const canSkit = username !== props.user ? false : true;
  const handleNewSkit = (newSkit) => {
    let tempNewSkits = [...newSkits];
    tempNewSkits.unshift(newSkit);
    setNewSkits(tempNewSkits);
  };
  return didlookup === false ? (
    "Loading..."
  ) : profile ? (
    <div className="lg:w-8/12 lg:mx-auto mb-8">
      <ProfileBadge
        user={profile}
        handleFriend={handleFriend}
        handleEdit={handleEdit}
        handleAcceptRequest={handleAcceptRequest}
        handleIgnoreRequest={handleIgnoreRequest}
        didFollowToggle={handleNewFollow}
        isFriendToggle={handleNewFriend}
        profileLoading={profileLoading}
        profileLoading2={profileLoading2}
        profileLoading3={profileLoading3}
      />
      {username ? (
        <div className="px-px md:px-3 skt-profile-post">
          {/* <!-- user following for mobile only --> */}
          <ul
            className="flex md:hidden justify-around space-x-8 border-t 
                text-center p-2 text-green-600 leading-snug text-sm capi"
          >
            <li>
              <span className="font-semibold text-white block post_count">
                <DisplayCount>{profile.post_count}</DisplayCount>{" "}
              </span>
              {profile.post_count === 1 ? "post" : "posts"}
            </li>
            <li>
              <span className="font-semibold text-white block">
                <DisplayCount>{profile.follower_count}</DisplayCount>{" "}
              </span>
              {profile.follower_count === 1 ? "follower" : "followers"}
            </li>

            <li>
              <span className="font-semibold text-white-600 block">
                <DisplayCount>{profile.following_count}</DisplayCount>{" "}
              </span>
              following
            </li>
            <li>
              <span className="font-semibold text-white block">
                <DisplayCount>{profile.likes}</DisplayCount>{" "}
              </span>
              {profile.likes === 1 ? "like" : "likes"}
            </li>
          </ul>

          {/* <!-- skt freatures --> */}
          <ul
            className="flex items-center justify-around md:justify-center space-x-12  
                    uppercase tracking-widest font-semibold text-xs text-gray-600
                    border-t"
          >
            {/* <!-- posts tab is active --> */}
            <li className="md:border-t md:border-green-400 md:-mt-px md:text-green-300">
              <a className="inline-block p-3" href="#heyppl">
                <i className="fas fa-th-large text-xl md:text-xs"></i>
                <span className="hidden md:inline">post</span>
              </a>
            </li>
          </ul>
          {/* <!-- flexbox grid --> */}
          <div className="flex flex-wrap mb-20 -mx-px md:-mx-3 h-full">
            <SkitsList newSkits={newSkits} {...props} is_profile />
          </div>
        </div>
      ) : null}
      <NavbarComponent
        canSkit={canSkit}
        is_profile={true}
        didSkit={handleNewSkit}
        is_authenticated={props.is_authenticated}
        username={props.user}
      />
    </div>
  ) : null; //<h1>Not found or deleted :)</h1>
}
