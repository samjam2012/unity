import React from "react";
import { SideNavProps as Props } from "../../../interfaces/app/component";
import styles from "./styles.scss";
import { Link } from "@reach/router";
import Box from "../box";

const SideNav = ({ children, baseUrl, pages = [] }: any) => {
  return (
    <div className={styles.container}>
      <div className={styles.navContainer}>
        <div className={styles.sideNav}>
          {pages.map((page, i) => {
            const link = i === 0 ? baseUrl : `${baseUrl}/${page.toLowerCase()}`;

            return (
              <Link key={`${i}_${page}`} className={styles.page} to={link}>
                {page}
              </Link>
            );
          })}
        </div>
      </div>
      <Box className={styles.box}>{children}</Box>
    </div>
  );
};

export default SideNav;
