const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send(
    'welcome! This is backend of Todo App which can be found <a href="https://todoapp2023.herokuapp.com/">here</a>.'
  );
});

module.exports = router;
