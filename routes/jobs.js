const express = require("express");
const router = express.Router();
const Job = require("../models/Job");

router.get("/", (req, res) => {
  res.render("all-jobs.hbs");
});
//testing the pulling and pusshing

module.exports = router;
