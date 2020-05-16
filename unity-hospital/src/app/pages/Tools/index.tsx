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
    <div className={styles.contentContainer}>
      <SideNav baseUrl={"/tools"} pages={PAGES}>
        {Page}
      </SideNav>
    </div>
  );
};

export default Tools;

export { Report, Experiment };
