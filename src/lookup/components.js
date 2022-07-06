import { HOST } from "../config";
import { alertComponent } from "../utils";

export function getCookie(name) {
  var cookieValue = null;
  if (document.cookie && document.cookie !== "") {
    var cookies = document.cookie.split(";");
    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i].trim();
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) === name + "=") {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

export function backendLookup(method, endpoint, callback, data, header) {
  if (endpoint !== undefined) {
    let jsonData;
    if (data) {
      jsonData = JSON.stringify(data);
    }
    const xhr = new XMLHttpRequest();
    const url = `${HOST}/api${endpoint}`;
    xhr.responseType = "json";
    const csrftoken = getCookie("csrftoken");
    xhr.open(method, url);
    xhr.setRequestHeader(
      "Content-Type",
      `${header ? header : "application/json"}`
    );

    if (csrftoken) {
      // xhr.setRequestHeader("HTTP_X_REQUESTED_WITH", "XMLHttpRequest")
      xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
      xhr.setRequestHeader("X-CSRFToken", csrftoken);
    }

    let timer;
    xhr.onload = function () {
      clearTimeout(timer);
      if (xhr.status === 403) {
        const detail = xhr.response.detail;
        if (detail === "Authentication credentials were not provided.") {
          if (
            window.location.href.indexOf("login") === -1 &&
            window.location.href.indexOf("register") === -1
          ) {
            timer = setTimeout(() => {
              alertComponent("You need to Login", `/login?showLoginRequired=true${window.location.pathname !== "/" ? `&next=${window.location.pathname}` : "" }`, 0, 403);
            }, 1000);
            callback({ message: "You need to Login" }, 403);
          }
        }
      }
      callback(xhr.response, xhr.status);
    };
    xhr.onerror = function () {
      clearTimeout(timer);
      timer = setTimeout(() => {
        alertComponent("The request was an error", ``, 0, 0);
      }, 1000);
      callback({ message: "The request was an error" }, 400);
    };
    xhr.send(jsonData);
    // console.log(jsonData);
  }
}

// export function d(method, endpoint, callback, data, header) {
//   let jsonData;
//   if (data) {
//     jsonData = JSON.stringify(data);
//   }
//   const url = `${HOST}/skt/gql${endpoint}`;
//   axios({
//     url: url,
//     method: "post",
//     data: {
//       query: `
//       query Skits {
//         author(id: 1) {
//           firstName
//             posts {
//               title
//               votes
//             }
//           }
//         }
//       `,
//     },
//   }).then((result) => {
//     console.log(result.data);
//   });
// }
