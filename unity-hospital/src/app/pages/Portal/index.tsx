import React from "react";
import { PageContainer } from "../../../interfaces/app/pages";
import { Container } from "../../components";
import Doctor from "./doctor";
import Patient from "./patient";
import styles from "./styles.scss";

const Portal = (props: PageContainer) => {
  const Portal = () => (
    <Container className={styles.hospital}>
      <Doctor />
    </Container>
  );
  return <Portal />;
};

export default Portal;

export { Doctor, Patient };
