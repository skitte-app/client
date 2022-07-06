import React from "react";
import { MEDIA_URL } from "../config";
import { ReactComponent as Heart } from "../icons/heart-full.svg";
import { ReactComponent as Repost } from "../icons/repost.svg";

export function PostSkitList(props) {
  const { skit } = props;
  console.log(skit)
  return (
    <>
      {/* <!-- column --> */}
      <div className="w-1/3 p-px md:px-3">
        <a href={`/post/₦/${skit.slug}`}>
          <article className="post bg-gray-100 rounded-lg text-white relative pb-full md:mb-6">
            {/* <!-- post image--> */}
            {/* {skit.image !== null ? ( */}
              <figure
                className="w-full h-full absolute left-0 top-0 rounded-lg object-cover"
                style={{
                  backgroundImage: `url(${
                    skit.image
                      ? skit.image
                      : skit.parent
                      ? skit.parent.image
                      : `${MEDIA_URL}/skitmedia/image-placeholder.png`
                  }), url(${MEDIA_URL}/static/media/invalid_img.jpg)`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <img
                  style={{ display: "none" }}
                  src={
                    skit.image
                      ? skit.image
                      : skit.parent
                      ? skit.parent.image
                      : null
                  }
                  alt=""
                />
              </figure>
            <i className="fas fa-square absolute right-0 top-0 m-1"></i>
            {/* <!-- overlay--> */}
            <div
              className="overlay bg-gray-800 bg-opacity-25 w-full h-full absolute 
                                left-0 top-0 hidden"
            >
              <div
                className="flex justify-center items-center 
                                    space-x-4 h-full"
              >
                <span className="p-2 flex">
                  <i className="fas fa-heart mr-2">
                    <Heart style={{ width: "20px" }} />
                  </i>
                  {skit.likes}
                </span>

                <span className="p-2 flex">
                  <i className="fas fa-repost mr-2">
                    <Repost style={{ width: "20px" }} />
                  </i>{" "}
                  {skit.reposts}
                </span>
              </div>
            </div>
          </article>
        </a>
      </div>
    </>
  );
}
