import React from "react";
import { unregister } from "./services/serviceWorker";
import { render } from "react-dom";
import { setConfig } from "react-hot-loader";
import App from "./app/App";
import "./app/App.scss";
import history from "./services/history";
import { Auth0Provider } from "./providers/auth";
setConfig({
  showReactDomPatchNotification: false
});

const {
  REACT_APP_AUTH_DOMAIN: domain,
  REACT_APP_AUTH_CLIENT: clientId
} = process.env;

const onRedirectCallback = appState => {
  history.push(
    appState && appState.targetUrl
      ? appState.targetUrl
      : window.location.pathname
  );
};

render(
  <Auth0Provider
    domain={domain}
    client_id={clientId}
    redirect_uri={window.location.origin}
    onRedirectCallback={onRedirectCallback}
  >
    <App />
  </Auth0Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
unregister();
