require("./models/db");
const express = require("express");
const port = process.env.PORT || 3001;
const path = require("path");
const exphbs = require("express-handlebars");
const bodyparser = require("body-parser");
const Handlebars = require("handlebars");
const {
  allowInsecurePrototypeAccess,
} = require("@handlebars/allow-prototype-access");

const app = express();
app.use(
  bodyparser.urlencoded({
    extended: true,
  })
);
app.use(bodyparser.json());

app.set("views", path.join(__dirname, "/views/"));
app.engine(
  "hbs",
  exphbs({
    extname: "hbs",
    defaultLayout: "mainLayout",
    layoutsDir: __dirname + "/views/layouts/",
    handlebars: allowInsecurePrototypeAccess(Handlebars),
  })
);
app.set("view engine", "hbs");

const taskController = require("./controllers/taskController");
app.use("/", taskController);

app.listen(port, () =>
  console.log("Server is up and running on port : ", port)
);
