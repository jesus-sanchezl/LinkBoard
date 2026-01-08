const { getAllLinks } = require("../../repositories/linksRepository");
const generateError = require("../../utils/helpers");

const getLinks = async (req, res, next) => {
    try {
        const limit = parseInt(req.query.limit);
        const offset = parseInt(req.query.offset);

        if (isNaN(limit) || isNaN(offset) || limit < 0 || offset < 0) {
            throw generateError("Valor de limit u offset incorrectos", 400);
        }

        const links = await getAllLinks(limit, offset);

        res.send({
            status: "Success",
            data: links,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = getLinks;
