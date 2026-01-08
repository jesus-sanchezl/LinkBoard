const Joi = require("joi");
const { getLinkById } = require("../../repositories/linksRepository");
const generateError = require("../../utils/helpers");
const { retrieveRating } = require("../../repositories/ratingsRepository");

const schema = Joi.number().integer().positive().required();

const getAverageRatings = async (req, res, next) => {
    try {
        const { id } = req.params;
        await schema.validateAsync(id);

        const link = await getLinkById(id);
        if (!link) {
            throw generateError(
                "No se encontró ninguna publicación con ese id",
                400
            );
        }

        const rating = await retrieveRating(id);

        res.send({
            status: "Success",
            data: rating,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = getAverageRatings;
