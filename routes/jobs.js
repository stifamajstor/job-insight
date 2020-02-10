const express = require("express");
const router = express.Router();
const axios = require("axios");
const Job = require("../models/Job");
let data;

router.get("/search", (req, res, next) => {
  axios
    .get(
      `https://api.adzuna.com/v1/api/jobs/${req.query.location}/search/1?app_id=${process.env.ADZUNA_API_ID}&app_key=${process.env.ADZUNA_API_KEY}&results_per_page=20&what=${req.query.jobTitle}`
    )
    .then(response => {
      data = response;
      // res.send(response.data.results);
      res.render("all-jobs.hbs", { allJobs: response.data.results });
    })
    .catch(err => {
      console.log(err);
    });
});

router.get("/:id", (req, res, next) => {
  console.log("request.params: ", req.params.id);
  res.send(data.data.results);

  // const jobId = request.params.id;

  // const movie = moviesJSON.find(el => {
  //   if (el.imdbID === movieId) {
  //     return true;
  //   }
  // });

  // response.render("movie.hbs", movie);
});

// router.get("/", (req, res) => {
//   res.render("all-jobs.hbs");
// });

module.exports = router;
