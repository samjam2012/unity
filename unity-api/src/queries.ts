import { Pool } from "pg";
import { config } from "dotenv";
config();
import { toCamelCase } from "./utils";

interface User {
  authId: string;
  email: string;
  emailVerified: boolean;
  firstName: string;
  lastName: string;
  userType: "DOCTOR" | "PATIENT" | "ADMIN";
  updatedAt: string;
}

const { UH_USER, UH_HOST, UH_DATABASE, UH_PASSWORD, UH_PORT } = process.env;

const pool = new Pool({
  user: UH_USER,
  host: UH_HOST,
  database: UH_DATABASE,
  password: UH_PASSWORD,
  port: UH_PORT
});

const createUser = (req: any, res: any) => {
  const user: User = req.body;

  const { authId, email, emailVerified, firstName, lastName, userType } = user;

  pool.query(
    `INSERT INTO users (
      "auth_id",
      "email",
      "email_verified",
      "first_name",
      "last_name"
    ) VALUES ($1, $2, $3, $4, $5)`,
    [authId, email, emailVerified, firstName, lastName],
    (e: any, results: any) => {
      if (e) {
        const { code, detail } = e;
        if (code == 23505) {
          return res.status(412).send({ message: "User already exists" });
        }

        return res.status(500).send({ message: detail });
      }

      return res.status(201).send(results);
    }
  );

  switch (userType) {
    case "DOCTOR":
      createDoctor(req, res);
      break;
    case "PATIENT":
      createPatient(req, res);
      break;
    default:
      break;
  }
};

const getUsers = (req: any, res: any) => {
  pool.query("SELECT * FROM users", (error: any, results: any) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
};

function createDoctor(req: any, res: any) {
  pool.query("SELECT * FROM users", (error: any, results: any) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
}

function createPatient(req: any, res: any) {
  pool.query("SELECT * FROM users", (error: any, results: any) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
}

const getUserByAuthId = (req: any, res: any) => {
  const { authId } = req.params;

  pool.query(
    `SELECT * FROM users WHERE "auth_id" = $1`,
    [authId],
    (error: any, results: any) => {
      if (error) {
        res.status(500).send({ error, message: "Untracked error" });
      }

      const rawUser = results.rows[0];
      const user = toCamelCase(rawUser) as User;

      res.status(200).send({ user });
    }
  );
};

const updateUser = (req: any, res: any) => {
  const id = parseInt(req.params.id);
  const { name, email } = req.body;

  pool.query(
    "UPDATE users SET name = $1, email = $2 WHERE id = $3",
    [name, email, id],
    (error: any, results: any) => {
      if (error) {
        throw error;
      }
      res.status(200).send(`User modified with ID: ${id}`);
    }
  );
};

const deleteUser = (req: any, res: any) => {
  const id = parseInt(req.params.id);

  pool.query(
    "DELETE FROM users WHERE id = $1",
    [id],
    (error: any, results: any) => {
      if (error) {
        throw error;
      }
      res.status(200).send(`User deleted with ID: ${id}`);
    }
  );
};

export { createUser, getUsers, getUserByAuthId, updateUser, deleteUser };
