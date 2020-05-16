import React from "react";
import { PageContainer } from "../../../interfaces/app/pages";
import { Container } from "../../components";
import Doctor from "./doctor";
import Patient from "./patient";
import styles from "./styles.scss";

const Portal = (props: PageContainer) => {
  const Content = () => <Doctor />;
  return (
    <Container>
      <div className={styles.header}>
        <div>Hello Sam!</div>
      </div>
      <Content />
    </Container>
  );
};

export default Portal;

export { Doctor, Patient };
