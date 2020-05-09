import React from "react";
import styles from "./styles.scss";
import { Header, SideNav, Button, Container } from "../../../components";
import { useAuth } from "../../../hooks";
import { Page } from "../../../../interfaces/app/pages";

export default function Doctor(props: Page) {
  const {
    user: { userType },
    logout
  } = useAuth();

  const hasToolAccess = userType === "ADMIN";

  return (
    <Container>
      <Header alignment="left" platformType="flat">
        <div>Hello Sam!</div>
        <div className={styles.buttonContainer}>
          {hasToolAccess && (
            <Button type="button" subType="tertiary" to="/tools" text="Tools" />
          )}
          <Button type="submit" onClick={() => logout({})} text="Log Out" />
        </div>
      </Header>

      <SideNav baseUrl={"/"} pages={["Home", "Patients", "Appointments"]}>
        <div className={styles.welcome}>{"Welcome to Unity Hospital"}</div>
      </SideNav>
    </Container>
  );
}
