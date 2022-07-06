import { backendLookup } from "../lookup";
import { HOST } from "../config";

export function apiSkitAction(skitId, action, callback) {
  const data = { id: skitId, action: action };
  backendLookup("POST", "/skits/action/", callback, data);
}

export function apiSkitDetail(skitUrl, callback) {
  backendLookup("GET", `/skits/${skitUrl}/`, callback);
}

export function apiSkitFeed(callback, nextUrl) {
  let endpoint = "/skits/feed/";
  if (nextUrl !== null && nextUrl !== undefined) {
    endpoint = nextUrl.replace(`${HOST}/api`, "");
  }
  backendLookup("GET", endpoint, callback);
}

export function apiSkitList(username, location, callback, nextUrl) {
  let endpoint = "/skits/";
  if (username) {
    endpoint = `/skits/?username=${username}`;
  }
  if (location) {
    endpoint = `/skits/?location=${location}`;
  }
  if (nextUrl !== null && nextUrl !== undefined) {
    endpoint = nextUrl.replace(HOST + "/api", "");
  }
  backendLookup("GET", endpoint, callback);
}
