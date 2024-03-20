import express from "express";
import cors from "cors";
import axios from "axios";
import db from "./db";

const app = express();

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
  const q = await db.query("SELECT * FROM submissions");
  console.log(q);
  res.json(q[0]);
});
app.listen(9000, () => {
  console.log("Server running on 9000");
});
export default app;
