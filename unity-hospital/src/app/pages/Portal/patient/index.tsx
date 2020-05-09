import React from "react";
import styles from "./styles.scss";
import { Header, Section, Button, Container } from "../../../components";
import { mergeClasses } from "../../../utils";
import { Page } from "../../../../interfaces/app/pages";

export default function Doctor(props: Page) {
  return (
    <Container>
      <Header options={{ alignment: "left", platformType: "flat" }}>
        Hello Sammy!
      </Header>

      <Section>
        <div className="uk-align-items uk-text-center">
          Please select a portal below
        </div>
        <div
          className={mergeClasses([
            "uk-flex uk-flex-between",
            styles.buttonContainer
          ])}
        >
          hello
        </div>
      </Section>
    </Container>
  );
}
