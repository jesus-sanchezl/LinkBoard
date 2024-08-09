require("dotenv").config();

const path = require("path");

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const fileUpload = require("express-fileupload");

const linksRoutes = require("./src/routes/linksRoutes");
const usersRoutes = require("./src/routes/usersRoutes");
const ratingsRoutes = require("./src/routes/ratingsRoutes");
const commentsRoutes = require("./src/routes/commentsRoutes");

const app = express();

const { PORT } = process.env;

app.use(morgan("dev"));
app.use(cors());

app.use(express.json());
app.use(fileUpload());
app.use(express.static(path.join(__dirname, "public/links")));
app.use(express.static(path.join(__dirname, "public/profileImages")));

app.use("/api/v1/links", linksRoutes);

app.use("/api/v1/users", usersRoutes);

app.use("/api/v1/ratings", ratingsRoutes);

app.use("/api/v1/comments", commentsRoutes);

app.use((req, res) => {
    res.status(404).send({
        status: "error",
        message: "Not found",
    });
});

app.use((error, req, res, next) => {
    console.error(error);

    res.status(error.httpStatus || 500).send({
        status: "error",
        message: error.message,
    });
});

app.listen(PORT, () => {
    console.log(`app listening on port ${PORT}🌍`);
});
