const express = require("express");
const {MongoClient, ObjectId} =require("mongodb");

// const url = "mongodb://127.0.0.1:27017";
const url = "mongodb+srv://admin:jU3uAk5TCozIf1UZ@cluster0.2ebnflk.mongodb.net"
const dbName  = "jornada-backend-agosto-2023";
const client = new MongoClient(url);

async function main (){
    console.info("Conectando ao banco de dados...");
    await client.connect();
    console.info("Banco de dados conectado com sucesso!");

    const db = client.db(dbName);
    const collection = db.collection("herois");

    const app = express();

  // Read All -> [GET] /herois
  app.get("/herois", async function (req, res) {
    const itens = await collection.find().toArray();
    res.send(itens);
  });

  // Create -> [POST] /herois
  app.post("/herois", async function (req, res) {
    // console.log(req.body, typeof req.body);

    // Extrai o nome do Body da Request (Corpo da Requisição)
    const item = req.body;

    //Inserir o item na collection
  await collection.insertOne(item);


    // Enviamos uma resposta de sucesso
    res.status(201).send(item);
  });

  // Read By Id -> [GET] /herois/:id
  app.get("/herois/:id", async function (req, res) {
    // Pegamos o parâmetro de rota ID
    const id = req.params.id;

    // Pegamos a informação da lista
    const item = await collection.findOne({
      _id: new ObjectId(id),
    });

      // Inserir o item na collection
      await collection.insertOne(item);
  });

  // Update -> [PUT] /herois/:id
  app.put("/herois/:id", async function (req, res) {
    // Pegamos o parâmetro de rota ID
    const id = req.params.id;

    // Extrai o nome do Body da Request (Corpo da Requisição)
    const item = req.body;

    // Atualizamos a informação na collection
  await collection.updateOne(
    {_id: newObjectId(id)},
    { $set: item},
  )

    res.send(item);
  });

  // Delete -> [DELETE] /herois/:id
  app.delete("/herois/:id", async function (req, res) {
    // Pegamos o parâmetro de rota ID
    const id = req.params.id;

    // Excluir o item da lista
    await collection.deleteOne(
      {_id: newObjectId(id)});
    

      res.status(204).send();
  });

  app.listen(3000)
}
main();
