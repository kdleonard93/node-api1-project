// implement your API here
const express = require("express");
const db = require("./data/db");

const server = express();
const port = 8080;

server.use(express.json());

server.get("/api/users", (req, res) => {
  db.find()
    .then(data => res.json(data))
    .catch(data => res.status(500).json({ message: "User not found." }));
});

server.get("/api/users/:id", (req, res) => {
  const { id } = req.params;
});

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

server.listen(port, () => {
  console.log(`server started at http://localhost${port}`);
});
