const express = require('express');

const server = express();

const db = require('./data/db');

server.get('/', (req, res) => {
  res.send({ api: 'works!'})
});

server.get('/api/users', (req, res) => {
  db.find()
  .then(users => {
    res.status(200).json(users);
  })
  .catch(error => {
    console.log('error on GET /api/users', error);
    res
      .status(500)
      .json("error")
  });
});

const port = 4000;
server.listen(port, ()=> 
  console.log(`\n *** API WORKS *** \n`)  
);
