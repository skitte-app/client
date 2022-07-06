import "./index.css";
import { ReactComponent as PlusIcon } from "./icons/plus.svg";
import { ReactComponent as UserIcon } from "./icons/user.svg";
import { ReactComponent as BellIcon } from "./icons/bell.svg";
import { ReactComponent as CaretIcon } from "./icons/caret.svg";
import { ReactComponent as ChevronIcon } from "./icons/chevron-right.svg";
import { ReactComponent as ArrowIcon } from "./icons/arrow-left.svg";
import { ReactComponent as CogIcon } from "./icons/cog.svg";
import { ReactComponent as FriendsIcon } from "./icons/friends.svg";
import { ReactComponent as BoltIcon } from "./icons/bolt.svg";
import { ReactComponent as HomeIcon } from "./icons/home.svg";
import { ReactComponent as FeedIcon } from "./icons/feed.svg";
import { ReactComponent as CompassIcon } from "./icons/compass.svg";
import { ReactComponent as UserPlusIcon } from "./icons/user-plus.svg";
import { ReactComponent as UserEditIcon } from "./icons/user-edit.svg";
import { ReactComponent as SignOutIcon } from "./icons/sign-out.svg";
import { ReactComponent as SkitteLogo } from "./icons/skitte-logo.svg";

import { SkitCreate } from "./skits";
import React, { useState, useEffect, useRef } from "react";
import { CSSTransition } from "react-transition-group";
import { apiProfileDetail } from "./profiles/lookup";

export function NavbarComponent(props) {
  const { username, is_authenticated, didSkit, canSkit } = props;
  const [didlookup, setDidLookup] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);
  const [profile, setProfile] = useState(null);
  var PostArticle = document.querySelectorAll(".skitte-post");

  // Show Create New Post Model
  if (openCreate === true) {
    if (PostArticle) {
      // To Blur Out The Posts
      for (let i = 0; i < PostArticle.length; i++) {
        const Post = PostArticle[i];
        Post.classList.add("skt-blur");
      }
    }
  } else if (openCreate === false) {
    if (PostArticle) {
      for (let i = 0; i < PostArticle.length; i++) {
        const Post = PostArticle[i];
        Post.classList.remove("skt-blur");
      }
    }
  }
  const handleCreate = () => {
    setOpenCreate(true);
  };
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
  return (
    didlookup && (
      <>
        {canSkit === true && canSkit !== false && (
          <SkitCreate
            username={username}
            didSkit={didSkit}
            profile={profile}
            didlookup={didlookup}
            is_profile={props.is_profile}
            openCreate={openCreate}
            setOpenCreate={setOpenCreate}
          />
        )}
        <div
          id="skitte-navbar"
          className={`${profile ? "none" : null}`}
          // className={props.is_profile ? "ag" : null}
        >
          <Navbar
            auth={is_authenticated}
            className="skt-bottom-nav-skitte-icons-icon-hover"
          >
            {is_authenticated === "nah" || !is_authenticated ? (
              <div className="signupNlogin">
                <a href="/register">SignUp</a>
                <a href="/login">Login</a>
              </div>
            ) : null}
            <div
              className={`skitte-logo ${
                canSkit === true ? "is-here" : "is-not-here"
              }`}
              style={
                is_authenticated === "nah"
                  ? { left: "50px", display: "flex", justifyContent: "end" }
                  : null
              }
            ></div>
            {is_authenticated === "yah" ? (
              <>
                <section className="media-nav">
                  <a href="/feed" title="feeds" className="active skitte-icon">
                    <FeedIcon />
                    Feeds
                  </a>
                  <a
                    href="/explore"
                    title="explore | discover"
                    className="skitte-icon"
                  >
                    <CompassIcon />
                    explore
                  </a>
                </section>
                <NavItem
                  text="Home"
                  link="/"
                  icon={
                    <HomeIcon className="skt-bottom-nav-skitte-icons-icon md" />
                  }
                />
                <NavItem
                  text="Feed"
                  link="/feed/"
                  icon={
                    <FeedIcon className="skt-bottom-nav-skitte-icons-icon md" />
                  }
                />
                <NavItem
                  text="Notification"
                  link="/notifications/"
                  className="sm:350"
                  icon={
                    <BellIcon className="skt-bottom-nav-skitte-icons-icon md" />
                  }
                />
                <div className="skitte-logo">
                  <SkitteLogo />
                </div>
                {canSkit === true ? (
                  <NavItem
                    text="New Post"
                    link="#"
                    icon={
                      <PlusIcon
                        className={`${
                          !didlookup ? `none` : null
                        } skt-bottom-nav-skitte-icons-icon`}
                        title="Create A New Post"
                        onClick={handleCreate}
                      />
                    }
                  />
                ) : (
                  <NavItem
                    text="explore"
                    link="/expore"
                    icon={
                      <CompassIcon className="skt-bottom-nav-skitte-icons-icon lg" />
                    }
                  />
                )}

                <NavItem
                  text={username}
                  user={profile && profile.image ? profile : <UserIcon />}
                  link={`/profiles/${username}`}
                  didlookup={didlookup}
                  className={`my-face-${
                    canSkit === true ? "is-here" : "is-not-here"
                  }`}
                />
                <NavItem
                  text="More"
                  link="#"
                  icon={
                    <CaretIcon className="skt-bottom-nav-skitte-icons-icon skitte-icon-button" />
                  }
                >
                  <DropdownMenu user={profile}></DropdownMenu>
                </NavItem>
              </>
            ) : null}
          </Navbar>
        </div>
      </>
    )
  );
}

function Navbar(props) {
  return (
    <header className="skitte-navbar">
      <div className="skt-container">
        <nav className="skt-bottom-nav flex justify-center">
          {props.children}
        </nav>
      </div>
    </header>
  );
}

function NavItem(props) {
  const [open, setOpen] = useState(false);

  // TO Remove DropUpMenu When
  // User Click AnyWhere
  var removeOverlay = document.querySelector(".nav-overlay");
  if (removeOverlay && open === false) {
    document.body.removeChild(removeOverlay);
  } else {
    if (open === true) {
      var overlay = document.createElement("div");
      overlay.classList.add("nav-overlay");
      document.body.appendChild(overlay);
      overlay.addEventListener("click", function () {
        setOpen(false);
      });
    }
  }

  const className = props.className ? props.className : "skt-bottom-nav-item";
  const handleLink = () => {
    window.location.href = `${props.link}`;
  };

  return (
    <li className={className + " skt-bottom-nav-item"}>
      <div className="skt-bottom-nav-item">
        <div className="skt-bottom-nav-link">
          <i
            className="skt-bottom-nav-skitte-icons"
            data-link={props.link}
            onClick={() => setOpen(!open)}
          >
            {props.user ? (
              <figure
                className={`${
                  !props.didlookup ? `skt-skeleton-load` : null
                } rounded-full bg-gray-500 w-12 h-12 object-cover bg-cover overflow-hidden`}
                onClick={handleLink}
                data-link={props.link}
                style={{ backgroundImage: `url(${props.user.image})` }}
              >
                <img
                  src={props.user.image}
                  className="none"
                  alt={props.user.username}
                />
              </figure>
            ) : (
              <a href={`#${props.text}`} onClick={handleLink}>
                {props.icon}
              </a>
            )}
          </i>

          <span className="skt-bottom-nav-text">
            {props.text ? props.text : "..."}
          </span>
          {open && props.children}
        </div>
      </div>
    </li>
  );
}

function DropdownMenu(props) {
  const [activeMenu, setActiveMenu] = useState("main");
  const [menuHeight, setMenuHeight] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    setMenuHeight(dropdownRef.current?.firstChild.offsetHeight + 40);
  }, []);

  function calcHeight(el) {
    const height = el.offsetHeight + 40;
    setMenuHeight(height);
  }
  const { user } = props;

  function DropdownItem(props) {
    // const
    return (
      <a
        href={props.link}
        className="skitte-menu-item"
        onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}
      >
        <figure
          className="skitte-icon-button object-cover bg-cover overflow-hidden"
          style={{
            backgroundImage: `url(${props.img})`,
            transform: "scale(1.222)",
          }}
        >
          {props.leftIcon ? (
            props.leftIcon
          ) : props.img ? (
            <img src={props.img ? props.img : ""} alt="" className="h-80" />
          ) : null}
        </figure>
        {props.children}
        {props.rightIcon ? (
          <span className="skitte-icon-button skitte-icon-right">
            {props.rightIcon}
          </span>
        ) : null}
      </a>
    );
  }

  return (
    <div
      className="skitte-dropdown"
      style={{ height: menuHeight }}
      ref={dropdownRef}
    >
      <CSSTransition
        in={activeMenu === "main"}
        timeout={500}
        classNames="skitte-menu-primary"
        unmountOnExit
        onEnter={calcHeight}
      >
        <div className="skitte-menu">
          <DropdownItem img={user.image} link={`/profile/${user.username}`}>
            My Profile
          </DropdownItem>
          <DropdownItem leftIcon={<BellIcon />} link={`/notifications/`}>
            Notifications
          </DropdownItem>
          <DropdownItem
            leftIcon={<FriendsIcon />}
            rightIcon={<ChevronIcon />}
            goToMenu="friends"
          >
            Friends
          </DropdownItem>
          <DropdownItem
            leftIcon={<CogIcon />}
            rightIcon={<ChevronIcon />}
            goToMenu="settings"
          >
            Setting
          </DropdownItem>
        </div>
      </CSSTransition>

      <CSSTransition
        in={activeMenu === "settings"}
        timeout={500}
        classNames="skitte-menu-secondary"
        unmountOnExit
        onEnter={calcHeight}
      >
        <div className="skitte-menu">
          <DropdownItem goToMenu="main" leftIcon={<ArrowIcon />}>
            <h2>My Settings</h2>
          </DropdownItem>
          <DropdownItem leftIcon={<UserEditIcon />} link={`/profiles/u/edit`}>
            Edit Porfile
          </DropdownItem>
          <DropdownItem leftIcon={<BoltIcon />} link={"/credit"}>
            Credit
          </DropdownItem>
          <DropdownItem leftIcon={<SignOutIcon />} link="/logout/">
            Logout
          </DropdownItem>
        </div>
      </CSSTransition>

      <CSSTransition
        in={activeMenu === "friends"}
        timeout={500}
        classNames="skitte-menu-secondary"
        unmountOnExit
        onEnter={calcHeight}
      >
        <div className="skitte-menu">
          <DropdownItem goToMenu="main" leftIcon={<ArrowIcon />}>
            <h2>My Friends</h2>
          </DropdownItem>
          <DropdownItem
            leftIcon={<FriendsIcon />}
            link={`/profiles/${user.username}/friends`}
          >
            Friends
          </DropdownItem>
          <DropdownItem
            leftIcon={<UserPlusIcon />}
            link={`/profiles/${user.username}/friends`}
          >
            Friend Request
          </DropdownItem>
        </div>
      </CSSTransition>
    </div>
  );
}

export default NavbarComponent;
