const express = require("express");
const db = require("./data/db");

const port = 8080;

const server = express();
server.use(express.json());

server.get("/users", (req, res) => {
    const users = db.find();
    res.json(users);
})

server.listen(port, () => {
    console.log(`server started at http://localhost${port}`);
  });