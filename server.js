//sprawdzamy, jeśli nie odpali sie w srodowisku produkcyjnymn,wtedy załąduje bibliotekę dotenv
const express = require("express");
const { DATABASE_URL } = require("./utils/config");
const expressLayouts = require("express-ejs-layouts");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");

const app = express();

const indexRouter = require("./routes/index");
const authorRouter = require("./routes/authors");
const bookRouter = require("./routes/books");

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.set("layout", "layouts/layout");

app.use(expressLayouts);
app.use(methodOverride("_method"));
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: false }));

//pobranie repo bazy danych
const { mongoose } = require("mongoose");
//ustanowienie zmiennej do nawiązania połaczenia

mongoose.connect(DATABASE_URL, {
  useNewUrlParser: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
//pojedyńcze połaczenie do db
db.once("open", () => {
  console.log("Connected to db");
});

app.use("/", indexRouter);
app.use("/authors", authorRouter);
app.use("/books", bookRouter);

app.listen(process.env.PORT || 3000, () => {
  console.log("Listetning on http://localhost:3000");
});
