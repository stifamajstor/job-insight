const express = require("express");
const router = express.Router();
const axios = require("axios");
const Job = require("../models/Job");
const moment = require("moment");

//DISPLAY ALL JOBS
router.get("/search", (req, res, next) => {
  axios
    .get(
      `https://api.adzuna.com/v1/api/jobs/${req.query.location}/search/1?app_id=${process.env.ADZUNA_API_ID}&app_key=${process.env.ADZUNA_API_KEY}&results_per_page=20&what=${req.query.jobTitle}`
    )
    .then(response => {
      for (let i = 0; i < response.data.results.length; i++) {
        let arrCity = response.data.results[i].location.area;
        response.data.results[i].city = arrCity[arrCity.length - 1];

        let posted = response.data.results[i].created;
        response.data.results[i].created = moment(posted).fromNow();

        let contractType = response.data.results[i].contract_time;
        if (contractType === "full_time") {
          response.data.results[i].contract_time = "Full Time";
        } else if (contractType === "part_time") {
          response.data.results[i].contract_time = "Part Time";
        } else if (contractType === "permanent") {
          response.data.results[i].contract_time = "Permanent";
        }
      }

      // if (req.user.favorite_jobs.includes(response.data.results[i].id)) {
      // if (i % 2 === 0) response.data.results[i].style = "active";
      // }
      // }
      // res.send(response.data.results);
      res.render("all-jobs.hbs", {
        allJobs: response.data.results,
        location: req.query.location,
        jobTitle: req.query.jobTitle,
        user: req.user
      });
    })
    .catch(err => {
      console.log(err);
    });
});

//DISPLAY SINGLE JOB
router.get("/:id", (req, res, next) => {
  axios
    .get(
      `https://api.adzuna.com/v1/api/jobs/${req.query.location}/search/1?app_id=${process.env.ADZUNA_API_ID}&app_key=${process.env.ADZUNA_API_KEY}&results_per_page=20&what=${req.params.id}`
    )
    .then(response => {
      let location = response.data.results[0].location.area;
      let singleLoc = location[location.length - 1];

<<<<<<< HEAD
=======
      let posted = response.data.results[0].created;
      response.data.results[0].created = moment(posted).fromNow();

      let contractType = response.data.results[0].contract_time;
      if (contractType === "full_time") {
        response.data.results[0].contract_time = "Full Time";
      } else if (contractType === "part_time") {
        response.data.results[0].contract_time = "Part Time";
      } else if (contractType === "permanent") {
        response.data.results[0].contract_time = "Permanent";
      }

>>>>>>> 96f317672167c7d5fc0d2aff2f4b971244d14b7c
      // res.send(response.data.results[0]);
      res.render("./single-job.hbs", {
        jobData: response.data.results[0],
        location2: singleLoc,
        addedToFav: false,
        jobTitle: req.query.jobTitle,
        location: req.query.location,
        user: req.user
      });
    })
    .catch(err => {
      console.log(err);
    });
});

//ADD TO FAV
router.post("/favorite/:id", (req, res, next) => {
  console.log(req.params.id), "params ID";
  console.log(req.query.location, "LOCATION");

  axios
    .get(
      `https://api.adzuna.com/v1/api/jobs/${req.query.location}/search/1?app_id=${process.env.ADZUNA_API_ID}&app_key=${process.env.ADZUNA_API_KEY}&results_per_page=20&what=${req.params.id}`
    )
    .then(response => {
      console.log(response, "response");
      let location = response.data.results[0].location.area;
      let singleLoc = location[location.length - 1];

      // res.send(response.data.results[0]);
      res.render("./single-job.hbs", {
        jobData: response.data.results[0],
        location: singleLoc,
        addedToFav: true
      });
    })
    .catch(err => {
      console.log(err);
    });
});

// router.get("/", (req, res) => {
//   res.render("all-jobs.hbs");
// });

module.exports = router;
