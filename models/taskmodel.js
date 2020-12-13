const mongoose = require("mongoose");
const validator = require("validator");

var taskSchema = new mongoose.Schema({
  taskDescription: {
    type: String,
    required: "This field is required",
  },
  compleated: {
    type: Boolean,
    default: false,
  },
  deadline: {
    type: String,
    default: "not specified",
  },
});

mongoose.model("Tasks", taskSchema);
