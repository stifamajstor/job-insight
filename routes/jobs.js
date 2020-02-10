const express = require("express");
const router = express.Router();
const axios = require("axios");
const Job = require("../models/Job");

router.get("/search", (req, res, next) => {
  axios
    .get(
      `https://api.adzuna.com/v1/api/jobs/${req.query.location}/search/1?app_id=${process.env.ADZUNA_API_ID}&app_key=${process.env.ADZUNA_API_KEY}&results_per_page=50&what=${req.query.jobTitle}`
    )
    .then(response => {
      // res.send(response.data.results);
      res.render("all-jobs.hbs", { allJobs: response.data.results });
    })
    .catch(err => {
      console.log(err);
    });
});

// router.get("/", (req, res) => {
//   res.render("all-jobs.hbs");
// });

module.exports = router;
