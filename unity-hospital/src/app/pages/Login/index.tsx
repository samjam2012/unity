import React from "react";
import styles from "./styles.scss";
import { Button, Container, Box } from "../../components";
import { mergeClasses } from "../../utils";
import { Page } from "../../../interfaces/app/pages";
import { useAuth } from "../../hooks";
import Auth from "../../../interfaces/auth";

export default function Login(props: Page) {
  const { loginWithRedirect }: Auth = useAuth();

  return (
    <Container className={styles.login}>
      <Box className={styles.box}>
        <div className={styles.innerContainer}>
          <div className="uk-heading-medium">Welcome to Unity Portal</div>
          <div className="uk-align-items uk-text-center">
            Please sign in below through our external authorization site
          </div>
          <div
            className={mergeClasses([
              "uk-flex uk-flex-between",
              styles.buttonContainer
            ])}
          >
            <Button
              type="submit"
              onClick={() => loginWithRedirect({})}
              text="Sign In"
            />
          </div>
        </div>
      </Box>
    </Container>
  );
}
