// implement your API here
const express = require("express");
const db = require("./data/db");

const server = express();

server.post("/api/users", (req, res) => {
  const id = req.params.id;
  const newUser = {
    name: req.body.name,
    bio: req.body.bio,
  };
});

server.get("/api/users/:id", (req, res) => {
  const { id } = req.params;

  db.findById(id)
    .then((data) => {
      if (data) {
        return res.json(data);
      }
      res
        .status(404)
        .json({ message: "User with specified ID does not exist." });
    })
    .catch((data) => res.status(500).json({ message: "User not found." }));
});
