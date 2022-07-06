/* eslint-disable no-self-assign */
var protocol = "https://";
if (
  window.location.host.indexOf(":3000") !== -1 ||
  window.location.host.indexOf(":8000") !== -1
) {
  protocol = "http://";
}
export const HOST = protocol + window.location.host.replace("3000", "8000");

var path = "//192.168.137.1:8000";
if (window.location.host === "192.168.137.1:3000") {
  path = "//192.168.137.1:8000";
} else if (window.location.host === "localhost:3000") {
  path = "//localhost:8000";
} else if (
  window.location.host !== "localhost:8000" ||
  window.location.host !== "192.168.137.1:8000"
) {
  path = "//d3sk8vjenfxgtm.cloudfront.net";
}
export const MEDIA_URL = path;
