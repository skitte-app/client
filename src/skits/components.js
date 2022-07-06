import React, { useState, useEffect } from "react";
import { SkitsList } from "./list";
import { Skit } from "./detail";
import { FeedList } from "./feed";
import { apiSkitDetail } from "./lookup";
import { NavbarComponent } from "../NavBar";

export function FeedComponent(props) {
  const [newSkits, setNewSkits] = useState([]);
  const canSkit = props.canSkit === "false" ? false : true;
  const handleNewSkit = (newSkit) => {
    let tempNewSkits = [...newSkits];
    tempNewSkits.unshift(newSkit);
    setNewSkits(tempNewSkits);
  };
  return (
    <div className={props.className}>
      <div className="max-w-xl mx-auto my-6 container">
        <FeedList newSkits={newSkits} {...props} />
      </div>
      <NavbarComponent
        canSkit={canSkit}
        didSkit={handleNewSkit}
        is_authenticated={props.is_authenticated}
        username={props.username}
      />
    </div>
  );
}

export function SkitsComponent(props) {
  const [newSkits, setNewSkits] = useState([]);
  const canSkit = props.canSkit === "false" ? false : true;
  const handleNewSkit = (newSkit) => {
    let tempNewSkits = [...newSkits];
    tempNewSkits.unshift(newSkit);
    setNewSkits(tempNewSkits);
  };
  return (
    <div className={props.className}>
      <div className="max-w-xl mx-auto my-6 container">
        <SkitsList newSkits={newSkits} {...props} />
      </div>
      <NavbarComponent
        canSkit={canSkit}
        didSkit={handleNewSkit}
        is_authenticated={props.is_authenticated}
        username={props.username}
      />
    </div>
  );
}

export function SkitDetailComponent(props) {
  const { skitUrl } = props;
  const [didlookup, setDidLookup] = useState(false);
  const [skit, setSkit] = useState(null);

  const handleBackendLookup = (response, status) => {
    if (status === 200) {
      setSkit(response);
    } else {
      alert("There was an error finding your post");
    }
  };
  useEffect(() => {
    if (didlookup === false) {
      apiSkitDetail(skitUrl, handleBackendLookup);
      setDidLookup(true);
    }
  }, [skitUrl, didlookup, setDidLookup]);
  return skit === null ? null : (
    <>
      <div className="max-w-xl mx-auto my-6 container">
        <Skit skit={skit} className={props.className} />
      </div>
      <NavbarComponent
        canSkit={false}
        is_authenticated={props.is_authenticated}
        username={
          props.username
            ? props.username
            : skit.user.is_user === true
            ? skit.user.username
            : null
        }
      />
    </>
  );
}
