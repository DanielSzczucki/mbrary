//sprawdzamy, jeśli nie odpali sie w srodowisku produkcyjnymn,wtedy załąduje bibliotekę dotenv

const config = require("./utils/config");

const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");
const mongoClient = require("mongodb");

const indexRouter = require("./routes/index");

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.set("layout", "layouts/layout");
app.use(expressLayouts);
app.use(express.static("public"));

//pobranie repo bazy danych
const { mongoose } = require("mongoose");
//ustanowienie zmiennej do nawiązania połaczenia

mongoose.connect(config.db, {
  useNewUrlParser: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
//pojedyńcze połaczenie do db
db.once("open", () => {
  console.log("Connected to db");
});

app.use("/", indexRouter);

app.listen(process.env.PORT || 3000, () => {
  console.log("Listetning on http://localhost:3000");
});

///odpalheroku
//podłączenie do mongodb Atlas
