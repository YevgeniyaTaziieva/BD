import express from "express";
import mysql from "mysql";
import { load } from "ts-dotenv";

const env = load({
  HOST: String,
  USERNAME: String,
  DATABASE: String,
  PASSWORD: String,
  PORT: Number,
});

let connection = mysql.createConnection({
  host: "yh6.h.filess.io",
  user: "automation_heraction",
  password: "a15e5a47817c45a99ca9f32298e1cca90ea3c056",
  database: "automation_heraction",
  port: 3306,
});

const app = express();

app.use(express.json());

connection.connect();

app.get("/users", (req, res) => {
  connection.query("SELECT * FROM users_taziieva", function (error, results, fields) {
    if (error) throw error;
    console.log(results);
    res.json(results);
  });
});

app.get("/user/:name", (req, res) => {
  const { name } = req.params;
  connection.query(
    `SELECT * FROM users_taziieva WHERE username=${name}`,
    function (error, results, fields) {
      if (error) throw error;
      console.log(results);
      res.json(results);
    }
  );
});

app.get("/", async (req, res) => {});
app.post("/user", async (req, res) => {
    const { username, email, password } = req.body;
  connection.query(
    `INSERT INTO users_taziieva (username, email, password) VALUES ('${username}', '${email}', '${password}')`,
    function (error, results, fields) {
      if (error) throw error;
      console.log(results);
      res.json(results);
    }
  );
});

app.delete("/user/:name", async (req, res) => {
    const { name } = req.body;
  connection.query(
    `DELETE FROM users_taziieva WHERE username=${name}`,
    function (error, results, fields) {
      if (error) throw error;
      console.log(results);
      res.json(results);
    }
  );
});
//app.put("/users/:id", async (req, res) => {});

// Close the database connection when the server is terminated
process.on("SIGINT", () => {
  connection.end();
  process.exit();
});

app.listen(env.PORT, () => {
  console.log("listening on PORT 3000");
});
