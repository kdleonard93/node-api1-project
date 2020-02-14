// implement your API here
const express = require("express");
const db = require("./data/db");

const server = express();
server.use(express.json());

server.post("/api/users", (req, res) => {
  const newUser = {
    // id: db.insert(user),
    name: req.body.name,
    bio: req.body.bio
  };
  // users.push(newUser);
  db.insert(newUser);
  res.status(201).json({ message: "User not found" });
  // if (users !== name || bio) {
  //   return res.status(400).json({ message: "Bad Request" });
  // }
});

const port = 8080;

server.listen(port, () => {
  console.log(`server started at http://localhost${port}`);
});
