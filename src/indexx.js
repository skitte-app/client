import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { ProfileBadgeComponent, ProfileEdit } from "./profiles";
import { FriendsComponent } from "./friends";
import { SearchComponent } from "./search";
import { SkitsComponent, SkitDetailComponent, FeedComponent } from "./skits";
import NavbarComponent from "./NavBar";
import { LogoComponent, DeviceNotCompartable } from "./sidebar";

var e = React.createElement;

var navBar = document.getElementById("skitte-navbar");
if (navBar) {
  ReactDOM.render(e(NavbarComponent, navBar.dataset), navBar);
}
var sidebar = document.getElementById("sktLogo");
if (sidebar) {
  ReactDOM.render(e(LogoComponent, sidebar.dataset), sidebar);
}

var ProfileEditEl = document.getElementById("skitte-profile-edit");
if (ProfileEditEl) {
  ReactDOM.render(e(ProfileEdit, ProfileEditEl.dataset), ProfileEditEl);
}

var skitsEl = document.getElementById("skitte");
if (skitsEl) {
  // console.log(skitsEl.dataset);
  ReactDOM.render(e(SkitsComponent, skitsEl.dataset), skitsEl);
}

var skitFeedEl = document.getElementById("skitte-feed");
if (skitFeedEl) {
  // console.log(skitFeedEl.dataset);
  ReactDOM.render(e(FeedComponent, skitFeedEl.dataset), skitFeedEl);
}

var skitDetailElements = document.querySelectorAll(".skitte-detail");

skitDetailElements.forEach((container) => {
  ReactDOM.render(e(SkitDetailComponent, container.dataset), container);
});

var userProfileBadgeElements = document.querySelectorAll(
  ".skitte-profile-badge"
);

userProfileBadgeElements.forEach((container) => {
  ReactDOM.render(e(ProfileBadgeComponent, container.dataset), container);
});

var userFriendsElements = document.querySelectorAll(".skitte-friends");

userFriendsElements.forEach((container) => {
  ReactDOM.render(e(FriendsComponent, container.dataset), container);
});

var skitteSearchElement = document.querySelectorAll(".skitte-search");

skitteSearchElement.forEach((container) => {
  ReactDOM.render(e(SearchComponent, container.dataset), container);
});

// Device Size Not Allowed
var c = document.getElementById("cDevice");
if (c) {
  ReactDOM.render(e(DeviceNotCompartable), c);
}
