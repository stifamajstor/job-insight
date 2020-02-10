Job Insight

Routes
Which routes do we need to implement for the following features ? Who should be allowed to access these routes ?

Jobs
Display all jobs
GET /jobs -> render the list of all jobs

who: everyone

Display one job
GET /jobs/:id -> render a specific job with a given id

who: everyone

Add a job
GET /jobs/new -> render a form to add a job

who: logged in users

POST /jobs -> create a new job

who: logged in users

Edit a job //ONLY IF THERE IS EXTRA TIME
GET /jobs/:id/edit -> render a form to edit a job

POST /jobs/:id -> update a job with a given id

who: logged in users

Delete a job
GET /jobs/:id/delete -> delete a job with a given id

who: the owner of the room

Display favorited jobs for user
GET /jobs/favorites

who:


Models
What fields do we need for these models ? How can we relate them to each other if needed ?

User
role: default = regular, 
enum = [regular, moderators] 
username, 
password,
favorite-jobs: array IDs

Job

id,
Poster,
title,
description,
address,
created date,
contract type, // full or part time
logitude,
latitude


