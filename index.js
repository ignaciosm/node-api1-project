const express = require('express');

const server = express();

server.use(express.json());

const db = require('./data/db');

server.get('/', (req, res) => {
  res.send({ api: 'works!'})
});

const port = 4000;
server.listen(port, ()=> 
  console.log(`\n *** API WORKS *** \n`)  
);

// GET /API/USERS

server.get('/api/users', (req, res) => {
  db.find()
  .then(users => {
    res.status(200).json(users);
  })
  .catch(error => {
    console.log('error on GET /api/users', error);
    res
      .status(500)
      .json({ error: "The users information could not be retrieved." })
  });
});

// GET /API/USERS/:ID

server.get('/api/users/:id', (req, res) => {
  const id = req.params.id;

  db.findById(id)
  .then(user => {
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "The user with the specified ID does not exist." });
    }
  })
  .catch(error => {
    console.log('error on GET /api/users/:id', error);
    res
      .status(500)
      .json({ error: "The users information could not be retrieved." })
  });
});

// POST /API/USERS/

server.post('/api/users', (req, res) => {
  const {name, bio} = req.body;

  db.insert(req.body)
  .then(user => {
    if (name && bio) {
      res.status(201).json(user);
    } else {
      res.status(400).json({ errorMessage: "Please provide name and bio for the user." });
    }
  })
  .catch(error => {
    console.log('error on GET /api/users/:id', error);
    res
      .status(500)
      .json({ error: "There was an error while saving the user to the database" })
  });
});