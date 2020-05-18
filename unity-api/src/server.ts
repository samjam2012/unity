import * as bodyParser from "body-parser";
import * as express from "express";
import * as middleware from "./middleware";

import {
  createUser,
  getUsers,
  getUserByAuthId,
  updateUser,
  deleteUser
} from "./queries";

const app = express();
const cors = require("cors");

app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

// app.use(middleware);

app.get("/", (req: any, res: any) => {
  res.send("User service is up");
});

app.post("/users", createUser);
app.get("/users", getUsers);
app.get("/users/:authId", getUserByAuthId);
app.put("/users/:authId", updateUser);
app.delete("/users/:authId", deleteUser);

const port = process.env.PORT || 8090;
app.listen(port, () => {
  console.log(`Running api-users on port ${port}...`);
});
