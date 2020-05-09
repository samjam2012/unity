import React from "react";
import styles from "./styles.scss";
import { mergeClasses } from "../../utils";

export default function H({ size, text, className }: any) {
  const classes = mergeClasses([styles.header, className]);
  switch (size) {
    case 4:
      return <h4 className={classes}>{text}</h4>;
    case 3:
      return <h3 className={classes}>{text}</h3>;
    case 2:
      return <h2 className={classes}>{text}</h2>;
    default:
      return <h1 className={classes}>{text}</h1>;
  }
}
