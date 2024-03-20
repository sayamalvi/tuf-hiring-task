import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config();
const db = mysql
  .createPool({
    host: "sql6.freesqldatabase.com",
    user: "sql6692926",
    password: process.env.DB_PASS,
    database: "sql6692926",
  })
  .promise();

export default db;
