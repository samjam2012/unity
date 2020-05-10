import React from "react";
import styles from "./styles.scss";
import { mergeClasses } from "../../utils";
import { ButtonProps } from "../../../interfaces/app/component";
import { Link } from "@reach/router";

const Button = ({
  className,
  onClick,
  to = "",
  text,
  type = "button",
  subType = "primary"
}: ButtonProps) => {
  const classes = mergeClasses([styles[type], styles[subType], className]);
  return to ? (
    <Link
      onClick={() => {
        if (onClick) onClick();
      }}
      to={to}
      className={classes}
    >
      {text}
    </Link>
  ) : (
    <button
      onClick={() => {
        if (onClick) onClick();
      }}
      className={classes}
      type={type}
    >
      {text}
    </button>
  );
};

export default Button;
