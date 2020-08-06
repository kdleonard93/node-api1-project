const express = require("express");
const db = require("./data/db");

const server = express();
server.use(express.json());

server.get("/users", (req, res) => {
    const users = db.find();
    res.json(users)
})