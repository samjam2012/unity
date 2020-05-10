import React from "react";
import styles from "./styles.scss";
import { mergeClasses } from "../../utils";

const Box = ({ children, className }: any) => {
  return (
    <div className={mergeClasses([styles.box, className])}>{children}</div>
  );
};

export default Box;
