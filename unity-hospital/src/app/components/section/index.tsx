import React from "react";
import { ShadowProps as Props } from "../../../interfaces/app/component";
import BoxShadow from "../_wrappers/boxShadow";
import styles from "./styles.scss";

const Section = ({ children, shadowDirection = "left-right" }: Props) => {
  return (
    <BoxShadow classOuter={styles.section} shadowDirection={shadowDirection}>
      {children}
    </BoxShadow>
  );
};

export default Section;
