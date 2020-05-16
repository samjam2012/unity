import React from "react";
import styles from "./styles.scss";
import { Header, SideNav, Button, Container } from "../../../components";
import { useAuth } from "../../../hooks";
import { Page } from "../../../../interfaces/app/pages";

export default function Doctor(props: Page) {
  return (
    <Container>
      <SideNav baseUrl={"/"} pages={["Home", "Patients", "Appointments"]}>
        <div className={styles.welcome}>{"Your Updates"}</div>
      </SideNav>
    </Container>
  );
}
