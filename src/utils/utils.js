/* eslint-disable no-useless-escape */
import React from "react";
import numeral from "numeral";
import { HOST, MEDIA_URL } from "../config";

export function DisplayCount(props) {
  return (
    <span
      className={props.className}
      style={{ textTransform: "uppercase" }}
      id={props.type}
    >
      {numeral(props.children).format("0a")}
    </span>
  );
}

export const ROT13 = (s) => {
  return (s ? s : this)
    .split("")
    .map(function (_) {
      if (!_.match(/[A-Za-z]/)) return _;
      var c = Math.floor(_.charCodeAt(0) / 97);
      var k = (_.toLowerCase().charCodeAt(0) - 83) % 26 || 26;
      return String.fromCharCode(k + (c === 0 ? 64 : 96));
    })
    .join("");
};
export const Sluglify = (string) => {
  const a =
    "àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;";
  const b =
    "aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------";
  const p = new RegExp(a.split("").join("|"), "g");

  return string
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(p, (c) => b.charAt(a.indexOf(c))) // Replace special characters
    .replace(/&/g, "-and-") // Replace & with 'and'
    .replace(/[^\w\-]+/g, "") // Remove all non-word characters
    .replace(/\-\-+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, ""); // Trim - from end of text
};
export const EncrpytROT13 = (string) => {
  var d = new Date();
  var time = d.getHours() + ":" + d.getSeconds() + ":" + d.getMinutes();
  console.log(time);
  var encryptedSlug = Sluglify(
    ROT13(
      btoa(
        ROT13(
          encodeURIComponent(
            "skitte-post:&=" +
              encodeURIComponent(window.location.host) +
              btoa(time)
          ) + "/"
        )
      )
    )
  );
  for (let i = 0; i < 46; i++) {
    string += encryptedSlug[i].toUpperCase().replace("E", "_");
  }
  return string;
};

export const CheckUrl = (url, callback) => {
  var request = new XMLHttpRequest();
  request.open("GET", url, true);
  request.send();
  request.onload = function () {
    var status = request.status;
    if (status === 200) {
      //if(statusText == OK)
      console.log("image exists");
      callback(url);
    } else if (status === 403) {
      callback(url);
      console.log("You are not allowed to see this image");
    } else {
      callback(`${HOST}/sktmedia/image-invalid.png`);
      console.log("image doesn't exist");
    }
  };
};

export const alertComponent = (msg, url, status, btnHtml, onExit) => {
  let msgType = status === 0 ? "error" : status === 1 ? "success" : "none";
  let btnClass =
    "mr-3 pl-3 pr-3 border hover:bg-green-200 hover:text-green-600 hover:border-transparent";
  onExit = onExit === true ? true : false;
  var sktAlertWrap = document.querySelector(".skt-alert-wrap"),
    sktAlertMsg = document.querySelector(".skt-alert-msg"),
    sktAlertOverlay = document.querySelector(".skt-alert-overlay"),
    sktAlertBtn = document.querySelector(".skt-alert-btn");
  if (sktAlertWrap && sktAlertMsg && sktAlertOverlay) {
    sktAlertWrap.setAttribute(
      "class",
      "skt-alert-wrap fixed top-0 justify-center pointer-events-none flex w-screen h-screen"
    );
    sktAlertOverlay.setAttribute(
      "class",
      "skt-alert-overlay fixed top-0 justify-center flex w-screen h-screen"
    );
    sktAlertMsg.setAttribute("class", `skt-alert-msg skt-alert-${msgType}`);
    sktAlertMsg.innerText = `${msg}`;
    sktAlertBtn.innerHTML = `${
      btnHtml === 403
        ? `<button class="home-alert-btn mr-2 home-join">Join</button>
      <button class="home-alert-btn home-login">Login</button>`
        : btnHtml === 0
        ? `<button class="home-alert-btn home-alert-ok">Ok</button>`
        : btnHtml
    }`;
    document
      .querySelector(".skt-alert")
      .setAttribute("style", "pointer-events: auto;");
    if (onExit === true) {
      sktAlertWrap.setAttribute("style", "pointer-events: none;");
      sktAlertOverlay.addEventListener("click", function () {
        sktAlertWrap.setAttribute("class", "skt-alert-wrap none");
        sktAlertOverlay.setAttribute("class", "skt-alert-overlay none");
      });
    }
    var homeAlertBtns = document.querySelectorAll(".home-alert-btn");
    var homeOkBtn = document.querySelector(".home-alert-ok");
    var homeJoinBtn = document.querySelector(".home-join");
    var homeLoginBtn = document.querySelector(".home-login");

    if (homeJoinBtn)
      homeJoinBtn.addEventListener("click", function () {
        window.location.href = `/register${
          window.location.pathname !== ""
            ? `?next=${window.location.pathname}`
            : ""
        }`;
      });
    if (homeLoginBtn)
      homeLoginBtn.addEventListener("click", function () {
        window.location.href = `/login${
          window.location.pathname !== "/"
            ? `?next=${window.location.pathname}`
            : ""
        }`;
      });
    if (homeAlertBtns[0])
      homeAlertBtns[0].setAttribute(
        "class",
        document.querySelectorAll(".home-alert-btn")[0].className + btnClass
      );
    if (homeAlertBtns[1])
      homeAlertBtns[1].setAttribute(
        "class",
        document.querySelectorAll(".home-alert-btn")[1].className + btnClass
      );
    if (homeOkBtn)
      homeOkBtn.addEventListener("click", function () {
        sktAlertWrap.setAttribute("class", "skt-alert-wrap none");
        sktAlertOverlay.setAttribute("class", "skt-alert-overlay none");
      });
  } else {
    if (url) {
      window.location.href = url;
    } else {
      window.location.reload();
    }
  }
};

export const ImageFullScreen = (image, index) => {
  // Open
  document.querySelector(".image-viewer").classList.remove("none");
  document.querySelector(".image-viewer-close").innerText = "+";
  document.querySelector(".image-viewer-overlay").classList.remove("none");
  document
    .querySelector(".image-viewer-figure")
    .setAttribute(
      "style",
      `background-image: url(${image[0] === "/" ? MEDIA_URL + image : image})`
    );
  document.querySelector(".image-viewer-image").setAttribute("src", `${image}`);
  document.querySelector(".image-viewer-image").setAttribute("alt", `${image}`);
  window.location.hash = `image-view=${image}`;

  // Close
  document
    .querySelector(".image-viewer-close")
    .addEventListener("click", function () {
      document.querySelector(".image-viewer").classList.add("none");
      document.querySelector(".image-viewer-overlay").classList.add("none");
      document.querySelector(".image-viewer-figure").setAttribute("style", "");
      document
        .querySelector(".image-viewer-image")
        .addEventListener("load", function () {
          console.log("image loading...");
        });
      document.querySelector(".image-viewer-image").setAttribute("src", "");
      document.querySelector(".image-viewer-image").setAttribute("alt", "");
      if (index) window.location.hash = `post-${index}-image-viewed`;
      else window.location.hash = `image-viewed`;
    });
};
