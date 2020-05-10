import React from "react";
import styles from "./styles.scss";
import { Header, Section, Button, Container } from "../../components";
import { mergeClasses } from "../../utils";
import { Page } from "../../../interfaces/app/pages";
import { useAuth } from "../../hooks";
import Auth from "../../../interfaces/auth";

export default function Login(props: Page) {
  const { loginWithRedirect }: Auth = useAuth();

  return (
    <Container className={styles.login}>
      <div className={styles.innerContainer}>
        <Header className={styles.header}>Unity</Header>
        <Section>
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
        </Section>
      </div>
    </Container>
  );
}
