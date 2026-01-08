const { getLinksByUserId } = require("../../repositories/usersRepository");
const generateError = require("../../utils/helpers");

const getUserLinks = async (req, res, next) => {
    try {
        const { id } = req.auth;

        const limit = parseInt(req.query.limit);
        const offset = parseInt(req.query.offset);

        if (isNaN(limit) || isNaN(offset) || limit < 0 || offset < 0) {
            throw generateError("Valor de limit u offset incorrectos", 400);
        }

        const links = await getLinksByUserId(id, limit, offset);

        res.send({
            status: "Success",
            data: links,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = getUserLinks;
