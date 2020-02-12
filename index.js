// implement your API here
const express = require("express");
const db = require("./data/db");

const server = express();

server.post("/api/users", (req, res) => {
  const id = req.params.id;
  const newUser = {
    name: req.body.name,
    bio: req.body.bio
  };
});
