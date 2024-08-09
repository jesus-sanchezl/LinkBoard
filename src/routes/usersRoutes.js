const express = require("express");
const newUser = require("../controllers/users/newUserController");
const getUserProfileById = require("../controllers/users/getUserProfileByIdController");
const loginUser = require("../controllers/users/loginUserController");
const validateAuth = require("../middleware/validateAuth");
const getUserProfile = require("../controllers/users/getUserProfileController");
const getUserLinks = require("../controllers/users/getUserLinksController");
const getUserVotes = require("../controllers/users/getUserVotesController");
const updateUser = require("../controllers/users/updateUserController");
const getUserLinksById = require("../controllers/users/getUserLinksByIdController");
const updatePassword = require("../controllers/users/updatePasswordController");
const updateImage = require("../controllers/users/updateImageController");

const usersRoutes = express.Router();

usersRoutes.route("/register").post(newUser);
usersRoutes.route("/login").post(loginUser);

// endpoints privados
usersRoutes
    .route("/profile")
    .all(validateAuth)
    .get(getUserProfile)
    .put(updateUser);
usersRoutes.route("/profile/:id").all(validateAuth).get(getUserProfileById);
usersRoutes.route("/links").all(validateAuth).get(getUserLinks);
usersRoutes.route("/links/:id").all(validateAuth).get(getUserLinksById);
usersRoutes.route("/votes/:id").all(validateAuth).get(getUserVotes);
usersRoutes.route("/profile/password").all(validateAuth).put(updatePassword);
usersRoutes.route("/profile/image").all(validateAuth).put(updateImage);

module.exports = usersRoutes;
