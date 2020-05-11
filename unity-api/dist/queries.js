"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const dotenv_1 = require("dotenv");
dotenv_1.config();
const utils_1 = require("./utils");
const { UH_USER, UH_HOST, UH_DATABASE, UH_PASSWORD, UH_PORT } = process.env;
const pool = new pg_1.Pool({
    user: UH_USER,
    host: UH_HOST,
    database: UH_DATABASE,
    password: UH_PASSWORD,
    port: UH_PORT
});
const createUser = (req, res) => {
    const user = req.body;
    const { authId, email, emailVerified, firstName, lastName, userType } = user;
    pool.query(`INSERT INTO users (
      "auth_id",
      "email",
      "email_verified",
      "first_name",
      "last_name"
    ) VALUES ($1, $2, $3, $4, $5)`, [authId, email, emailVerified, firstName, lastName], (e, results) => {
        if (e) {
            const { code, detail } = e;
            if (code == 23505) {
                return res.status(412).send({ message: "User already exists" });
            }
            return res.status(500).send({ message: detail });
        }
        console.log("\n\nResults");
        console.log("\n------------\n\n");
        console.dir(results);
        console.log("\n\n------------\n\n");
        return res.status(201).send(results);
    });
    // switch (userType) {
    //   case "DOCTOR":
    //     createDoctor();
    //     break;
    //   case "PATIENT":
    //     createPatient();
    //     break;
    //   default:
    //     break;
    // }
};
exports.createUser = createUser;
const getUsers = (req, res) => {
    pool.query("SELECT * FROM users", (error, results) => {
        if (error) {
            throw error;
        }
        res.status(200).json(results.rows);
    });
};
exports.getUsers = getUsers;
const getUserByAuthId = (req, res) => {
    const { authId } = req.params;
    pool.query(`SELECT * FROM users WHERE "auth_id" = $1`, [authId], (error, results) => {
        if (error) {
            res.status(500).send({ error, message: "Untracked error" });
        }
        else if (!results) {
            res.status(502).send({
                message: "pg connection refused"
            });
        }
        const rawUser = results.rows[0];
        const user = utils_1.toCamelCase(rawUser);
        res.status(200).send({ user });
    });
};
exports.getUserByAuthId = getUserByAuthId;
const updateUser = (req, res) => {
    const id = parseInt(req.params.id);
    const { name, email } = req.body;
    pool.query("UPDATE users SET name = $1, email = $2 WHERE id = $3", [name, email, id], (error, results) => {
        if (error) {
            throw error;
        }
        res.status(200).send(`User modified with ID: ${id}`);
    });
};
exports.updateUser = updateUser;
const deleteUser = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query("DELETE FROM users WHERE id = $1", [id], (error, results) => {
        if (error) {
            throw error;
        }
        res.status(200).send(`User deleted with ID: ${id}`);
    });
};
exports.deleteUser = deleteUser;
//# sourceMappingURL=queries.js.map