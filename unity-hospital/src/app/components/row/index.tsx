import React from "react";
import styles from "./styles.scss";
import { DefaultProps as Props } from "../../../interfaces/index";

const Row = ({ children }: Props) => {
  return <div className={styles.row}>{children}</div>;
};

export default Row;
