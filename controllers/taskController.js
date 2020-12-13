const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Task = mongoose.model("Tasks");

router.get("/", (req, res) => {
  res.render("tasks/addOrEdit", {
    viewTitle: "Insert tasks",
  });
});

router.get("/list", (req, res) => {
  Task.find((err, docs) => {
    if (!err) {
      res.render("tasks/list", {
        list: docs,
      });
    } else {
      console.log("Error : ", err);
    }
  });
});

router.post("/addTask", (req, res) => {
  if (req.body._id == "") insertRecord(req, res);
  else {
    updateRecord(req, res);
  }
});

function insertRecord(req, res) {
  const task = new Task();
  task.taskDescription = req.body.taskDescription;
  task.deadline = req.body.deadline;
  task.save((err, doc) => {
    if (!err) {
      res.redirect("/list");
    } else {
      if (err.name == "ValidationError") {
        handleValidationError(err, req.body);
        res.render("tasks/addOrEdit", {
          viewTitle: "Insert tasks",
          task: req.body,
        });
      }
      console.log("Error uring record insertion : " + err);
    }
  });
}

function updateRecord(req, res) {
  Task.findOneAndUpdate(
    { _id: req.body._id },
    req.body,
    { new: true },
    (err, doc) => {
      if (!err) {
        res.redirect("/list");
      } else {
        if (err.name == "ValidationError") {
          handleValidationError(err, req.body);
          res.render("tasks/addOrEdit", {
            viewTitle: "Updatetasks",
            task: req.body,
          });
        } else {
          console.log("Error uring record insertion : " + err);
        }
      }
    }
  );
}

function handleValidationError(err, body) {
  for (field in err.errors) {
    switch (err.errors[field].path) {
      case "taskDescription":
        body["taskDescriptionError"] = err.errors[field].message;
        break;
      case "deadline":
        body["deadlineError"] = err.errors[field].message;
        break;
    }
  }
}

router.get("/:id", (req, res) => {
  Task.findById(req.params.id, (err, doc) => {
    if (!err) {
      res.render("tasks/addOrEdit", {
        viewTitle: "Update Task",
        task: doc,
      });
    }
  });
});

router.get("/delete/:id", (req, res) => {
  Task.findByIdAndRemove(req.params.id, (err, doc) => {
    if (!err) {
      res.redirect("/list");
    } else {
      console.log("Error in task delete ", err);
    }
  });
});

module.exports = router;
