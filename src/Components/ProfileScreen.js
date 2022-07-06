import React from "react";
import { useParams } from "react-router-dom";

const ProfileScreen = () => {
  const { username } = useParams();
  return <div>{username}</div>;
};
export default ProfileScreen;
