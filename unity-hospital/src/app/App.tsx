import React from "react";
import { hot } from "react-hot-loader/root";
import { Router, navigate } from "@reach/router";
import { useAuth } from "./hooks";
import Auth from "../interfaces/auth";
import Login from "./pages/Login";
import Portal, { Doctor as Home } from "./pages/Portal";
import Tools, { Report, Experiment } from "./pages/Tools";
import HashLoader from "react-spinners/HashLoader";
import styles from "./App.scss";
import { Header, Button } from "./components";

const App = () => {
  const {
    isAuthenticated,
    loading,
    logout,
    user: { userType }
  }: Auth = useAuth();

  if (loading) {
    return <div className={styles.loader}>{<HashLoader loading={true} />}</div>;
  }

  if (!isAuthenticated) navigate("/login");

  const hasToolAccess = userType === "ADMIN";

  const Wrapper = ({ children }: any) => (
    <div className={styles.wrapper}>
      <Header className={styles.header}>
        <div>Unity</div>
        <div className={styles.buttonContainer}>
          {hasToolAccess && (
            <Button type="button" subType="tertiary" to="/tools" text="Tools" />
          )}
          <Button type="submit" onClick={() => logout({})} text="Log Out" />
        </div>
      </Header>
      <div className={styles.children}>{children}</div>
    </div>
  );

  return (
    <Wrapper>
      <Router>
        <Login path="login" />

        <Portal path="*">
          <Home path="/" />
        </Portal>

        <Tools path="tools">
          <Report path="/" />
          <Experiment path="experiment" />
        </Tools>
      </Router>
    </Wrapper>
  );
};

export default hot(App);
