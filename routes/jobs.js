const express = require("express");
const router = express.Router();
const axios = require("axios");
const Job = require("../models/Job");
const User = require("../models/User");
const moment = require("moment");
const url = require("url");

const loginCheck = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.redirect("/");
  }
};

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
        if (
          req.user &&
          req.user.favorite_jobs.includes(response.data.results[i].id)
        ) {
          response.data.results[i].style = "active";
        }
      }

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
  let addedToFav;

  if (!req.user) {
    return res.redirect("/auth/login");
  }

  User.findById(req.user._id)
    .then(user => {
      if (user.favorite_jobs.includes(req.params.id)) {
        addedToFav = true;
      } else {
        addedToFav = false;
      }
    })
    .then(output => {
      axios
        .get(
          `https://api.adzuna.com/v1/api/jobs/${req.query.location}/search/1?app_id=${process.env.ADZUNA_API_ID}&app_key=${process.env.ADZUNA_API_KEY}&results_per_page=20&what=${req.params.id}`
        )
        .then(response => {
          let location = response.data.results[0].location.area;
          response.data.results[0].location = location[location.length - 1];
          let singleLoc = response.data.results[0].location;

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

          if (
            req.user &&
            req.user.favorite_jobs.includes(response.data.results[0].id)
          ) {
            response.data.results[0].style = "active";
          }

          // res.send(response.data.results[0]);
          res.render("./single-job.hbs", {
            jobData: response.data.results[0],
            singleLoc: singleLoc,
            addedToFav,
            jobTitle: req.query.jobTitle,
            location: req.query.location,
            user: req.user
          });
        })
        .catch(err => {
          console.log(err);
        });
    });
});

//CREATE A JOB

router.get("/create", loginCheck, (req, res) => {
  res.render("/create-job.hbs");
});
router.post("/jobs", loginCheck, (req, res, next) => {
  console.log("CONSOLE OUTPUT HERE", req.body);
  const { title, company, description, contractType, redirectURL } = req.body;
  Job.create({
    title,
    company,
    description,
    contractType,
    redirectURL,
    owner: req.user._id
  })
    .then(() => {
      //maybe add new job id in the User DB?
      res.redirect("/");
    })
    .catch(err => {
      console.log(err, "ERROR HERE");
      next(err);
    });
});

//DISPLAY CREATED JOBS
router.get("/created", (req, res, next) => {
  //perhaps check if user has any IDs in created jobs array and if so generate page accordingly
  Job.findById(req.user._id)
    .then(user => {
      if (user.favorite_jobs.includes(req.params.id)) {
        addedToFav = true;
      } else {
        addedToFav = false;
      }
    })
    .then(output => {});
});

//ADD TO FAV
router.post("/favorite/:id", (req, res, next) => {
  let userId = req.user._id;

  User.findOneAndUpdate(
    { _id: userId },
    {
      $push: { favorite_jobs: req.params.id }
    }
  )
    .then(response => {
      res.redirect(
        url.format({
          pathname: `/jobs/${req.params.id}`,
          query: req.query
        })
      );
    })
    .catch(err => {
      console.log(err);
    });
});

module.exports = router;
