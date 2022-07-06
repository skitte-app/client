import React, { useEffect, useState } from 'react';
import {apiProfileDetail, apiAcceptFriendRequest} from '../profiles/lookup';
import { Friend } from './list';

export function FriendsComponent(props) {
  const { username } = props;
  let accept_rqbtn = "Accept";
  let ignore_rqbtn = "Ignore";
  // Lookup
  const [didlookup, setDidLookup] = useState(false);
  const [requestLoading, setRequestLoading] = useState(false);
  const [requestLoading2, setRequestLoading2] = useState(false);

  accept_rqbtn = requestLoading && accept_rqbtn ? "Accepted" : accept_rqbtn;
  ignore_rqbtn = requestLoading2 && ignore_rqbtn ? "Ignored" : ignore_rqbtn;

  const [profile, setProfile] = useState(null);
  const [requestCount, setRequestCount] = useState(null);
  const handleBackendLookup = (response, status) => {
    if (status === 200) {
      setProfile(response);
      setRequestCount(response.received_request.count);
    }
  };
  useEffect(() => {
    if (didlookup === false) {
      apiProfileDetail(username, handleBackendLookup);
      setDidLookup(true);
    }
  }, [username, didlookup, setDidLookup]);
  
  // var username = window.location.pathname.match(/(?<username>\d+)/).groups.username
  // console.log(username);
  const handleRequests = (friend, request) => {
    apiAcceptFriendRequest(friend, request, (response, status) => {
      if (status === 200) {
        setRequestCount(response.received_request.count);
      }
      setRequestLoading(false);
    });
    setRequestLoading(true);
  };
  return didlookup === false ? (
    "Loading..."
  ) : profile ? (
    <Friend 
    user={profile}
    accept_rqbtn={accept_rqbtn}
    ignore_rqbtn={ignore_rqbtn}
    handleReq={handleRequests}
    requests={requestCount}
    requestLoading2={requestLoading2}
    requestLoading={requestLoading}
    setRequestLoading2={setRequestLoading2}
    setRequestLoading={setRequestLoading}
     />
  ): null
  }
