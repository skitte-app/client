import React, { useEffect, useState } from 'react'
import { Routes, Route } from "react-router-dom";
import Search from "../Components/Search";
import Alpine from "alpinejs";
import {HomeScreen} from "../Components";
import { LOAD_LOGIN_USER } from "../GraphQL/Queries";
import { useQuery } from '@apollo/client';

window.Alpine = Alpine;

Alpine.start();

const Router = () => {
  const { loading, data, error, previousData } = useQuery(LOAD_LOGIN_USER);
  const [profile, setProfile] = useState([]);
  const [didprofile, setdidProfile] = useState(false);
  useEffect(() => {
    if (data && data !== undefined && !didprofile) {
      setProfile(data.myProfile);
      setdidProfile(true)
      console.log(previousData);
    } else if(!loading && data === undefined) {
      window.location.href = "/login/"
    }
  }, [data, didprofile, loading, previousData]);
return !loading && (
    <React.Fragment>
      <Routes>
        <Route exact path="/" element={<HomeScreen profile={profile} />} />
        <Route exact path="/fyp" element={<HomeScreen profile={profile} forYou />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </React.Fragment>
  );
};

export default Router;
