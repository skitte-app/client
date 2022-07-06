import React, { useEffect, useState } from "react";
import { apiSkitFeed } from "./lookup";
import { Skit } from "./detail";

export function FeedList(props) {
  const [skitsInit, setSkitsInit] = useState([]);
  const [skits, setSkits] = useState([]);
  const [nextUrl, setNextUrl] = useState(null);
  const [skitsDidSet, setSkitsDidSet] = useState(false);
  useEffect(() => {
    const final = [...props.newSkits].concat(skitsInit);
    if (final.length !== skits.length) {
      setSkits(final);
    }
  }, [props.newSkits, skits, skitsInit]);

  useEffect(() => {
    if (skitsDidSet === false) {
      const handleSkitListLookup = (response, status) => {
        if (status === 200) {
          setNextUrl(response.next);
          setSkitsInit(response.results);
          setSkitsDidSet(true);
        }
      };
      apiSkitFeed(handleSkitListLookup);
    }
  }, [skitsInit, skitsDidSet, setSkitsDidSet, props.username]);

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
        }
      };
      apiSkitFeed(handleLoadNextResponse, nextUrl);
    }
    const More_Btn = document.querySelector(".more-");
    More_Btn.classList.add("display-none");
  };
  return (
    <React.Fragment>
      {" "}
      {skits.map((item, index) => {
        return (
          <Skit
            skit={item}
            didRepost={handleDidRepost}
            feed
            className="overflow-hidden skitte-post lg:border-green-200 lg:p-3 mt-5 rounded-lg hover:shadow-lg hover:border-green-400 lg:border mx-3 md:mx-0 lg:mx-0"
            key={`${index}-{item.id}`}
          />
        );
      })}
      {nextUrl !== null && (
        <div className="flex items-center justify-center w-full p-4">
          <button
            onClick={handleLoadNext}
            className="text-muted more-btn mb-5 w-full border rounded-full bg-green"
          >
            load more
          </button>
        </div>
      )}
      <div className="msp"></div>
    </React.Fragment>
  );
}
