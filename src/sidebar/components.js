import React from "react";
import { MEDIA_URL } from "../config";

export function LogoComponent() {
  return (
    <a href="/">
      <img
        src={`${MEDIA_URL}/static/media/logo/brand/skitte-logo-brand.png`}
        alt="logo"
        title="Skitte"
      />
    </a>
  );
}

export function DeviceNotCompartable() {
  return (
  <div id="not_compart">
    <h1>Sorry,</h1>
    <p>The Size Of This Device Is Too Small For This Web App.</p>
  </div>
  );
}
