import React from "react";
import styles from "./styles.scss";
import { mergeClasses } from "../../utils";

const Container = ({ children, className }: any) => {
  return (
    <div className={mergeClasses([styles.container, className])}>
      {children}
    </div>
  );
};

export default Container;
