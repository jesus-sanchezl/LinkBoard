const express = require("express");
const validateAuth = require("../middleware/validateAuth");
const saveVote = require("../controllers/ratings/saveVoteController");
const getAverageRatings = require("../controllers/ratings/getAverageRatingsController");

const ratingsRoutes = express.Router();

ratingsRoutes.route("/vote/:id").all(validateAuth).post(saveVote);

ratingsRoutes.route("/average/:id").all(validateAuth).get(getAverageRatings);

module.exports = ratingsRoutes;
