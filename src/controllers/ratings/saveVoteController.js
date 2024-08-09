const Joi = require("joi");

const { getLinkById } = require("../../repositories/linksRepository");

const generateError = require("../../utils/helpers");
const { checkVoted, addVote } = require("../../repositories/ratingsRepository");

const schemaId = Joi.number().integer().positive().required();

const schemaRating = Joi.number().integer().min(1).max(5).required();

const saveVote = async (req, res, next) => {
    try {
        const { id: idUser } = req.auth;
        const { id: idLink } = req.params;
        const { rating } = req.body;

        await schemaId.validateAsync(idLink);
        await schemaRating.validateAsync(rating);

        const link = await getLinkById(idLink);
        if (!link) {
            throw generateError(
                "No se encontró ninguna publicación con ese id",
                400
            );
        }

        if (link.user_id === idUser) {
            throw generateError(
                "Acción no permitida: No puedes votar en tu propia publicación",
                400
            );
        }

        const isVoteRegistered = await checkVoted(idUser, idLink);
        if (isVoteRegistered) {
            throw generateError(
                "Acción no permitida: Ya has votado esta publicación",
                400
            );
        }

        const ratingId = await addVote(idUser, idLink, rating);

        res.send({
            status: "Success",
            message: `Votación con id ${ratingId} realizada con éxito`,
            data: { rating },
        });
    } catch (error) {
        next(error);
    }
};

module.exports = saveVote;
