// implement your API here
const express = require("express");
const db = require("./data/db");
const { getUsers, getUserById, createUser } = require("./data/db");

const port = 8080;

const server = express();
server.use(express.json());

server.get("/api/users", (req, res) => {
  const users = getUsers();
  if(users) {
    res.json(users);
  } else{
    res.status(500).json({errorMessage: "The users information could not be retrieved."})
  }
});

server.get("/api/users/:id", (req, res) =>{
const id = req.params.id;
const user = getUserById(id);
try{
  if(user) {
    res.json(user)
  } else {
    res.status(404).json({message: "The user with the specified ID does not exist."})
  }
} catch(error){
  res.status(500).json({errorMessage: "The user information could not be retrieved."})
}
});

server.post("/api/users", (req, res) => {
  const newUser = db.createUser({
    name:req.body.name,
    bio: req.body.bio
  });
  try{
    if(!req.body.name || !req.body.bio) {
      res.status(400).json({errorMessage: "Please provide name and bio for the user."})
    } else {
      res.status(201).json(newUser);
    }
  } catch(error) {
    res.status(500).json({errorMessage: "There was an error while saving the user to the database"})
  }
});



server.listen(port, () => {
  console.log(`Server is running on ${port}`);
});