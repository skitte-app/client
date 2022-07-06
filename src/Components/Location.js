import React, { useState } from "react";

const Location = () => {
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [country, setcountry] = useState(null);
  const [status, setStatus] = useState(null);

  const getLocation = () => {
    if (!navigator.geolocation) {
      setStatus("Geolocation is not supported by your browser");
    } else {
      setStatus("Locating...");
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setStatus(null);
          setLat(position.coords.latitude);
          setLng(position.coords.longitude);
        },
        () => {
          setStatus("Unable to retrieve your location");
        }
      );
    }
  };
  function httpGetAsync(url, callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
      if (xmlHttp.readyState === 4 && xmlHttp.status === 200)
            callback(xmlHttp.responseText);
        if(country === null)
            setcountry(xmlHttp.responseText)
    };
    xmlHttp.open("GET", url, true); // true for asynchronous
    xmlHttp.send(null);
  }

  var url =
    "https://ipgeolocation.abstractapi.com/v1/?api_key=61ab4f0659184a9281c40b33989671f1";

  httpGetAsync(url);

  return (
    <div className="Location">
      <button onClick={getLocation}>Get Location</button>
      <h1>Your Current Location is:</h1>
      <p>{status}</p>
      {lat && <p>Latitude: {lat}</p>}
      {lng && <p>Longitude: {lng}</p>}
      {country && <p>Country: { country }</p>}
    </div>
  );
};

export default Location;
