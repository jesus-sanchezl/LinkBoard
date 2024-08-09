const jwt = require("jsonwebtoken");

const generateError = require("../utils/helpers");

const extractAccessToken = (headers) => {
    const { authorization } = headers;

    if (!authorization || !authorization.startsWith("Bearer ")) {
        throw generateError("Autorización requerida", 403);
    }

    return authorization.split(" ")[1];
};

const validateAuth = (req, res, next) => {
    try {
        const { SECRET } = process.env;

        const { headers } = req;

        const token = extractAccessToken(headers);

        const decodeToken = jwt.verify(token, SECRET);

        const { id, username, email } = decodeToken;
        req.auth = { id, username, email };

        next();
    } catch (error) {
        next(error);
    }
};

module.exports = validateAuth;
