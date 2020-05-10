import React from "react";
import styles from "./styles.scss";
import { mergeClasses } from "../../utils";
import { HeaderProps as Props } from "../../../interfaces/app/component";
import BoxShadow from "../_wrappers/boxShadow";

const Header = ({
  children: innerText,
  className,
  alignment = "center",
  platformType = "flat"
}: Props) => {
  return (
    <BoxShadow
      options={{ shadowDirection: "bottom" }}
      classInner={mergeClasses([styles[platformType], styles.inner])}
    >
      <div
        className={mergeClasses([
          "uk-heading-small",
          styles[alignment],
          className
        ])}
      >
        {innerText}
      </div>
    </BoxShadow>
  );
};

export default Header;
