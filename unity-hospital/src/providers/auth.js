import React, { createContext, useEffect, useState } from "react";
import createAuth0Client from "@auth0/auth0-spa-js";
import { getUser, createUser, fireEvent, healthCheck } from "../api";
import { normalizeUser } from "./utils";

const DEFAULT_REDIRECT_CALLBACK = () =>
  window.history.replaceState({}, document.title, window.location.pathname);

const Auth0Context = createContext();

const Auth0Provider = ({
  children,
  onRedirectCallback = DEFAULT_REDIRECT_CALLBACK,
  ...initOptions
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState();
  const [user, setUser] = useState({ userType: "" });
  const [auth0Client, setAuth0] = useState();
  const [loading, setLoading] = useState(true);
  const [popupOpen, setPopupOpen] = useState(false);

  useEffect(() => {
    const initAuth0 = async () => {
      const auth0FromHook = await createAuth0Client(initOptions);
      setAuth0(auth0FromHook);

      if (
        window.location.search.includes("code=") &&
        window.location.search.includes("state=")
      ) {
        const { appState } = await auth0FromHook.handleRedirectCallback();
        onRedirectCallback(appState);
      }

      const isAuthenticated = await auth0FromHook.isAuthenticated();

      setIsAuthenticated(isAuthenticated);

      if (isAuthenticated) {
        const rawAuth0User = await auth0FromHook.getUser();

        const auth0User = normalizeUser(rawAuth0User);
        const { authId, userType, loginCount } = auth0User;

        if (userType === "ADMIN") {
          try {
            await healthCheck();

            const user = await getUser(authId);
            if (user) {
              await fireEvent({
                eventType: "LOGIN",
                eventDetails: { ...user, userType, loginCount }
              });
            } else {
              // Insert into DB if not already there
              // await createUser(auth0User);
            }
          } catch (error) {
            console.log("\n------Error------\n\n");
            console.dir(error);
          }
        }

        setUser(auth0User);
      }
      setLoading(false);
    };
    initAuth0();
    // eslint-disable-next-line
  }, []);

  const loginWithPopup = async (params = {}) => {
    setPopupOpen(true);
    try {
      await auth0Client.loginWithPopup(params);
    } catch (error) {
      console.error(error);
    } finally {
      setPopupOpen(false);
    }
    console.log("LOGIN WITH POPUP");
    const auth0User = await auth0Client.getUser();
    const user = normalizeUser(auth0User);
    setUser(user);
    setIsAuthenticated(true);
  };

  const handleRedirectCallback = async () => {
    console.log("HANDLE REDIRECT");
    setLoading(true);
    await auth0Client.handleRedirectCallback();
    const user = await auth0Client.getUser();
    setLoading(false);
    setIsAuthenticated(true);
    setUser(user);
  };

  return (
    <Auth0Context.Provider
      value={{
        isAuthenticated,
        user,
        loading,
        popupOpen,
        loginWithPopup,
        handleRedirectCallback,
        getIdTokenClaims: (...p) => auth0Client.getIdTokenClaims(...p),
        loginWithRedirect: (...p) => auth0Client.loginWithRedirect(...p),
        getTokenSilently: (...p) => auth0Client.getTokenSilently(...p),
        getTokenWithPopup: (...p) => auth0Client.getTokenWithPopup(...p),
        logout: (...p) => auth0Client.logout(...p)
      }}
    >
      {children}
    </Auth0Context.Provider>
  );
};

export { Auth0Context, Auth0Provider };
