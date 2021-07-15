const mongoose = require("mongoose");
const Joi = require("joi");

const todoSchema = new mongoose.Schema({
  task: {
    type: String,
    minlength: 1,
    required: true,
  },
  dateCreated: {
    type: Date,
    default: Date.now(),
  },
  userId: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
  },
});

const Todo = mongoose.model("Todo", todoSchema);

function validateTodo(todo) {
  const schema = Joi.object({
    task: Joi.string().min(1).required(),
    userId: Joi.objectId().required(),
    dateCreated: Joi.date(),
  });

  return schema.validate(todo);
}

exports.Todo = Todo;
exports.validateTodo = validateTodo;
