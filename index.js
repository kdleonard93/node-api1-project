// implement your API here
const express = require("express");
const db = require("./data/db");

const server = express();

server.post("/api/users", (req, res) => {
  const newUser = {
    id: users.length + 1,
    name: req.body.name,
    bio: req.body.bio
  };
  users.push(newUser);

  res.status(201).json({ message: "User not found" });
});

const port = 8080;

server.listen(port, () => {
  console.log(`server started at http://localhost${port}`);
});
