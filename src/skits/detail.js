import React, { useState } from "react";

import { ActionBtn } from "./buttons";

import { UserDisplay, UserPicture, UserImage } from "../profiles";
import { ReactComponent as FullHeart } from "../icons/redHeart.svg";
import { useStyles } from "./style";
// import { Message } from "../message";
import { MEDIA_URL } from "../config";

import { ReactComponent as RepostIcon } from "../icons/repost.svg";
import { ImageFullScreen } from "../utils";

export function ParentSkit(props) {
  var { skit, reposter, loading, index, checkLike } = props;
  return skit.parent && !loading ? (
    <Skit
      isRepost
      hideActions
      reposter={reposter}
      className={
        "w-full overflow-hidden skitte-post lg:p-3 lg:skt-rounded-lg rounded-lg cursor-pointer hover:border-green-200 hover:border"
      }
      checkLike={checkLike}
      index={index}
      skit={skit.parent}
    />
  ) : null;
}
export function Skit(props) {
  var { skit, didRepost, hideActions, isRepost, reposter, index } = props;
  const [actionSkit, setActionSkit] = useState(props.skit ? props.skit : null);
  const [checkLike, setCheckLike] = useState(false);
  const [loading, setLoading] = useState(false);
  let className = props.className ? `${props.className}` : null;
  className = isRepost === true ? `${className}` : className;
  const path = window.location.pathname;
  const match = path.match(/(?<skiturl>\d+)/);
  const urlSkitUrl = match ? match.input : -1;
  const isDetail = `/post/%E2%82%A6/${skit.slug}` === `${urlSkitUrl}`;

  const classes = useStyles();

  const handlePerformAction = (newActionSkit, status) => {
    if (!loading) {
      if (status === 200) {
        setLoading(true);
        setActionSkit(newActionSkit);
        setLoading(false);
      } else if (status === 201) {
        setLoading(true);
        if (didRepost) {
          didRepost(newActionSkit);
          setLoading(false);
        }
      }
    }
  };
  let timer;
  index = isRepost ? skit.id : index;
  const handleImage = (event) => {
    clearTimeout(timer);
    if (event.detail === 1) {
      timer = setTimeout(() => {
        var image = document.getElementById(`skt-image-${index}`);
        ImageFullScreen(image.src, `${index}`);
        console.log(image);
      }, 200);
    } else if (event.detail > 1) {
      if (isRepost) {
        window.location.href = `/post/%E2%82%A6/${skit.slug}`;
      } else {
        var heart = document.querySelector(`.like-heart-${index}`);
        heart.classList.add("show");
        timer = setTimeout(() => {
          var likeBtn = document.querySelector(`.like-${index}`);
          var likedBtn = document.querySelector(`.like-${index}-liked`);
          if (!likedBtn) {
            likeBtn.click();
          }
          heart.classList.remove("show");
          setCheckLike(true);
        }, 400);
      }
    }
  };
  const handleReposterLink = (e) => {
    e.preventDefault();
    if (reposter && reposter.username) {
      window.location.href = `/profile/${reposter.username}`;
    } else alert("Profile Not Found");
  };
  return (
    <>
      <article
        className={`${className} cursor-pointer md:p-2 shadow-lg ${skit.parent ? `skitte-post-repost` : ``}`}
        // onClick={handleDetailLink}
      >
        {isRepost === true && !isRepost === false && (
          <div className="w-full repost-tag" onClick={handleReposterLink}>
            <RepostIcon className="repost-tag-icon pl-2 pb-1 pr-3 pt-1" />
            <p className="p-2">
              Reposted by <UserDisplay user={reposter} />
            </p>
          </div>
        )}

        <div className="w-full flex justify-between p-3">
          <div className="flex flex-1 items-center m-13">
            <div className="flex-1 flex items-center">
              {skit && !loading ? (
                <UserImage
                  user={
                    skit.user
                      ? skit.user
                      : skit.user
                      ? skit.user.image
                      : null
                  }
                  className="rounded-full skt-skeleton-load skt-skeleton-load-op"
                />
              ) : (
                <UserPicture user={skit.user} />
              )}
              <UserDisplay
                includeFullName
                user={
                  skit.user
                    ? skit.user
                    : skit.user
                    ? skit.user.image
                    : null
                }
                date={skit.date ? skit.date : skit ? skit.date : null}
                className="w-full flex justify-between p-3"
              />
            </div>
          </div>
        </div>
        <div className="w-full px-3">
          <p className="mb-2">{skit.content}</p>
        </div>
        {skit.image ? (
          <figure
            onClick={handleImage}
            className={` ${
              isDetail
                ? `skt-image object-contain bg-contain`
                : "skt-image skt-skeleton-load lg:skt-rounded-lg object-cover bg-cover skt-skeleton-load-op"
            }`}
            style={{
              backgroundImage: `url(
                ${
                skit.image[0] === `/` ? `${MEDIA_URL}${skit.image}` : skit.image
              }
              )${
                isDetail
                  ? ""
                  : `, url(${MEDIA_URL}/sktmedia/image-placeholder.png)`
              }`,
            }}
          >
            {/* Like Heart */}
            <div className={`skt-image-like-heart like-heart-${index}`}>
              <FullHeart className={classes.skitte_like_heart} />
            </div>
            <img
              src={
                skit.image[0] !== "/" ? skit.image : `${MEDIA_URL}${skit.image}`
              }
              className="h-80 lg:skt-rounded-lg w-full h-full skt-image-img"
              id={`skt-image-${index}`}
              alt={skit.content}
            />
          </figure>
        ) : null}
        <ParentSkit
          skit={skit}
          checkLike={checkLike}
          loading={loading}
          reposter={skit.user}
        />
        {isRepost === true && !isRepost === false && skit.image && (
          <div className="repost-notifer">
            {skit.user.username !== reposter.username && (
              <label htmlFor="repost">
                <UserDisplay user={skit.user} className="" />
              </label>
            )}

            <label htmlFor="repost-by">
              <UserDisplay user={reposter} className="" />
            </label>
          </div>
        )}
        {actionSkit && hideActions !== true && (
          <div className="flex items-center justify-start py-2 px-1">
            <React.Fragment>
              <ActionBtn
                skit={actionSkit}
                id={skit.id}
                didPerformAction={handlePerformAction}
                checkLike={checkLike}
                isRepost={skit.parent ? true : false}
                index={actionSkit.parent ? skit.id : index}
                className={`flex hover:text-red-500 items-center mr-6 skit-like skit-like`}
                action={{ type: "like", display: "like" }}
              />
              {!skit.parent ? (
                <ActionBtn
                  skit={actionSkit}
                  id={skit.id}
                  checkLike={checkLike}
                  isRepost={isRepost}
                  detail={isDetail}
                  didPerformAction={handlePerformAction}
                  className={`flex hover:text-green-500 items-center mr-6`}
                  action={{ type: "repost", display: "Repost" }}
                />
              ) : null}
            </React.Fragment>
          </div>
        )}
      </article>
    </>
  );
}

// export function ImageViewer(props) {
//   var {
//     image,
//     index,
//     open,
//     setOpen,
//     // ,loading, error
//   } = props;
//   // Overlay
//   var imageOverlay = document.createElement("div");
//   imageOverlay.setAttribute(
//     "class",
//     "image-viewer-overlay w-full h-screen fixed top-0 left-0 bg-gray-200"
//   );
//   console.log(imageOverlay);

//   var imageViewer = document.createElement("div");
//   imageViewer.setAttribute(
//     "class",
//     "image-viewer w-full h-screen fixed top-0 left-0"
//   );
//   console.log(imageViewer);

//   // Close Btn
//   var imageCloser = document.createElement("div");
//   imageCloser.setAttribute(
//     "class",
//     "image-viewer-close absolute right-0 mr-2 cursor-pointer pointer-events-auto hover:text-red-200"
//   );
//   imageCloser.innerText = "+";

//   // Figure
//   var imageFigure = document.createElement("figure");
//   imageFigure.setAttribute("class", "bg-contain pointer-events-none");
//   imageFigure.setAttribute(
//     "style",
//     `background-image: url(${image[0] === "/" ? MEDIA_URL + image : image})`
//   );
//   imageFigure.innerHTML = `
//   <img
//   src=${image}
//   alt=${image}
//   class="m-auto h-screen opacity-0 pointer-events-auto" />
//   `;

//   imageViewer.appendChild(imageCloser);
//   imageViewer.appendChild(imageFigure);

//   // Checking if image Viewer el Exists
//   var checker = document.querySelector(".image-viewer");
//   if (!checker && open) {
//     document.body.appendChild(imageOverlay);
//     document.body.appendChild(imageViewer);
//   }
//   window.location.hash = `image-view=${image}`;
//   // const closeImageViewer = () => {
//   //   setOpen(false);
//   //   if (index) window.location.hash = `#post-${index}`;
//   // };
//   return null;
// }
