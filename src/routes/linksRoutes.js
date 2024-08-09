const express = require("express");
const newLink = require("../controllers/links/newLinkController");
const validateAuth = require("../middleware/validateAuth");
const getLinks = require("../controllers/links/getLinksController");
const getSingleLink = require("../controllers/links/getSingleLinkController");
const deleteLink = require("../controllers/links/deleteLinkController");
const updateLink = require("../controllers/links/updateLinkController");

const linksRoutes = express.Router();

linksRoutes.route("/create").all(validateAuth).post(newLink);

linksRoutes.route("/").all(validateAuth).get(getLinks);

linksRoutes.route("/:id").all(validateAuth).get(getSingleLink);

linksRoutes.route("/:id").all(validateAuth).delete(deleteLink);

linksRoutes.route("/update/:id").all(validateAuth).put(updateLink);

module.exports = linksRoutes;
