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

server
  .get("/api/users/:id", (req, res) => {
    const { id } = req.params;

    db.findById(id).then(data => {
      if (data) {
        return res.json(data);
      }
      res
        .status(404)
        .json({ message: "User with specified ID does not exist." });
    });
  })
  .catch(data => res.status(500).json({ message: "User not found." }));

server.post("/api/users", (req, res) => {
  const { name, bio } = req.body;
  if (!name || !bio) {
    return res
      .status(500)
      .json({ message: "Please provide name and bio for user." });
  }
});

server.listen(port, () => {
  console.log(`server started at http://localhost${port}`);
});
