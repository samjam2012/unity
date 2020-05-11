"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bodyParser = require("body-parser");
const express = require("express");
const queries_1 = require("./queries");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
// app.use(middleware);
app.get("/", (req, res) => {
    res.json("User service is up");
});
app.post("/users", queries_1.createUser);
app.get("/users", queries_1.getUsers);
app.get("/users/:authId", queries_1.getUserByAuthId);
app.put("/users/:authId", queries_1.updateUser);
app.delete("/users/:authId", queries_1.deleteUser);
const port = process.env.PORT || 8090;
app.listen(port, () => {
    console.log(`Running on port ${port}...`);
});
//# sourceMappingURL=server.js.map