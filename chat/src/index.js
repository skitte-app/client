import React from "react";
import ReactDOM from "react-dom";
import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  from,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { HOST_URL } from "./settings";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import "antd/dist/antd.css";
import authReducer from "./store/reducers/auth";
import messageReducer from "./store/reducers/message";
import { useStyles } from "./assets/style";
import App from "./App";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

function configureStore() {
  const rootReducer = combineReducers({
    auth: authReducer,
    message: messageReducer
  });

  const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
  );
  return store;
}

const store = configureStore();

const errorLink = onError(({ graphqlErrors, networkError }) => {
  if (graphqlErrors) {
    // eslint-disable-next-line
    graphqlErrors.map(({ message, location, path }) => {
      alert(`GraphQl Erro ${message}, location: ${location}`);
    });
  }
});
const link = from([errorLink, new HttpLink({ uri: `${HOST_URL}/api/auth/` })]);
const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link,
});

const app = (
  <Provider store={store}>
    <ApolloProvider client={client}>
      <App classes={useStyles} />
    </ApolloProvider>
  </Provider>
);

ReactDOM.render(app, document.getElementById("app"));
