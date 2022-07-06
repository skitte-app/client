import React, { useEffect, useState } from "react";

import { apiSkitList } from "./lookup";

import { Skit } from "./detail";

import { Message2 } from "../message";

export function SkitsList(props) {
  const [skitsInit, setSkitsInit] = useState([]);
  const [skits, setSkits] = useState([]);
  const [nextUrl, setNextUrl] = useState(null);
  const [skitsDidSet, setSkitsDidSet] = useState(false);
  const [msg, setMsg] = useState();
  const [showMsg, setShowMsg] = useState(1);
  const [status, setStatus] = useState(true);

  useEffect(() => {
    const final = [...props.newSkits].concat(skitsInit);
    if (final.length !== skits.length) {
      setSkits(final);
    }
  }, [props.newSkits, skits, skitsInit]);

  useEffect(() => {
    if (skitsDidSet === false) {
      const handleSkitListLookup = (response, status) => {
        var skeleton = document.querySelector(".skitte-load-skeleton"),
          skeletons = document.querySelector("#skitte-load-skeleton");
        for (let i = 0; i < 10; i++) {
          skeleton.append(skeletons.cloneNode(true));
        }
        if (status === 200) {
          setNextUrl(response.next);
          setSkitsInit(response.results);
          setSkitsDidSet(true);
        } else {
          setStatus(0);
          setMsg("There was a error");
          setShowMsg(true);
        }
      };
      apiSkitList(props.username, props.location, handleSkitListLookup);
    }
  }, [skitsInit, skitsDidSet, setSkitsDidSet, props.username, props.location]);

  const handleDidRepost = (newSkit) => {
    const updateSkitsInit = [...skitsInit];
    updateSkitsInit.unshift(newSkit);
    setSkitsInit(updateSkitsInit);
    const updateFinalSkits = [...skits];
    updateFinalSkits.unshift(skits);
    setSkits(updateFinalSkits);
  };
  const handleLoadNext = (event) => {
    event.preventDefault();
    if (nextUrl !== null) {
      const handleLoadNextResponse = (response, status) => {
        if (status === 200) {
          setNextUrl(response.next);
          const newSkits = [...skits].concat(response.results);
          setSkitsInit(newSkits);
          setSkits(newSkits);
        } else {
          alert("There was an error");
        }
      };
      apiSkitList(
        props.username,
        props.location,
        handleLoadNextResponse,
        nextUrl
      );
    }
    const More_Btn = document.querySelector(".more-btn");
    More_Btn.classList.add("display-none");
  };
  return (
    <React.Fragment>
      {showMsg && msg ? <Message2 msg={msg} status={status} /> : null}{" "}
      <div
        className={`skitte-load-skeleton ${skitsDidSet ? `none` : null}`}
      ></div>
      {!skitsDidSet && (
          <article
            id="skitte-load-skeleton"
            className="overflow-hidden skitte-post lg:border-green-200 lg:p-3 mt-5 rounded-lg hover:shadow-lg hover:border-green-400 lg:border mx-3 md:mx-0 lg:mx-0 cursor-pointer md:p-2 shadow-lg mb-5"
          >
            <div className="w-full flex justify-between p-3">
              <div className="flex flex-1 items-center m-13">
                <div className="flex-1 flex items-center">
                  <span className="pointer">
                    <figure
                      data-profile-image
                      className="rounded-full w-12 h-12 skt-skeleton-load flex items-center justify-center overflow-hidden mr-3"
                    ></figure>
                  </span>
                  <div className="w-full">
                    <div className="flex justify-between skt-skeleton-load skt-skeleton-load-text mr-4"></div>
                    <div className="skt-skeleton-load skt-skeleton-load-text"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full p-3" data-body>
              <div className="skt-skeleton-load skt-skeleton-load-text"></div>
              <div className="skt-skeleton-load skt-skeleton-load-text"></div>
              <div className="skt-skeleton-load skt-skeleton-load-text"></div>
              <div className="mb-2 skt-skeleton-load skt-skeleton-load-text"></div>
            </div>
            <figure className="skt-skeleton-load post-fig w-full mt-3 rounded-lg h-2/3"></figure>
            <div className="flex items-center justify-start py-2 px-1">
              <div className="flex items-center mr-6">
                <button className="skt-skeleton-load w-8 h-8 rounded-full flex items-center justify-center"></button>
              </div>
              <div className="flex items-center mr-6">
                <button className="skt-skeleton-load w-8 h-8 rounded-full flex items-center justify-center"></button>
              </div>
            </div>
          </article>
      )}
      {skits.map((item, index) => {
        return (
          <Skit
            skit={item}
            index={index}
            didRepost={handleDidRepost}
            is_profile={props.is_profile ? true : false}
            className={
              props.is_profile
                ? "bg-green-100 bg-opacity-25"
                : "overflow-hidden skitte-post lg:border-green-200 lg:p-3 mt-5 rounded-lg hover:shadow-lg hover:border-green-400 lg:border mx-3 md:mx-0 lg:mx-0"
            }
            key={`${index}-${item.id}`}
          />
        );
      })}
      {nextUrl !== null && (
        <div className="flex items-center justify-center w-full p-4">
          <button
            onClick={handleLoadNext}
            className="text-muted more-btn w-full border border-green-400 p-3 rounded-full bg-green"
          >
            load more
          </button>
        </div>
      )}
      <div className="msp"></div>
    </React.Fragment>
  );
}
