import * as actionTypes from "./actionTypes";
import {} from "react-router"
  
export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (username, image, token) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token: token,
    username: username,
    image: image
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
  };
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("username");
  localStorage.removeItem("image");
  localStorage.removeItem("expirationDate");
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const checkAuthTimeout = (expirationTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
};

export const authLogin = (authUser, username, password) => {
  return (dispatch) => {
    authStart();
    console.log(username);
    console.log(password);
    authUser({
      variables: {
        username: username,
        password: password
      },
    })
      .then((res) => {
        const data = res.data.loginUser;
        const image = data.profile.image;
        const token = data.token;
        console.log(res);
        const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
        localStorage.setItem("token", token);
        localStorage.setItem("username", username);
        localStorage.setItem("image", image);
        localStorage.setItem("expirationDate", expirationDate);
        dispatch(authSuccess(username, image, token));
        dispatch(checkAuthTimeout(3600));
      })
      .catch((err) => {
        console.log(err);
        dispatch(authFail(err.message));
      });
  };
};


export const authCheckState = () => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");
    const image = localStorage.getItem("image");
    if (token === undefined) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem("expirationDate"));
      if (expirationDate <= new Date()) {
        dispatch(logout());
      } else {
        dispatch(authSuccess(username, image, token));
        dispatch(
          checkAuthTimeout(
            (expirationDate.getTime() - new Date().getTime()) / 1000
          )
        );
      }
    }
  };
};
