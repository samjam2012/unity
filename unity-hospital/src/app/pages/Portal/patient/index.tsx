import React from "react";
import styles from "./styles.scss";
import { Container, SideNav } from "../../../components";
import { Page } from "../../../../interfaces/app/pages";
import { useAuth, useInput } from "../../../hooks";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  FormControl,
  Select,
  MenuItem
} from "@material-ui/core";

export default function Patient(props: Page) {
  const {
    user: { email, firstName, lastName }
  } = useAuth();
  const user = {
    email,
    firstName,
    lastName
  };
  const { value, bind, reset } = useInput("");
  return (
    <Container>
      <SideNav baseUrl={"/"} pages={["Home", "Appointments"]}>
        <div className={styles.infoContainer}>
          <div className={styles.header}>{"Info"}</div>
          <div className={styles.table}>
            <Table>
              <TableBody>
                {Object.keys(user).map(field => (
                  <TableRow>
                    <TableCell key={field}>{field}</TableCell>
                    <TableCell key={user[field]}>{user[field]}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
        <div className={styles.infoContainer}>
          <div className={styles.header}>{"My Doctor"}</div>
          <div className={styles.myDoctor}>
            <div>{value || "Dr. Hoffman"}</div>
            <FormControl>
              <div>Select new primary</div>
              <Select
                className={styles.select}
                variant="outlined"
                labelId="input"
                id="select"
                displayEmpty
                {...bind}
              >
                <MenuItem value="" disabled>
                  <em>Primary Doctor</em>
                </MenuItem>
                <MenuItem value="Dr. Hoffman">Dr. Hoffman</MenuItem>
                <MenuItem value="Dr. Jules">Dr. Jules</MenuItem>
                <MenuItem value="Dr. Okler">Dr. Okler</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
      </SideNav>
    </Container>
  );
}
