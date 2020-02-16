// implement your API here
const express = require("express");
const db = require("./data/db");

const server = express();
const port = 8080;

server.use(express.json());

server.get("/api/users", (req, res) => {
  db.find()
    .then(data => res.json(data))
    .catch(error => res.status(500).json({ message: "User not found." }));
});

server.get("/api/users/:id", (req, res) => {
  const { id } = req.params;

  db.findById(id)
    .then(data => {
      if (data) {
        return res.json(data);
      }
      res
        .status(404)
        .json({ message: "User with specified ID does not exist." });
    })
    .catch(data => res.status(500).json({ message: "User not found." }));
});

server.post("/api/users", (req, res) => {
  const { name, bio } = req.body;
  if (!name || !bio) {
    return res
      .status(500)
      .json({ message: "Please provide name and bio for user." });
  }
  db.insert({ name, bio })
    .then(res => db.findById(res.id))
    .then(data => res.status(201).json(data))
    .catch(error =>
      res
        .status(500)
        .json({ message: "There is an error with saving the user." })
    );
});

server.put("/api/users/:id", async (req, res) => {
  const { id } = req.params;
  const { name, bio } = req.body;
  if (!name || !bio) {
    return res
      .status(500)
      .json({ message: "Please provide name and bio for user." });
  }

  db.findById(id).then(user => {
    if (user) {
      return db.update(id, { name, bio });
    }
    res.status(404).json({ message: "User with specified ID does not exist" });
  });
  db.insert({ name, bio })
    .then(() => db.findById(id))
    .then(data => res.json(data))
    .catch(error =>
      res
        .status(500)
        .json({ message: "The user information could not be modified." })
    );
});

server.delete("/api/users/:id", async (req, res) => {
  const { id } = req.params;

  db.findById(id)
    .then(user => {
      if (user) {
        return db.remove(id);
      }
      res
        .status(404)
        .json({ message: "User with Specified ID does not exist." });
    })
    .then(() => res.status(204).end())
    .catch(error =>
      res.status(500).json({ message: "User could not be removed" })
    );
});

server.listen(port, () => {
  console.log(`server started at http://localhost${port}`);
});
