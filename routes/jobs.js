const express = require("express");
const router = express.Router();
const Job = require("../models/Job");

router.get("/jobs", (req, res) => {
  res.render("rooms/all-jobs.hbs");
});
//

module.exports = router;
