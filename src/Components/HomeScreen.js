import React from 'react'
import 'alpinejs';
import GetSkits from "./GetSkits";
import { NavLink } from "react-router-dom";

export default function HomeScreen(props) {
    const { profile, forYou } = props;
  return  (
    <div>
      <nav class="flex flex-row w-full">
        <NavLink className="skt-following mr-2 border-none link-effect" activeclassname="active" to="/">
      Following
        </NavLink>
        <NavLink className="navbar-item link-effect" activeclassname="active" to="/fyp">
      For You
        </NavLink>
      </nav>
          <div className="container mt-2" style={{ marginTop: 40 }}>
        {!forYou ? (
          <GetSkits user={profile} />
        ): (<GetSkits user={profile} forYou />)}
      </div>
    </div>
  )
}
