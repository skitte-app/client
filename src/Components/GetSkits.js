import React, { useEffect, useState } from "react";
import {
  useQuery,
  // ,gql
} from "@apollo/client";
import { LOAD_SKITS } from "../GraphQL/Queries";
import { Skit } from "../skits/detail";
import Feed from "../posts";

export default function GetSkits(props) {
  const { user } = props;
  const {
    // error,
    loading,
    data,
  } = useQuery(LOAD_SKITS);
  const [skits, setSkits] = useState([]);
  const [didskit, setdidSkit] = useState(false);
  useEffect(() => {
    if (data && data !== undefined) {
      setSkits(data.feed);
      setdidSkit(true);
    }
  }, [data]);
  // if (!loading && didskit) {
  //   console.log(skits[0].user.image);
  // }
  return skits.length > 0 ? (
    <div className="mx-auto my-6 container">
      {" "}
      <Feed skits={skits} user={user} />
      {skits.map((val, index) => {
        return !loading && (
          <Skit
            skit={val}
            feed
            className="overflow-hidden skitte-post lg:border-green-200 lg:p-3 mt-5 rounded-lg hover:shadow-lg hover:border-green-400 lg:border mx-3 md:mx-0 lg:mx-0"
            key={`${index}-{item.id}`}
          />
        );
      })}
    </div>
  ): "No Post Here, Be The First To Post";
}
