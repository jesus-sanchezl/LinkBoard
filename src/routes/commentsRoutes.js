const express = require("express");
const validateAuth = require("../middleware/validateAuth");
const createCommentByIdLink = require("../controllers/comments/createCommentByIdLinkController");
const getComments = require("../controllers/comments/getCommentsController");
const deleteComment = require("../controllers/comments/deleteCommentController");

const commentsRoutes = express.Router();

commentsRoutes
    .route("/post/:id")
    .all(validateAuth)
    .get(getComments)
    .post(createCommentByIdLink)
    .delete(deleteComment);

module.exports = commentsRoutes;
