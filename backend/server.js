const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");
const MongoClient = require("mongodb").MongoClient;

const app = express();
const port = 3000;

//connection string: use for shell
const url =
  "mongodb+srv://noah:Maxfire1109!@cluster0.ipfee.mongodb.net/defaultauthdb?retryWrites=true&w=majority";

const dbName = "messageBoard";
let db;

app.use(bodyParser.json());
app.use(cors());

const client = new MongoClient(url, { useUnifiedTopology: true });
// Use connect method to connect to the server
client.connect(function (err) {
  if (err) return console.log("mongodb error", err);

  console.log("Connected successfully to server");

  db = client.db(dbName);
});

app.listen(port, () => console.log("App Running on port ", port));

app.post("/api/message", (req, res) => {
  console.log(req.body);
  res.status(200).send();
  db.collection("messages").insertOne({ msg: req.body });
});

app.get("/api/message", async (req, res) => {
  const docs = await db.collection("messages").find({}).toArray();

  if (!docs) return res.json({ error: "error getting messages" });

  res.json(docs);
  console.log(docs);
});
