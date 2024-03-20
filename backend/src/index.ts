import express from "express";
import cors from "cors";
import axios from "axios";
import db from "./db";
import { Redis } from "ioredis";
import dotenv from "dotenv";
dotenv.config();
const app = express();
const client = new Redis();

app.use(cors());
app.use(express.json());

app.post("/submit", async (req, res) => {
  const { username, code, language, input } = await req.body;

  let token = "";
  let output: any = "";
  let timestamp: any = "";

  const submitOptions = {
    method: "POST",
    url: "https://judge0-ce.p.rapidapi.com/submissions",
    params: {
      base64_encoded: "true",
      fields: "*",
    },
    headers: {
      "content-type": "application/json",
      "Content-Type": "application/json",
      "X-RapidAPI-Key": process.env.RAPIDAPI_KEY,
      "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
    },
    data: {
      language_id: 52,
      source_code: code,
      stdin: input,
    },
  };
  try {
    const response = await axios.request(submitOptions);
    token = response.data.token;
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error submitting code" });
  }
  const getOptions = {
    method: "GET",
    url: `https://judge0-ce.p.rapidapi.com/submissions/${token}`,
    params: {
      base64_encoded: "true",
      fields: "*",
    },
    headers: {
      "X-RapidAPI-Key": process.env.RAPIDAPI_KEY,
      "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(getOptions);
    if (response.data.status.description === "Compilation Error")
      throw new Error("Compilation Error");
    output = response.data.stdout;
    timestamp = response.data.created_at;
    console.log(response.data);
    const q = await db.query(
      "Insert into submissions (username, code, language, input, output, created_at) values (?, ?, ?, ?, ?, ?)",
      [username, code, language, input, output, timestamp]
    );
    return res.json({ ok: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error submitting code" });
  }
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
  await client.expire("submissions", 20);

  return res.json(q[0]);
});
app.listen(9000, () => {
  console.log("Server running on 9000");
});
export default app;
