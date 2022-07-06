let DEBUG = true;
let HOST_URL = "https://skitte.herokuapp.com";
let SOCKET_URL = "wss://skitte.herokuapp.com";
let MEDIA_URL = "//d3sk8vjenfxgtm.cloudfront.net";
if (DEBUG) {
  HOST_URL = "http://127.0.0.1:8000";
  SOCKET_URL = "ws://127.0.0.1:8000";
  if (window.location.host === "192.168.137.1:3000") {
    MEDIA_URL = "//192.168.137.1:8000";
  } else if (window.location.host === "localhost:3000") {
    MEDIA_URL = "//localhost:8000";
  }
}
export { HOST_URL, MEDIA_URL, SOCKET_URL };
