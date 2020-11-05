const express = require("express");
const cors = require("cors");

const { v4: uuid, validate: isUuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;
  const repositorie = {id: uuid(), title, url, techs, likes: 0};
  repositories.push(repositorie);
  return response.status(201).json(repositorie);

});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs} = request.body;
  const repositorieIndex = repositories.findIndex(respositorie => respositorie.id === id);
  

  if(repositorieIndex < 0){
    return response.sendStatus(400).json({error: "id do not exist"});
  }
  const previousLikes = repositories[repositorieIndex].likes;

  const repositorie = {
    id,
    title,
    url,
    techs,
    likes: previousLikes 
  }
  repositories[repositorieIndex] = repositorie;
  return response.json(repositorie);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const repositorieIndex = repositories.findIndex(respositorie => respositorie.id === id);

  if(repositorieIndex < 0){
    return response.sendStatus(400).json({error: "id do not exist"});
  }

  repositories.splice(repositorieIndex, 1);
  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;
  const repositorieIndex = repositories.findIndex(respositorie => respositorie.id === id);

  if(repositorieIndex < 0){
    return response.sendStatus(400).json({error: "id do not exist"});
  }

  repositories[repositorieIndex].likes += 1;
  return response.json(repositories[repositorieIndex]);
});

module.exports = app;
