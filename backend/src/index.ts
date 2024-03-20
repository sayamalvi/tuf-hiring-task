import express from "express";
import cors from "cors";
import axios from "axios";
import db from "./db";
import { Redis } from "ioredis";

const app = express();
const client = new Redis();

app.use(cors());
app.use(express.json());

app.post("/submit", async (req, res) => {
  const { username, code, language, input } = await req.body;
  const q = await db.query(
    "Insert into submissions (username, code, language, input) values (?, ?, ?, ?)",
    [username, code, language, input]
  );
  console.log(q);

  //   const user = await db.query("SELECT * FROM users WHERE username = $1", [
  //     username,
  //   ]);
  //   let token = "";
  //   const submitOptions = {
  //     method: "POST",
  //     url: "https://judge0-ce.p.rapidapi.com/submissions",
  //     params: {
  //       base64_encoded: "true",
  //       fields: "*",
  //     },
  //     headers: {
  //       "content-type": "application/json",
  //       "Content-Type": "application/json",
  //       "X-RapidAPI-Key": "92d01ba61bmsh792a46cf9da7ca2p13a648jsn0f9c65aee2bc",
  //       "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
  //     },
  //     data: {
  //       language_id: 52,
  //       source_code: code,
  //       stdin: input,
  //     },
  //   };
  //   try {
  //     const response = await axios.request(submitOptions);
  //     token = response.data.token;
  //   } catch (error) {
  //     console.error(error);
  //   }
  //   return token;
});
app.get("/submissions", async (req, res) => {
  const cachedData = await client.get("submissions");

  if (cachedData) {
    console.log("Data retrieved from Redis cache");
    return res.json(JSON.parse(cachedData));
  }

  const q = await db.query("SELECT * FROM submissions");
  console.log("Data retrieved from database");

  await client.set("submissions", JSON.stringify(q[0]));
  await client.expire("submissions", 60);

  res.json(q[0]);
});
app.listen(9000, () => {
  console.log("Server running on 9000");
});
export default app;
