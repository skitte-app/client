import React, { useEffect, useState } from "react";
import { ReactComponent as NewsPaperIcon } from "../icons/newspaper.svg";
import { ReactComponent as SkitteIcon } from "../icons/skitte-logo.svg";

import { apiSkitList } from "../skits/lookup";

import { PostSkitList } from "./SkitsList";

export function SkitsList(props) {
  const [skitsInit, setSkitsInit] = useState([]);
  const [skits, setSkits] = useState([]);
  // const [nextUrl, setNextUrl] = useState(null);
  const [skitsDidSet, setSkitsDidSet] = useState(false);
  const [loading, setLoading] = useState(true);
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
          // setNextUrl(response.next);
          setSkitsInit(response.results);
          setSkitsDidSet(true);
        } else {
          alert("There was an error");
        }
      };
      apiSkitList(props.username, props.location, handleSkitListLookup);
      setLoading(false);
    }
  }, [skitsInit, skitsDidSet, setSkitsDidSet, props.username, props.location]);
  return loading ? (
    <div className="w-full">
      <div className="no-post">
        <SkitteIcon />
        <p>Loading...</p>
      </div>
    </div>
  ) : skits.length > 0 ? (
    <React.Fragment>
      {skits.map((item, index) => {
        return (
          !loading && (
            <PostSkitList
              skit={item}
              is_profile={props.is_profile ? true : false}
              className={
                props.is_profile
                  ? "bg-green-100 bg-opacity-25"
                  : "overflow-hidden skitte-post lg:border-green-200 lg:p-3 mt-5 rounded-lg hover:shadow-lg hover:border-green-400 lg:border mx-3 md:mx-0 lg:mx-0"
              }
              key={`${index}-${item.id}`}
            />
          )
        );
      })}
      <div className="msp"></div>
    </React.Fragment>
  ) : !skits.length > 0 ? (
    <div style={{ width: "100%", height: "100vh", position: "relative" }}>
      <div className="no-post">
        <NewsPaperIcon />
        <p>no posts.</p>
      </div>
    </div>
  ) : null;
}
