// import the pets array from data.js
const pets = require("./data");

// init express app
const express = require("express");
const app = express();

const PORT = 8080;

// GET - / - returns homepage
app.get("/", (req, res) => {
  // serve up the public folder as static index.html file
  res.sendFile(__dirname + "/public/index.html");
});

// hello world route
app.get("/api", (req, res) => {
  res.send("Hello World!");
});

// get all pets from the database
app.get("/api/v1/pets", (req, res) => {
  // send the pets array as a response
  let display = "";
  const result = pets.map((pet) => {
    display += `<div><h1>${pet.name}</h1><h3>${pet.breed}</h3><p>Age: ${pet.age}</p><p>Owner: ${pet.owner} ${pet.telephone}</p>
    <a href="http://localhost:8080/api/v1/pets/${pet.name}">Test get pet by name</a><br/>
    <a href="http://localhost:8080/api/v1/pets/owner?owner=${pet.owner}">Test get pet by owner</a>
    <div><hr>`;
  });
  const data = `<html><body>${display}</body></html>`;
  res.send(data);
});

// get pet by owner with query string
app.get("/api/v1/pets/owner", (req, res) => {
  // get the owner from the request

  // find the pet in the pets array
  const pet = pets.find((pet) => pet.owner === req.query.owner);

  // send the pet as a response
  res.send(
    `<html><body><div><h1>${pet.name}</h1><h3>${pet.breed}</h3><p>Age: ${pet.age}</p><p>Owner: ${pet.owner} ${pet.telephone}</p>
    <a href="http://localhost:8080/">Home</a><div></body></html>`
  );
});

// get pet by name
app.get("/api/v1/pets/:name", (req, res) => {
  // get the name from the request

  // find the pet in the pets array
  const pet = pets.find((pet) => pet.name === req.params.name);

  // send the pet as a response
  res.send(
    `<html><body><div><h1>${pet.name}</h1><h3>${pet.breed}</h3><p>Age: ${pet.age}</p><p>Owner: ${pet.owner} ${pet.telephone}</p>
    <a href="http://localhost:8080/">Home</a><div></body></html>`
  );
});

app.listen(PORT, () => {
  console.log("Server is listening on port " + PORT);
});

module.exports = app;
