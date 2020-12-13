const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://dbUser:aXBypiQB7uTSYure@cluster0.k502j.mongodb.net/<todo-app>?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }
  )
  .then(() => console.log("Connected to mongodb"))
  .catch((err) => console.log(err));

require("./taskmodel");
