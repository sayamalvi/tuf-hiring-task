"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const axios_1 = __importDefault(require("axios"));
const db_1 = __importDefault(require("./db"));
const ioredis_1 = require("ioredis");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const client = new ioredis_1.Redis();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.post("/submit", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, code, language, input } = yield req.body;
    let token = "";
    let output = "";
    let timestamp = "";
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
        const response = yield axios_1.default.request(submitOptions);
        token = response.data.token;
    }
    catch (error) {
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
        const response = yield axios_1.default.request(getOptions);
        if (response.data.status.description === "Compilation Error")
            throw new Error("Compilation Error");
        output = response.data.stdout;
        timestamp = response.data.created_at;
        console.log(response.data);
        const q = yield db_1.default.query("Insert into submissions (username, code, language, input, output, created_at) values (?, ?, ?, ?, ?, ?)", [username, code, language, input, output, timestamp]);
        return res.json({ ok: true });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Error submitting code" });
    }
}));
app.get("/submissions", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cachedData = yield client.get("submissions");
    if (cachedData) {
        console.log("Data retrieved from Redis cache");
        return res.json(JSON.parse(cachedData));
    }
    const q = yield db_1.default.query("SELECT * FROM submissions");
    console.log("Data retrieved from database");
    yield client.set("submissions", JSON.stringify(q[0]));
    yield client.expire("submissions", 20);
    return res.json(q[0]);
}));
app.listen(9000, () => {
    console.log("Server running on 9000");
});
exports.default = app;
