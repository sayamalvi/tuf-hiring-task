import mysql from "mysql2";

const db = mysql
  .createPool({
    host: "localhost",
    user: "root",
    password: "sayam",
    database: "tuftask",
  })
  .promise();

export default db;
