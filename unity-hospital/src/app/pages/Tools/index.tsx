import React from "react";
import styles from "./styles.scss";

import { useAuth } from "../../hooks";
import { Header, SideNav, Button, Container } from "../../components";
import { PageContainer } from "../../../interfaces/app/pages";
import Report from "./report";
import Experiment from "./experiment";

const Tools = ({ children: Page }: PageContainer) => {
  const { logout } = useAuth();
  const PAGES = ["Home", "Experiment"];

  return (
    <Container className={styles.tools}>
      <Header alignment="left" platformType="flat">
        <div>Unity Data Solutions</div>
        <div className={styles.buttonContainer}>
          <Button type="submit" onClick={() => logout({})} text="Log Out" />
        </div>
      </Header>

      <div className={styles.contentContainer}>
        <SideNav baseUrl={"/tools"} pages={PAGES}>
          {Page}
        </SideNav>
      </div>
    </Container>
  );
};

export default Tools;

export { Report, Experiment };
