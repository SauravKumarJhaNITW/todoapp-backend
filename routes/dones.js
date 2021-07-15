const router = require("express").Router();
const mongoose = require("mongoose");
const { Done, validateDone } = require("../models/done");
const auth = require("../middleware/auth");

router.get("/", auth, async (req, res) => {
  const dones = await Done.find({ userId: req.user._id }).select(
    "task dateFinished"
  );
  res.send(dones);
});

router.delete("/all", auth, async (req, res) => {
  await Done.deleteMany({ userId: req.user._id });
  res.status(200).end();
});

router.delete("/:_id", auth, async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params._id))
    return res.status(400).send("Invalid id.");

  let done = await Done.findById(req.params._id);
  if (!(done && done.userId == req.user._id))
    return res.status(404).send("done not found");

  done = await Done.findByIdAndDelete(req.params._id);
  res.send(_.pick(done, "_id", "task", "dateFinished"));
});

module.exports = router;
