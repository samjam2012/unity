import React from "react";
import { PageContainer } from "../../../interfaces/app/pages";
import { Container } from "../../components";
import Doctor from "./doctor";
import Patient from "./patient";
import styles from "./styles.scss";
import { useAuth } from "../../hooks";

const Portal = (props: PageContainer) => {
  const {
    user: { firstName, userType }
  } = useAuth();
  const Content = () => {
    switch (userType) {
      case "DOCTOR":
        return <Doctor />;
      case "PATIENT":
        return <Patient />;
      default:
        return <Patient />;
    }
  };
  return (
    <Container>
      <div className={styles.header}>
        <div>{`Hello ${firstName}!`}</div>
      </div>
      <Content />
    </Container>
  );
};

export default Portal;

export { Doctor, Patient };
