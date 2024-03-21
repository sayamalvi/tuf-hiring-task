"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql2_1 = __importDefault(require("mysql2"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const db = mysql2_1.default
    .createPool({
    host: "sql6.freesqldatabase.com",
    user: "sql6692926",
    password: process.env.DB_PASS,
    database: "sql6692926",
})
    .promise();
exports.default = db;
