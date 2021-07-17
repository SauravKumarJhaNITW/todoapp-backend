const mongoose = require("mongoose");
const Joi = require("joi");

const doneSchema = new mongoose.Schema({
  task: {
    type: String,
    minlength: 1,
    required: true,
  },
  dateFinished: {
    type: Date,
    required: true,
  },
  userId: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
  },
});

const Done = mongoose.model("Done", doneSchema);

function validateDone(done) {
  const schema = Joi.object({
    task: Joi.string().min(1).required(),
    userId: Joi.objectId().required(),
    dateFinished: Joi.date().required(),
  });

  return schema.validate(done);
}

module.exports = {
  Done,
  validateDone,
};
