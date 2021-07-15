const router = require("express").Router();
const _ = require("lodash");
const mongoose = require("mongoose");
const auth = require("../middleware/auth");
const { Todo, validateTodo } = require("../models/todo");
const { Done } = require("../models/done");

router.get("/", auth, async (req, res) => {
  const todos = await Todo.find({ userId: req.user._id }).select(
    "task dateCreated"
  );
  res.send(todos);
});

router.post("/", auth, async (req, res) => {
  const { error } = validateTodo({
    task: req.body.task,
    userId: req.user._id,
  });
  if (error) return res.status(400).send(error.details[0].message);

  const todo = new Todo({ task: req.body.task, userId: req.user._id });
  await todo.save();
  res.send(_.pick(todo, "_id", "task", "dateCreated"));
});

router.put("/:_id", auth, async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params._id))
    return res.status(400).send("Invalid id.");

  const { error } = validateTodo({
    task: req.body.task,
    dateCreated: req.body.dateCreated,
    userId: req.user._id,
  });
  if (error) return res.status(400).send(error.details[0].message);

  let todo = await Todo.findById(req.params._id);
  if (!(todo && req.user._id == todo.userId))
    return res.status(404).send("todo not found");

  todo.task = req.body.task;
  if (req.body.dateCreated) todo.dateCreated = req.body.dateCreated;
  todo = await todo.save();
  res.send(_.pick(todo, "_id", "dateCreated", "task"));
});

router.delete("/all", auth, async (req, res) => {
  await Todo.deleteMany({ userId: req.user._id });
  res.status(200).end();
});

router.delete("/:_id", auth, async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params._id))
    return res.status(400).send("Invalid id.");

  let todo = await Todo.findById(req.params._id);
  if (!(todo && todo.userId == req.user._id))
    return res.status(404).send("todo not found");

  todo = await Todo.findByIdAndDelete(req.params._id);

  if (req.body.moveToDone) {
    const done = new Done({
      task: todo.task,
      userId: todo.userId,
    });
    await done.save();
  }
  res.send(_.pick(todo, "_id", "dateCreated", "task"));
});

module.exports = router;
